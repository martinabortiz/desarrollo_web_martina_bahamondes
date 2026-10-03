const formulario = document.getElementById("formAvistamiento");

const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

const opcionesComuna =
  Array.from(comunaSelect.options);

regionSelect.addEventListener("change", function() {

  const regionId = regionSelect.value;

  comunaSelect.innerHTML =
    '<option value="">Seleccione una comuna</option>';

  opcionesComuna.forEach(function(opcion) {

    if (opcion.dataset.region === regionId) {
      comunaSelect.appendChild(opcion);
    }

  });

  comunaSelect.value = "";
});


formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  const ave = document.getElementById("ave");
  const lugar = document.getElementById("lugar");
  const fecha = document.getElementById("fecha");
  const hora = document.getElementById("hora");
  const archivo = document.getElementById("archivo");
  const comentarios = document.getElementById("comentarios");

    let formularioValido = true;

  limpiarErrores();


  // VALIDAR AVE

  if (ave.value === "") {
    mostrarError(
      "error_tipo",
      "Debe seleccionar un ave."
    );

    formularioValido = false;
  }


  // VALIDAR LUGAR

  const lugarIngresado = lugar.value.trim();

  if (
    lugarIngresado.length < 3 ||
    lugarIngresado.length > 200
  ) {
    mostrarError(
      "error_lugar",
      "Ingrese un lugar válido."
    );

    formularioValido = false;
  }

  if (regionSelect.value === "") {
    mostrarError(
      "error_region",
      "Debe seleccionar una región."
    );

    formularioValido = false;
  }

  if (comunaSelect.value === "") {
    mostrarError(
      "error_comuna",
      "Debe seleccionar una comuna."
    );

    formularioValido = false;
  }

  // VALIDAR FECHA

  if (!validarFecha(fecha.value)) {
    mostrarError(
      "error_fecha",
      "La fecha no puede estar en el futuro ni tener más de un año de antigüedad."
    );

    formularioValido = false;
  }


  // VALIDAR HORA

  if (hora.value === "") {
    mostrarError(
      "error_hora",
      "Debe ingresar la hora del avistamiento."
    );

    formularioValido = false;
  }

  else if (
    fecha.value !== "" &&
    !validarHora(fecha.value, hora.value)
  ) {
    mostrarError(
      "error_hora",
      "La hora del avistamiento no puede estar en el futuro."
    );

    formularioValido = false;
  }


  // VALIDAR FOTO O VIDEO

  if (archivo.files.length === 0) {
    mostrarError(
      "error_archivo",
      "Debe agregar al menos una foto o video."
    );

    formularioValido = false;
  }

  else {

    for (const archivoSeleccionado of archivo.files) {

      if (!validarArchivo(archivoSeleccionado)) {

        mostrarError(
          "error_archivo",
          "Todos los archivos deben ser imágenes o videos."
        );

        formularioValido = false;
        break;
      }
    }
  }


  // VALIDAR COMENTARIOS

  if (comentarios.value.trim().length > 500) {
    mostrarError(
      "error_comentarios",
      "Los comentarios no pueden superar los 500 caracteres."
    );

    formularioValido = false;
  }


  // ENVIAR A FLASK

  if (formularioValido) {
    formulario.submit();
  }

});


function validarFecha(fechaIngresada) {

  if (fechaIngresada === "") {
    return false;
  }

  const fecha = new Date(fechaIngresada + "T00:00:00");
  const hoy = new Date();

  hoy.setHours(0, 0, 0, 0);

  if (fecha > hoy) {
    return false;
  }

  const haceUnAno = new Date(hoy);

  haceUnAno.setFullYear(
    hoy.getFullYear() - 1
  );

  return fecha >= haceUnAno;
}


function validarArchivo(archivo) {

  return (
    archivo.type.startsWith("image/") ||
    archivo.type.startsWith("video/")
  );
}


function validarHora(fechaIngresada, horaIngresada) {

  const ahora = new Date();

  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");

  const hoy = `${anio}-${mes}-${dia}`;

  // Si el avistamiento fue antes de hoy,
  // cualquier hora es válida
  if (fechaIngresada < hoy) {
    return true;
  }

  // Si es hoy, no puede ser una hora futura
  const fechaHora = new Date(
    fechaIngresada + "T" + horaIngresada
  );

  return fechaHora <= ahora;
}

function mostrarError(id, mensaje) {

  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.textContent = mensaje;
  }
}

function limpiarErrores() {

  const errores =
    document.querySelectorAll(".mensaje-error");

  errores.forEach(function(error) {
    error.textContent = "";
  });

}