package empresallm.empresallm.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "movimientos_stock")
public class MovimientoStock {
    @Id
    private String id;
    private String productoId;
    private String tipoMovimiento; // "ENTRADA", "SALIDA", "DESECHO"
    private Integer cantidad;
    private String descripcion;
    private LocalDateTime fecha;
}

