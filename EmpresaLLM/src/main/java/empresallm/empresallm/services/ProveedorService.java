package empresallm.empresallm.services;

import empresallm.empresallm.domain.entities.Proveedor;
import empresallm.empresallm.domain.repositories.ProveedorRepository;
import empresallm.empresallm.dto.ToolRequests.CrearProveedorRequest;
import empresallm.empresallm.dto.ToolRequests.ActualizarProveedorRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    @Tool(description = "Lista todos los proveedores registrados.")
    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAll();
    }

    @Tool(description = "Crea un nuevo proveedor.")
    public Proveedor crearProveedor(CrearProveedorRequest req) {
        Proveedor p = Proveedor.builder()
                .nombre(req.nombre())
                .email(req.email())
                .telefono(req.telefono())
                .direccion(req.direccion())
                .activo(true)
                .build();
        return proveedorRepository.save(p);
    }

    @Tool(description = "Busca un proveedor por su nombre exacto.")
    public Proveedor buscarProveedorPorNombre(String nombre) {
        return proveedorRepository.findByNombreIgnoreCase(nombre).orElse(null);
    }

    @Tool(description = "Actualiza la informacion de un proveedor.")
    public Proveedor actualizarProveedor(ActualizarProveedorRequest req) {
        Optional<Proveedor> opt = proveedorRepository.findById(req.id());
        if (opt.isEmpty()) return null;

        Proveedor p = opt.get();
        if (req.nombre() != null) p.setNombre(req.nombre());
        if (req.email() != null) p.setEmail(req.email());
        if (req.telefono() != null) p.setTelefono(req.telefono());
        if (req.direccion() != null) p.setDireccion(req.direccion());

        return proveedorRepository.save(p);
    }

    @Tool(description = "Desactiva un proveedor para que no se puedan operar con el.")
    public String desactivarProveedor(String proveedorId) {
        return proveedorRepository.findById(proveedorId).map(p -> {
            p.setActivo(false);
            proveedorRepository.save(p);
            return "Proveedor desactivado con exito.";
        }).orElse("Proveedor no encontrado.");
    }
}

