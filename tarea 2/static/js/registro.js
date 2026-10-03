const formulario = document.getElementById("registroForm");

formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  
  const nombre = document.getElementById("full_name");
  const email = document.getElementById("email_addr");
  const emailRepeat = document.getElementById("email_addr_repeat");
  const celular = document.getElementById("cel");
  const region = document.getElementById("region");
  const comuna = document.getElementById("comuna");

  let formularioValido = true;

  limpiarErrores();


  // VALIDAR NOMBRE

  const nombreIngresado = nombre.value.trim();

  if (
    nombreIngresado.length < 3 ||
    nombreIngresado.length > 100 ||
    /\d/.test(nombreIngresado) // no contenga numeros d: dígitos
  ) {

    mostrarError(
      "error_nombre",
      "El nombre debe tener entre al menos 3 carac."
    );

    formularioValido = false;
  }


  // VALIDAR CORREO

  const correoIngresado = email.value.trim();

  const expresionEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expresionEmail.test(correoIngresado)) {

    mostrarError(
      "error_email",
      "Ingrese una dirección de correo válida."
    );

    formularioValido = false;
  }


  // VALIDAR REPETICIÓN DE CORREO

  if (
    emailRepeat.value.trim() !==
     correoIngresado // || emailRepeat.value.trim() == ""
  ) {

    mostrarError(
      "error_email_repeat",
      "Las direcciones de correo deben coincidir."
    );

    formularioValido = false;
  }

  if (
    emailRepeat.value.trim() == "") {

    mostrarError(
      "error_email_repeat",
      "Debe repetir su correo electrónico."
    );
    formularioValido = false;
  }


  // VALIDAR CELULAR

  const celularIngresado =
    celular.value
      .replace(/\s/g, "")
      .replace(/-/g, "");

  const expresionCelular =
    /^9[0-9]{8}$/;

  if (!expresionCelular.test(celularIngresado)) {

    mostrarError(
      "error_cel",
      "Ingrese un celular de 9 dígitos que comience con 9."
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


  
if (comuna.value === "") {
  mostrarError(
    "error_comuna",
    "Debes seleccionar una comuna."
  );

  formularioValido = false;
}



  // SI TODO ES VÁLIDO

  if (formularioValido) {
  formulario.submit();
}

});


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

const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

const opcionesComuna = Array.from(comunaSelect.options);

regionSelect.addEventListener("change", function () {

    const regionId = regionSelect.value;

    comunaSelect.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    opcionesComuna.forEach(function (opcion) {

        if (opcion.dataset.region === regionId) {
            comunaSelect.appendChild(opcion);
        }

    });

    comunaSelect.value = "";
});