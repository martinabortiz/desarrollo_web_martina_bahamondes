const listaComentarios = document.getElementById("lista-comentarios");
const formComentario = document.getElementById("form-comentario");
const mensajeComentario = document.getElementById("mensaje-comentario");
const URL_COMENTARIOS = formComentario.dataset.url;

async function cargarComentarios() {

    try {
        const respuesta = await fetch(URL_COMENTARIOS);

        if (!respuesta.ok) {
            throw new Error("Error al cargar comentarios");
        }

        const comentarios = await respuesta.json();

        listaComentarios.replaceChildren();

        if (comentarios.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Este avistamiento aún no tiene comentarios.";
            listaComentarios.appendChild(mensaje);
            return;
        }

        comentarios.forEach(function(comentario) {

            const contenedor = document.createElement("div");
            contenedor.className = "comentario";

            const nombre = document.createElement("strong");
            nombre.textContent = comentario.nombre;

            const fecha = document.createElement("small");
            fecha.textContent = " - " + comentario.fecha;

            const texto = document.createElement("p");
            texto.textContent = comentario.texto;

            contenedor.appendChild(nombre);
            contenedor.appendChild(fecha);
            contenedor.appendChild(texto);

            listaComentarios.appendChild(contenedor);

        });

    } catch (error) {
        listaComentarios.textContent = "No se pudieron cargar los comentarios.";
    }
}


formComentario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre-comentario").value.trim();
    const texto = document.getElementById("texto-comentario").value.trim();

    if (nombre.length < 3 || nombre.length > 50 ||
        texto.length < 5 || texto.length > 300) {

        mensajeComentario.textContent = "Revisa el nombre y el comentario.";
        return;
    }

    const boton = formComentario.querySelector("button");
    boton.disabled = true;

    try {
        const respuesta = await fetch(URL_COMENTARIOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                texto: texto
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            mensajeComentario.textContent =
                resultado.error || "No se pudo guardar el comentario.";
            return;
        }

        mensajeComentario.textContent = resultado.mensaje;

        formComentario.reset();

        await cargarComentarios();

    } catch (error) {
        mensajeComentario.textContent = "Error de conexión. Inténtalo nuevamente.";

    } finally {
        boton.disabled = false;
    }

});


cargarComentarios();