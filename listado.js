const filtroTipo = document.getElementById("filtro_tipo");
const orden = document.getElementById("orden");

const contenedor = document.getElementById("lista-avistamientos");
const paginacion = document.getElementById("paginacion");


let paginaActual = 1;

const elementosPorPagina = 3;

function actualizarListado() {

  const tipoSeleccionado = filtroTipo.value;

  const ordenSeleccionado = orden.value;


  let resultado = [...avistamientos];


  // FILTRAR POR TIPO

  if (tipoSeleccionado !== "todos") {

    resultado = resultado.filter(function(avistamiento) {

      return avistamiento.tipo === tipoSeleccionado;

    });

  }


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

    const mensaje = document.createElement("p");

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


  const titulo =
    document.createElement("h3");

  titulo.textContent =
    avistamiento.nombre;


  const tipo =
    document.createElement("p");

  tipo.textContent =
    "Tipo: " + avistamiento.tipoTexto;


  const lugar =
    document.createElement("p");

  lugar.textContent =
    "Lugar: " +
    avistamiento.lugar +
    ", " +
    avistamiento.comuna +
    ", " +
    avistamiento.region;


  const fecha =
    document.createElement("p");

  fecha.textContent =
    "Fecha: " + avistamiento.fecha;


  const hora =
    document.createElement("p");

  hora.textContent =
    "Hora: " + avistamiento.hora;

    
  let evidencia;

  if (avistamiento.tipoArchivo === "imagen") {

    evidencia = document.createElement("img");

    evidencia.src = avistamiento.archivo;

    evidencia.alt =
      "Fotografía del avistamiento de " +
      avistamiento.nombre;

    evidencia.classList.add("imagen-avistamiento");

  }

  else if (avistamiento.tipoArchivo === "video") {

    evidencia = document.createElement("video");

    evidencia.src = avistamiento.archivo;

    evidencia.controls = true;

    evidencia.classList.add("video-avistamiento");

  }



  articulo.appendChild(evidencia);

  articulo.appendChild(titulo);

  articulo.appendChild(tipo);

  articulo.appendChild(lugar);

  articulo.appendChild(fecha);

  articulo.appendChild(hora);


  contenedor.appendChild(articulo);

}


function crearPaginacion(lista) {

  paginacion.innerHTML = "";

  const cantidadPaginas = Math.ceil(
    lista.length / elementosPorPagina
  );

  const botonAnterior = document.createElement("button");
  botonAnterior.textContent = "‹";

  if (paginaActual === 1) {
    botonAnterior.disabled = true;
  }

  botonAnterior.addEventListener("click", function () {
    if (paginaActual > 1) {
      paginaActual--;
      actualizarListado();
    }
  });


  const textoPagina = document.createElement("span");

  const inicio = (paginaActual - 1) * elementosPorPagina + 1;
  let fin = paginaActual * elementosPorPagina;

  if (fin > lista.length) {
    fin = lista.length;
  }

  if (lista.length === 0) {
    textoPagina.textContent = "0 de 0";
  } else {
    textoPagina.textContent = inicio + "–" + fin + " de " + lista.length;
  }


  const botonSiguiente = document.createElement("button");
  botonSiguiente.textContent = "›";

  if (paginaActual === cantidadPaginas || cantidadPaginas === 0) {
    botonSiguiente.disabled = true;
  }

  botonSiguiente.addEventListener("click", function () {
    if (paginaActual < cantidadPaginas) {
      paginaActual++;
      actualizarListado();
    }
  });


  paginacion.appendChild(botonAnterior);
  paginacion.appendChild(textoPagina);
  paginacion.appendChild(botonSiguiente);
}


filtroTipo.addEventListener(
  "change",
  function() {

    paginaActual = 1;

    actualizarListado();

  }
);


orden.addEventListener(
  "change",
  function() {

    paginaActual = 1;

    actualizarListado();

  }
);


actualizarListado();