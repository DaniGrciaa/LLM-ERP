package empresallm.empresallm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class EmpresaLlmApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmpresaLlmApplication.class, args);
    }

}
