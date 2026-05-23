package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.PedidoProveedor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoProveedorRepository extends MongoRepository<PedidoProveedor, String> {
    List<PedidoProveedor> findByProveedorId(String proveedorId);
}

