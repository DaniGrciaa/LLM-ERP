package empresallm.empresallm.controllers;

import empresallm.empresallm.domain.entities.Desecho;
import empresallm.empresallm.domain.entities.Producto;
import empresallm.empresallm.domain.repositories.ChatLogRepository;
import empresallm.empresallm.domain.repositories.DesechoRepository;
import empresallm.empresallm.domain.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final ProductoRepository productoRepository;
    private final DesechoRepository desechoRepository;
    private final ChatLogRepository chatLogRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard() {
        List<Producto> productos = productoRepository.findByActivoTrue();
        int totalProductos = productos.size();
        int unidadesStock = productos.stream().mapToInt(p -> p.getStock() != null ? p.getStock() : 0).sum();
        long productosBajoStock = productos.stream()
                .filter(p -> p.getStock() != null && p.getStockMinimo() != null && p.getStock() <= p.getStockMinimo())
                .count();

        List<Desecho> desechos = desechoRepository.findAll();
        double perdidasDesechos = desechos.stream().mapToDouble(d -> d.getValorPerdido() != null ? d.getValorPerdido() : 0.0).sum();

        Map<String, Integer> stockCat = new HashMap<>();
        for (Producto p : productos) {
            String cat = p.getCategoria() != null ? p.getCategoria() : "Sin Categoría";
            stockCat.put(cat, stockCat.getOrDefault(cat, 0) + (p.getStock() != null ? p.getStock() : 0));
        }
        List<Map<String, Object>> stockPorCategoria = stockCat.entrySet().stream()
                .map(e -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", e.getKey());
                    map.put("value", e.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        Map<String, Double> desechosPorMes = new LinkedHashMap<>();
        for (Desecho d : desechos) {
            if(d.getFecha() == null) continue;
            String mes = d.getFecha().getMonth().getDisplayName(TextStyle.SHORT, new Locale("es", "ES"));
            desechosPorMes.put(mes, desechosPorMes.getOrDefault(mes, 0.0) + (d.getValorPerdido() != null ? d.getValorPerdido() : 0.0));
        }
        List<Map<String, Object>> desechosGrafico = desechosPorMes.entrySet().stream()
                .map(e -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("mes", e.getKey());
                    map.put("valor", e.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        List<String> actividad = chatLogRepository.findAll(Sort.by(Sort.Direction.DESC, "fecha")).stream()
                .limit(5)
                .map(log -> "Usuario: " + log.getMensajeUsuario())
                .collect(Collectors.toList());

        Map<String, Object> data = new HashMap<>();
        data.put("totalProductos", totalProductos);
        data.put("unidadesStock", unidadesStock);
        data.put("productosBajoStock", productosBajoStock);
        data.put("perdidasDesechos", perdidasDesechos);
        data.put("productos", productos);
        data.put("stockPorCategoria", stockPorCategoria);

        if (desechosGrafico.isEmpty()) {
            Map<String, Object> emptyMap = new HashMap<>();
            emptyMap.put("mes", "Actual");
            emptyMap.put("valor", 0);
            data.put("desechos", List.of(emptyMap));
        } else {
            data.put("desechos", desechosGrafico);
        }

        data.put("actividadReciente", actividad);

        return ResponseEntity.ok(data);
    }
}
