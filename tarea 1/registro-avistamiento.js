const formulario = document.getElementById("form-avistamiento");

formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  const tipoAve = document.getElementById("tipo_ave");
  const nombreAve = document.getElementById("nombre_ave");
  const region = document.getElementById("region");
  const comuna = document.getElementById("comuna");
  const lugar = document.getElementById("lugar");
  const fecha = document.getElementById("fecha");
  const hora = document.getElementById("hora");
  const archivo = document.getElementById("archivo");
  const comentarios = document.getElementById("comentarios");

  let formularioValido = true;

  limpiarErrores();


  // VALIDAR TIPO DE AVE

  if (tipoAve.value === "") {

    mostrarError(
      "error_tipo",
      "Debe seleccionar un tipo de ave."
    );

    formularioValido = false;
  }


  // VALIDAR NOMBRE DEL AVE

  const nombreIngresado = nombreAve.value.trim();

  if (
    nombreIngresado.length < 2 ||
    nombreIngresado.length > 100 ||
    !/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(nombreIngresado)
  ) {

    mostrarError(
      "error_nombre_ave",
      "Ingrese un nombre de ave válido."
    );

    formularioValido = false;
  }


  // VALIDAR REGIÓN

  if (region.value === "") {

    mostrarError(
      "error_region",
      "Debe seleccionar una región."
    );

    formularioValido = false;
  }


  // VALIDAR COMUNA

  const comunaIngresada = comuna.value.trim();

  if (
    comunaIngresada.length < 2 ||
    comunaIngresada.length > 80 ||
    !/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(comunaIngresada)
  ) {

    mostrarError(
      "error_comuna",
      "Ingrese una comuna válida."
    );

    formularioValido = false;
  }


  // VALIDAR LUGAR

  const lugarIngresado = lugar.value.trim();

  if (
    lugarIngresado.length < 3 ||
    lugarIngresado.length > 150 ||
    !/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(lugarIngresado)
  ) {

    mostrarError(
      "error_lugar",
      "Ingrese un lugar válido de entre 3 y 150 caracteres."
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

  else if (!validarArchivo(archivo.files[0])) {

    mostrarError(
      "error_archivo",
      "El archivo debe ser una imagen o un video."
    );

    formularioValido = false;
  }


  // VALIDAR COMENTARIOS

  if (comentarios.value.trim().length > 500) {

    mostrarError(
      "error_comentarios",
      "Los comentarios no pueden superar los 500 caracteres."
    );

    formularioValido = false;
  }


  // SI TODO ESTÁ CORRECTO

  if (formularioValido) {

    alert("Avistamiento registrado correctamente.");

    window.location.href = "intermedio.html";
  }

});

function validarFecha(fechaIngresada) {

  if (fechaIngresada === "") {
    return false;
  }

  const fecha = new Date(
    fechaIngresada + "T00:00:00"
  );

  const hoy = new Date();

  hoy.setHours(0, 0, 0, 0);


  // No puede ser futura

  if (fecha > hoy) {
    return false;
  }


  // No puede tener más de un año

  const haceUnAno = new Date(hoy);

  haceUnAno.setFullYear(
    hoy.getFullYear() - 1
  );

  if (fecha < haceUnAno) {
    return false;
  }


  return true;
}

function validarArchivo(archivo) {

  return (
    archivo.type.startsWith("image/") ||
    archivo.type.startsWith("video/")
  );
}

function validarHora(fechaIngresada, horaIngresada) {

  const ahora = new Date();

  const fechaHora = new Date(
    fechaIngresada + "T" + horaIngresada
  );

  return fechaHora <= ahora;
}

function mostrarError(id, mensaje) {

  const elemento =
    document.getElementById(id);

  elemento.textContent = mensaje;
}


function limpiarErrores() {

  const errores =
    document.querySelectorAll(".mensaje-error");

  errores.forEach(function(error) {

    error.textContent = "";

  });

}