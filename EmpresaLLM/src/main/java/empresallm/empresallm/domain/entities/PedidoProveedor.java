package empresallm.empresallm.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pedidos_proveedor")
public class PedidoProveedor {
    @Id
    private String id;
    private String proveedorId;
    private List<LineaPedido> lineas;
    private String estado;
    private LocalDateTime fechaPedido;
    private Double total;
}

