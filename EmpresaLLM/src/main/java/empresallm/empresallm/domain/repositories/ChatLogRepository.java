package empresallm.empresallm.domain.repositories;

import empresallm.empresallm.domain.entities.ChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLogRepository extends MongoRepository<ChatLog, String> {
}

