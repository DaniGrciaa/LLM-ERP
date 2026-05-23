package empresallm.empresallm.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LineaPedido {
    private String productoId;
    private String nombreProducto;
    private Integer cantidad;
    private Double precioUnitario;
}

