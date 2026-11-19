
package cl.uchile.aves.repository;

import cl.uchile.aves.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotaRepository
        extends JpaRepository<Nota, Integer> {

    List<Nota> findByAvistamientoId(Integer avistamientoId);
}
