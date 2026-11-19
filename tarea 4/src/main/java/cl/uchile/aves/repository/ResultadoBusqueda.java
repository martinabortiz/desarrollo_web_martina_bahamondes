
package cl.uchile.aves.repository;

import java.math.BigDecimal;

public interface ResultadoBusqueda {

    Integer getId();

    String getVoluntario();

    String getAve();

    String getComuna();

    String getFecha();

    BigDecimal getPromedio();
}
