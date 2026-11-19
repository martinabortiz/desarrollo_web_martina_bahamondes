
package cl.uchile.aves.repository;

import cl.uchile.aves.model.Avistamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AvistamientoRepository
        extends JpaRepository<Avistamiento, Integer> {

    @Query(value = """
        SELECT
            av.id AS id,
            v.nombre AS voluntario,
            a.nombre AS ave,
            c.nombre AS comuna,
            DATE_FORMAT(av.fecha_hora, '%Y-%m-%d') AS fecha,
            ROUND(AVG(n.nota), 2) AS promedio
        FROM avistamiento av
        JOIN voluntario v ON av.voluntario_id = v.id
        JOIN ave a ON av.ave_id = a.id
        JOIN comuna c ON av.comuna_id = c.id
        LEFT JOIN nota n ON n.avistamiento_id = av.id
        WHERE
            INSTR(LOWER(a.nombre), LOWER(:texto)) > 0
            OR INSTR(LOWER(v.nombre), LOWER(:texto)) > 0
            OR INSTR(LOWER(c.nombre), LOWER(:texto)) > 0
        GROUP BY av.id, v.nombre, a.nombre,
                 c.nombre, av.fecha_hora
        ORDER BY av.fecha_hora DESC
        """, nativeQuery = true)
    List<ResultadoBusqueda> buscar(@Param("texto") String texto);
}
