
package cl.uchile.aves.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "avistamiento")
public class Avistamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "voluntario_id")
    private Integer voluntarioId;

    @Column(name = "ave_id")
    private Integer aveId;

    @Column(name = "comuna_id")
    private Integer comunaId;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @Column(name = "lugar")
    private String lugar;

    public Avistamiento() {
    }

    public Integer getId() {
        return id;
    }

    public Integer getVoluntarioId() {
        return voluntarioId;
    }

    public Integer getAveId() {
        return aveId;
    }

    public Integer getComunaId() {
        return comunaId;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public String getLugar() {
        return lugar;
    }
}
