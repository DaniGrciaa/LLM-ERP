package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.Proveedor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProveedorRepository extends MongoRepository<Proveedor, String> {
    Optional<Proveedor> findByNombreIgnoreCase(String nombre);
}

