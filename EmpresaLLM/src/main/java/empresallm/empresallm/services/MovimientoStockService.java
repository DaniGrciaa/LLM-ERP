package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.MovimientoStock;
import empresallm.empresallm.domain.entities.Producto;
import empresallm.empresallm.domain.repositories.MovimientoStockRepository;
import empresallm.empresallm.domain.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MovimientoStockService {

    private final ProductoRepository productoRepository;
    private final MovimientoStockRepository movimientoStockRepository;

    @Transactional
    public void registrarMovimiento(String productoId, String tipoMovimiento, int cantidad, String descripcion) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + productoId));

        int nuevoStock = producto.getStock();
        if ("ENTRADA".equals(tipoMovimiento)) {
            nuevoStock += cantidad;
        } else if ("SALIDA".equals(tipoMovimiento) || "DESECHO".equals(tipoMovimiento)) {
            nuevoStock -= cantidad;
            if (nuevoStock < 0) {
                throw new IllegalStateException("El stock no puede ser negativo para el producto: " + producto.getNombre());
            }
        }

        producto.setStock(nuevoStock);
        productoRepository.save(producto);

        MovimientoStock movimiento = MovimientoStock.builder()
                .productoId(productoId)
                .tipoMovimiento(tipoMovimiento)
                .cantidad(cantidad)
                .descripcion(descripcion)
                .fecha(LocalDateTime.now())
                .build();
        movimientoStockRepository.save(movimiento);
    }
}

