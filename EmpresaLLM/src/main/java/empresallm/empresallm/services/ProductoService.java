package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.Producto;
import empresallm.empresallm.domain.repositories.ProductoRepository;
import empresallm.empresallm.dto.ToolRequests.CrearProductoRequest;
import empresallm.empresallm.dto.ToolRequests.ActualizarProductoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final MovimientoStockService movimientoStockService;

    @Tool(description = "Despliega o lista todos los productos activos en el inventario.")
    public List<Producto> listarProductos() {
        return productoRepository.findByActivoTrue();
    }

    @Tool(description = "Busca un producto especifico por su nombre.")
    public Producto buscarProductoPorNombre(String nombre) {
        return productoRepository.findByNombreIgnoreCase(nombre).orElse(null);
    }

    @Tool(description = "Crea un nuevo producto en el sistema.")
    public Producto crearProducto(CrearProductoRequest req) {
        Producto p = Producto.builder()
                .nombre(req.nombre())
                .descripcion(req.descripcion())
                .categoria(req.categoria())
                .stock(req.stock() != null ? req.stock() : 0)
                .stockMinimo(req.stockMinimo() != null ? req.stockMinimo() : 0)
                .precio(req.precio())
                .proveedorId(req.proveedorId())
                .fechaCaducidad(req.fechaCaducidad())
                .activo(true)
                .build();
        return productoRepository.save(p);
    }

    @Tool(description = "Actualiza los datos de un producto existente.")
    public Producto actualizarProducto(ActualizarProductoRequest req) {
        Optional<Producto> opt = productoRepository.findById(req.id());
        if (opt.isEmpty()) return null;

        Producto p = opt.get();
        if (req.nombre() != null) p.setNombre(req.nombre());
        if (req.descripcion() != null) p.setDescripcion(req.descripcion());
        if (req.categoria() != null) p.setCategoria(req.categoria());
        if (req.stockMinimo() != null) p.setStockMinimo(req.stockMinimo());
        if (req.precio() != null) p.setPrecio(req.precio());
        if (req.proveedorId() != null) p.setProveedorId(req.proveedorId());
        if (req.fechaCaducidad() != null) p.setFechaCaducidad(req.fechaCaducidad());

        return productoRepository.save(p);
    }

    @Tool(description = "Suma una cantidad especifica al stock de un producto.")
    public String sumarStock(String productoId, int cantidad) {
        try {
            movimientoStockService.registrarMovimiento(productoId, "ENTRADA", cantidad, "Entrada manual de stock");
            return "Stock sumado exitosamente.";
        } catch (Exception e) {
            return "Error al sumar stock: " + e.getMessage();
        }
    }

    @Tool(description = "Resta una cantidad especifica al stock de un producto.")
    public String restarStock(String productoId, int cantidad) {
        try {
            movimientoStockService.registrarMovimiento(productoId, "SALIDA", cantidad, "Salida manual de stock");
            return "Stock restado exitosamente.";
        } catch (Exception e) {
            return "Error al restar stock: " + e.getMessage();
        }
    }

    @Tool(description = "Desactiva (no elimina fisicamente) un producto del inventario para que ya no sea usable.")
    public String desactivarProducto(String productoId) {
        return productoRepository.findById(productoId).map(p -> {
            p.setActivo(false);
            productoRepository.save(p);
            return "Producto desactivado con exito.";
        }).orElse("Producto no encontrado.");
    }
}

