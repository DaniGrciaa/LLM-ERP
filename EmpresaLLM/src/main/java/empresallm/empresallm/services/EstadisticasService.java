package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.Desecho;
import empresallm.empresallm.domain.entities.Producto;
import empresallm.empresallm.domain.repositories.DesechoRepository;
import empresallm.empresallm.domain.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstadisticasService {

    private final ProductoRepository productoRepository;
    private final DesechoRepository desechoRepository;

    @Tool(description = "Obtiene un resumen del inventario: valor total y cantidad productos registrados.")
    public String obtenerResumenInventario() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        int totalProductos = productos.size();
        int totalStock = productos.stream().mapToInt(p -> p.getStock() != null ? p.getStock() : 0).sum();
        double valorTotal = productos.stream()
                .mapToDouble(p -> (p.getStock() != null ? p.getStock() : 0) * (p.getPrecio() != null ? p.getPrecio() : 0.0))
                .sum();

        return String.format("Productos activos: %d. Stock total: %d unidades. Valor de inventario: %.2f.",
                totalProductos, totalStock, valorTotal);
    }

    @Tool(description = "Obtiene cantidad total de stock sumado según categoria (agrupado por la categoria del producto).")
    public Map<String, Integer> obtenerStockPorCategoria() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        Map<String, Integer> agrupado = new HashMap<>();

        for (Producto p : productos) {
            String cat = p.getCategoria() != null ? p.getCategoria() : "Sin Categoria";
            agrupado.put(cat, agrupado.getOrDefault(cat, 0) + (p.getStock() != null ? p.getStock() : 0));
        }

        return agrupado;
    }

    @Tool(description = "Obtiene cantidad total de stock sumado segun el id de proveedor del producto (agrupado por el proveedorId del producto).")
    public Map<String, Integer> obtenerStockPorProveedor() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        Map<String, Integer> agrupado = new HashMap<>();

        for (Producto p : productos) {
            String provId = p.getProveedorId() != null ? p.getProveedorId() : "Sin Proveedor";
            agrupado.put(provId, agrupado.getOrDefault(provId, 0) + (p.getStock() != null ? p.getStock() : 0));
        }

        return agrupado;
    }

    @Tool(description = "Muestra y devuelve toda la informacion de aquellos productos cuyo stock esta por debajo o igual a su stock minimo fijado.")
    public List<Producto> obtenerProductosBajoStock() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        return productos.stream()
                .filter(p -> p.getStock() != null && p.getStockMinimo() != null && p.getStock() <= p.getStockMinimo())
                .collect(Collectors.toList());
    }

    @Tool(description = "Informa del monto economico o valor perdido por todos los desechos, sumarizando el valor perdido global.")
    public String obtenerValorPerdidoPorDesechos() {
        List<Desecho> desechos = desechoRepository.findAll();
        double total = desechos.stream()
                .mapToDouble(d -> d.getValorPerdido() != null ? d.getValorPerdido() : 0.0)
                .sum();

        return "El valor economico acumulado perdido por mermas y desechos es de: " + total;
    }
}

