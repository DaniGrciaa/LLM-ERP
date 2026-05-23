package empresallm.empresallm.controllers;

import empresallm.empresallm.agent.ChatAgentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Para el frontend
public class ChatController {

    private final ChatAgentService chatAgentService;

    public record ChatRequest(String message) {}
    public record ChatResponse(String response) {}

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest req) {
        String botResponse = chatAgentService.chat(req.message());
        return ResponseEntity.ok(new ChatResponse(botResponse));
    }
}

