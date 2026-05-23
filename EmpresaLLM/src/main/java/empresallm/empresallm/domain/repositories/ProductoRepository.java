package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {
    Optional<Producto> findByNombreIgnoreCase(String nombre);
    List<Producto> findByStockLessThanEqual(Integer stockMinimo);
    List<Producto> findByActivoTrue();
}

