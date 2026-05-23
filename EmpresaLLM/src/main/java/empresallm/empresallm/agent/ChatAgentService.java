package empresallm.empresallm.agent;

import empresallm.empresallm.domain.entities.ChatLog;
import empresallm.empresallm.domain.repositories.ChatLogRepository;
import empresallm.empresallm.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatAgentService {

    private final ChatClient chatClient;
    private final ChatLogRepository chatLogRepository;

    public ChatAgentService(
            ChatClient.Builder builder,
            ProductoService productoService,
            ProveedorService proveedorService,
            PedidoService pedidoService,
            DesechoService desechoService,
            EstadisticasService estadisticasService,
            ChatLogRepository chatLogRepository) {

        this.chatLogRepository = chatLogRepository;
        this.chatClient = builder
                .defaultSystem("Eres el agente inteligente de un ERP de inventario llamado Stock Atelier. Tu trabajo es ayudar al usuario a gestionar productos, proveedores, pedidos, desechos y estadísticas. No inventes datos. Para consultar o modificar información debes usar las tools disponibles. Si falta información obligatoria, pregunta al usuario. Responde de forma clara y breve. Antes de eliminar, desactivar o reducir grandes cantidades de stock, pide confirmación.")
                .defaultTools(productoService, proveedorService, pedidoService, desechoService, estadisticasService)
                .build();
    }

    public String chat(String userMessage) {
        long startTime = System.currentTimeMillis();

        String respuestaTexto = chatClient.prompt()
                .user(userMessage)
                .call()
                .content();

        long endTime = System.currentTimeMillis();

        ChatLog log = ChatLog.builder()
                .modelo("gemini-1.5-flash")
                .mensajeUsuario(userMessage)
                .respuestaModelo(respuestaTexto)
                .accionEjecutada("ChatTool Execution Auto")
                .fecha(LocalDateTime.now())
                .tiempoRespuestaMs(endTime - startTime)
                .build();

        chatLogRepository.save(log);

        return respuestaTexto;
    }
}
