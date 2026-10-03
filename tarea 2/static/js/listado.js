const orden = document.getElementById("orden");

const contenedor =
  document.getElementById("lista-avistamientos");

const paginacion =
  document.getElementById("paginacion");


let paginaActual = 1;

const elementosPorPagina = 3;


function actualizarListado() {

  const ordenSeleccionado = orden.value;

  let resultado = [...avistamientos];


  // ORDENAR

  if (ordenSeleccionado === "fecha_desc") {

    resultado.sort(function(a, b) {

      return new Date(b.fecha) - new Date(a.fecha);

    });

  }


  else if (ordenSeleccionado === "fecha_asc") {

    resultado.sort(function(a, b) {

      return new Date(a.fecha) - new Date(b.fecha);

    });

  }


  else if (ordenSeleccionado === "lugar_asc") {

    resultado.sort(function(a, b) {

      return a.lugar.localeCompare(b.lugar);

    });

  }


  else if (ordenSeleccionado === "lugar_desc") {

    resultado.sort(function(a, b) {

      return b.lugar.localeCompare(a.lugar);

    });

  }


  mostrarPagina(resultado);

}


function mostrarPagina(lista) {

  contenedor.innerHTML = "";

  const inicio =
    (paginaActual - 1) * elementosPorPagina;

  const fin =
    inicio + elementosPorPagina;

  const elementosPagina =
    lista.slice(inicio, fin);


  if (elementosPagina.length === 0) {

    const mensaje =
      document.createElement("p");

    mensaje.textContent =
      "No se encontraron avistamientos.";

    contenedor.appendChild(mensaje);

  }


  elementosPagina.forEach(function(avistamiento) {

    crearAvistamiento(avistamiento);

  });


  crearPaginacion(lista);

}


function crearAvistamiento(avistamiento) {

  const articulo =
    document.createElement("article");

  articulo.classList.add("avistamiento");

  articulo.style.cursor = "pointer";

  articulo.addEventListener("click", function() {
    window.location.href =
      avistamiento.detalle_url;
  });


  // NOMBRE DEL AVE

  const titulo =
    document.createElement("h3");

  titulo.textContent =
    avistamiento.nombre;


  // LUGAR

  const lugar =
    document.createElement("p");

  lugar.textContent =
    "Lugar: " +
    avistamiento.lugar +
    ", " +
    avistamiento.comuna +
    ", " +
    avistamiento.region;


  // FECHA

  const fecha =
    document.createElement("p");

  fecha.textContent =
    "Fecha: " + avistamiento.fecha;


  // HORA

  const hora =
    document.createElement("p");

  hora.textContent =
    "Hora: " + avistamiento.hora;


  articulo.appendChild(titulo);


  // FOTO O VIDEO

  if (
    avistamiento.archivo &&
    avistamiento.tipoArchivo === "imagen"
  ) {

    const evidencia =
      document.createElement("img");

    evidencia.src =
      avistamiento.archivo;

    evidencia.alt =
      "Fotografía del avistamiento de " +
      avistamiento.nombre;

    evidencia.classList.add(
      "imagen-avistamiento"
    );

    articulo.appendChild(evidencia);

  }


  else if (
    avistamiento.archivo &&
    avistamiento.tipoArchivo === "video"
  ) {

    const evidencia =
      document.createElement("video");

    evidencia.src =
      avistamiento.archivo;

    evidencia.controls = true;

    evidencia.classList.add(
      "video-avistamiento"
    );

    articulo.appendChild(evidencia);

  }


  articulo.appendChild(lugar);
  articulo.appendChild(fecha);
  articulo.appendChild(hora);

  contenedor.appendChild(articulo);

}


function crearPaginacion(lista) {

  paginacion.innerHTML = "";

  const cantidadPaginas =
    Math.ceil(
      lista.length / elementosPorPagina
    );


  const botonAnterior =
    document.createElement("button");

  botonAnterior.textContent = "‹";


  if (paginaActual === 1) {
    botonAnterior.disabled = true;
  }


  botonAnterior.addEventListener(
    "click",
    function() {

      if (paginaActual > 1) {

        paginaActual--;

        actualizarListado();

      }

    }
  );


  const textoPagina =
    document.createElement("span");


  const inicio =
    (paginaActual - 1) *
    elementosPorPagina + 1;

  let fin =
    paginaActual * elementosPorPagina;


  if (fin > lista.length) {
    fin = lista.length;
  }


  if (lista.length === 0) {

    textoPagina.textContent =
      "0 de 0";

  }

  else {

    textoPagina.textContent =
      inicio +
      "–" +
      fin +
      " de " +
      lista.length;

  }


  const botonSiguiente =
    document.createElement("button");

  botonSiguiente.textContent = "›";


  if (
    paginaActual === cantidadPaginas ||
    cantidadPaginas === 0
  ) {

    botonSiguiente.disabled = true;

  }


  botonSiguiente.addEventListener(
    "click",
    function() {

      if (paginaActual < cantidadPaginas) {

        paginaActual++;

        actualizarListado();

      }

    }
  );


  paginacion.appendChild(
    botonAnterior
  );

  paginacion.appendChild(
    textoPagina
  );

  paginacion.appendChild(
    botonSiguiente
  );

}


// CAMBIAR ORDEN

orden.addEventListener(
  "change",
  function() {

    paginaActual = 1;

    actualizarListado();

  }
);


// MOSTRAR LISTADO AL CARGAR

actualizarListado();