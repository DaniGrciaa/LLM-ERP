package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.Desecho;
import empresallm.empresallm.domain.entities.Producto;
import empresallm.empresallm.domain.repositories.DesechoRepository;
import empresallm.empresallm.domain.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DesechoService {

    private final DesechoRepository desechoRepository;
    private final ProductoRepository productoRepository;
    private final MovimientoStockService movimientoStockService;

    @Tool(description = "Registra una cantidad de un producto como desecho (por rotura, perdida, etc) reduciendo el stock y registrando su valor perdido.")
    @Transactional
    public String registrarDesecho(String productoId, int cantidad, String motivo) {
        Producto p = productoRepository.findById(productoId).orElse(null);
        if (p == null) {
            return "Producto no encontrado.";
        }

        try {
            movimientoStockService.registrarMovimiento(productoId, "DESECHO", cantidad, motivo);
        } catch (Exception e) {
            return "No se ha podido procesar el desecho de stock: " + e.getMessage();
        }

        double valorPerdido = (p.getPrecio() != null ? p.getPrecio() : 0.0) * cantidad;

        Desecho desecho = Desecho.builder()
                .productoId(productoId)
                .nombreProducto(p.getNombre())
                .cantidad(cantidad)
                .motivo(motivo)
                .fecha(LocalDateTime.now())
                .valorPerdido(valorPerdido)
                .build();

        desechoRepository.save(desecho);
        return "Desecho registrado exitosamente. Se ha restado del stock.";
    }

    @Tool(description = "Lista todos los desechos previamente registrados.")
    public List<Desecho> listarDesechos() {
        return desechoRepository.findAll();
    }

    @Tool(description = "Revisa de manera automatizada qué productos están caducados según su fechaCaducidad y los desecha, perdiendo el stock directamente de ellos.")
    @Transactional
    public String procesarProductosCaducados() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        int count = 0;
        double valorTotalPerdido = 0;

        LocalDate hoy = LocalDate.now();
        for (Producto p : productos) {
            if (p.getFechaCaducidad() != null && p.getFechaCaducidad().isBefore(hoy) && p.getStock() > 0) {
                int cantidadPerdida = p.getStock();
                registrarDesecho(p.getId(), cantidadPerdida, "Caducado");
                count++;
                valorTotalPerdido += (p.getPrecio() != null ? p.getPrecio() : 0.0) * cantidadPerdida;
            }
        }

        return "Resumen de proceso: Se han procesado los lotes caducados de " + count + " productos distintos superando las fechas de caducidad. Valor perdido estimado: " + valorTotalPerdido;
    }
}

