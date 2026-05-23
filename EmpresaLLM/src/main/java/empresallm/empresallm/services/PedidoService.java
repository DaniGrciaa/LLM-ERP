package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.LineaPedido;
import empresallm.empresallm.domain.entities.PedidoProveedor;
import empresallm.empresallm.domain.repositories.PedidoProveedorRepository;
import empresallm.empresallm.dto.ToolRequests.CrearPedidoRequest;
import empresallm.empresallm.dto.ToolRequests.LineaPedidoReq;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoProveedorRepository pedidoProveedorRepository;
    private final MovimientoStockService movimientoStockService;
    private final ProductoService productoService;

    @Tool(description = "Crea un pedido a proveedor y automaticamente suma el stock a los productos correspondientes.")
    @Transactional
    public String crearPedidoProveedor(CrearPedidoRequest req) {
        if (req.lineas() == null || req.lineas().isEmpty()) {
            return "No se puede crear un pedido sin lineas y productos.";
        }

        double total = 0.0;
        List<LineaPedido> lineasEntidad = new ArrayList<>();

        for (LineaPedidoReq linea : req.lineas()) {
            LineaPedido lp = LineaPedido.builder()
                    .productoId(linea.productoId())
                    .cantidad(linea.cantidad())
                    .precioUnitario(linea.precioUnitario())
                    .build();

            // Sumar automaticamente el stock
            try {
                movimientoStockService.registrarMovimiento(linea.productoId(), "ENTRADA", linea.cantidad(), "Recepción de pedido a proveedor");
            } catch (Exception e) {
                return "Error al sumar stock del producto " + linea.productoId() + ": " + e.getMessage();
            }

            double subtotal = linea.cantidad() * linea.precioUnitario();
            total += subtotal;
            lineasEntidad.add(lp);
        }

        PedidoProveedor pedido = PedidoProveedor.builder()
                .proveedorId(req.proveedorId())
                .lineas(lineasEntidad)
                .estado("RECIBIDO")
                .fechaPedido(LocalDateTime.now())
                .total(total)
                .build();

        pedidoProveedorRepository.save(pedido);

        return "Pedido creado correctamente con estado RECIBIDO y el stock ha sido sumado.";
    }

    @Tool(description = "Lista todos los pedidos realizados a proveedores.")
    public List<PedidoProveedor> listarPedidos() {
        return pedidoProveedorRepository.findAll();
    }

    @Tool(description = "Busca todos los pedidos hechos a un proveedor en especifico usando su ID.")
    public List<PedidoProveedor> buscarPedidosPorProveedor(String proveedorId) {
        return pedidoProveedorRepository.findByProveedorId(proveedorId);
    }
}

