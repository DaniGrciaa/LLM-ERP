package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.Desecho;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesechoRepository extends MongoRepository<Desecho, String> {
    List<Desecho> findByProductoId(String productoId);
}

