package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.MovimientoStock;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimientoStockRepository extends MongoRepository<MovimientoStock, String> {
    List<MovimientoStock> findByProductoId(String productoId);
}

