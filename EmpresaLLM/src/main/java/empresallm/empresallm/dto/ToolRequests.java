package empresallm.empresallm.dto;

import java.util.List;
import java.time.LocalDate;

public class ToolRequests {

    public record CrearProductoRequest(
        String nombre,
        String descripcion,
        String categoria,
        Integer stock,
        Integer stockMinimo,
        Double precio,
        String proveedorId,
        LocalDate fechaCaducidad
    ) {}

    public record ActualizarProductoRequest(
        String id,
        String nombre,
        String descripcion,
        String categoria,
        Integer stockMinimo,
        Double precio,
        String proveedorId,
        LocalDate fechaCaducidad
    ) {}

    public record CrearProveedorRequest(
        String nombre,
        String email,
        String telefono,
        String direccion
    ) {}

    public record ActualizarProveedorRequest(
        String id,
        String nombre,
        String email,
        String telefono,
        String direccion
    ) {}

    public record LineaPedidoReq(
        String productoId,
        Integer cantidad,
        Double precioUnitario
    ) {}

    public record CrearPedidoRequest(
        String proveedorId,
        List<LineaPedidoReq> lineas
    ) {}
}

