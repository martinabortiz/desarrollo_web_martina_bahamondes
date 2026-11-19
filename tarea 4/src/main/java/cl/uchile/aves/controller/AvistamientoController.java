
package cl.uchile.aves.controller;

import cl.uchile.aves.model.Nota;
import cl.uchile.aves.repository.AvistamientoRepository;
import cl.uchile.aves.repository.NotaRepository;
import cl.uchile.aves.repository.ResultadoBusqueda;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/avistamientos")
@CrossOrigin(origins = {
    "http://localhost:5000",
    "http://127.0.0.1:5000"
})
public class AvistamientoController {

    private final AvistamientoRepository repository;
    private final NotaRepository notaRepository;

    public AvistamientoController(
            AvistamientoRepository repository,
            NotaRepository notaRepository) {

        this.repository = repository;
        this.notaRepository = notaRepository;
    }

    @GetMapping("/total")
    public long obtenerTotal() {
        return repository.count();
    }

    @GetMapping("/buscar")
    public List<ResultadoBusqueda> buscar(
            @RequestParam String texto) {

        if (texto.isBlank()) {
            return List.of();
        }

        return repository.buscar(texto.trim());
    }

    public record NuevaNota(Integer nota) {}

    @PostMapping("/{id}/notas")
    public Map<String, Object> agregarNota(
            @PathVariable Integer id,
            @RequestBody NuevaNota datos) {

        if (datos == null || datos.nota() == null ||
                datos.nota() < 1 || datos.nota() > 7) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La nota debe estar entre 1 y 7"
            );
        }

        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "El avistamiento no existe"
            );
        }

        Nota nuevaNota = new Nota(id, datos.nota());
        notaRepository.save(nuevaNota);

        List<Nota> notas =
                notaRepository.findByAvistamientoId(id);

        double promedio = notas.stream()
                .mapToInt(Nota::getNota)
                .average()
                .orElse(0.0);

        promedio = Math.round(promedio * 100) / 100.0;

        return Map.of("promedio", promedio);
    }
}
