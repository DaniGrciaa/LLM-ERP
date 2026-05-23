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
@Document(collection = "desechos")
public class Desecho {
    @Id
    private String id;
    private String productoId;
    private String nombreProducto;
    private Integer cantidad;
    private String motivo;
    private LocalDateTime fecha;
    private Double valorPerdido;
}

