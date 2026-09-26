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
    correoIngresado
  ) {

    mostrarError(
      "error_email_repeat",
      "Las direcciones de correo deben coincidir."
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


  // VALIDAR COMUNA

 const comunaIngresada = comuna.value.trim();
 
 const expresionComuna = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/;
 
 if (
    comunaIngresada.length < 2 ||
    comunaIngresada.length > 80 ||
    !expresionComuna.test(comunaIngresada)
) {

    mostrarError(
        "error_comuna",
        "Ingrese una comuna válida."
    );

    formularioValido = false;
    }   


  // SI TODO ES VÁLIDO

  if (formularioValido) {

 
    window.location.href = "intermedio.html";

}

});


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