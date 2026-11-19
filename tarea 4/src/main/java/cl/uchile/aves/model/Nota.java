
package cl.uchile.aves.model;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "avistamiento_id", nullable = false)
    private Integer avistamientoId;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    public Nota() {
    }

    public Nota(Integer avistamientoId, Integer nota) {
        this.avistamientoId = avistamientoId;
        this.nota = nota;
    }

    public Integer getId() {
        return id;
    }

    public Integer getAvistamientoId() {
        return avistamientoId;
    }

    public Integer getNota() {
        return nota;
    }
}
