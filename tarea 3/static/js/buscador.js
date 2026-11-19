const API_BASE = "http://localhost:8080";

const input = document.getElementById("texto-busqueda");
const formulario = document.getElementById("form-busqueda");
const resultados = document.getElementById("resultados");
const mensaje = document.getElementById("mensaje");

let temporizador;
let busquedaActual = 0;


formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(temporizador);

    const texto = input.value.trim();
    const numeroBusqueda = ++busquedaActual;

    if (!texto) {
        resultados.replaceChildren();
        mensaje.textContent = "Escribe algo para buscar.";
        return;
    }

    buscarAvistamientos(texto, numeroBusqueda);
});


input.addEventListener("input", () => {
    clearTimeout(temporizador);

    const texto = input.value.trim();
    const numeroBusqueda = ++busquedaActual;

    resultados.replaceChildren();

    if (!texto) {
        mensaje.textContent = "";
        return;
    }

    temporizador = setTimeout(() => {
        buscarAvistamientos(texto, numeroBusqueda);
    }, 300);
});

async function buscarAvistamientos(texto, numeroBusqueda) {
    mensaje.textContent = "Buscando...";

    try {
        const respuesta = await fetch(
            `${API_BASE}/api/avistamientos/buscar?texto=${encodeURIComponent(texto)}`
        );

        if (!respuesta.ok) {
            throw new Error("Error al consultar avistamientos");
        }

        const datos = await respuesta.json();

        if (numeroBusqueda !== busquedaActual) return;

        resultados.replaceChildren();

        if (datos.length === 0) {
            mensaje.textContent = "No se encontraron avistamientos.";
            return;
        }

        mensaje.textContent = `${datos.length} resultado(s) encontrado(s).`;

        datos.forEach((avistamiento) => {
            const item = document.createElement("li");

            agregarCampo(item, "Ave", avistamiento.ave, texto);
            agregarCampo(item, "Voluntario", avistamiento.voluntario, texto);
            agregarCampo(item, "Comuna", avistamiento.comuna, texto);
            agregarCampo(item, "Fecha", avistamiento.fecha, "");

            
            const parrafoPromedio = document.createElement("p");
            const tituloPromedio = document.createElement("strong");
            const valorPromedio = document.createElement("span");

            tituloPromedio.textContent = "Nota promedio: ";
            valorPromedio.textContent = avistamiento.promedio ?? "-";

            parrafoPromedio.appendChild(tituloPromedio);
            parrafoPromedio.appendChild(valorPromedio);
            item.appendChild(parrafoPromedio);

            
            agregarFormularioEvaluacion(item, avistamiento.id, valorPromedio);

            // Enlace al detalle del avistamiento
            const enlaceDetalle = document.createElement("a");

            enlaceDetalle.href = `/avistamiento/${avistamiento.id}`;
            enlaceDetalle.textContent = "Ver detalle del avistamiento";
            enlaceDetalle.classList.add("enlace-detalle");

            item.appendChild(enlaceDetalle);

            resultados.appendChild(item);

        });

    } catch (error) {
        if (numeroBusqueda !== busquedaActual) return;
        mensaje.textContent = "Ocurrió un error al buscar.";
        console.error(error);
    }
}

function agregarCampo(contenedor, etiqueta, valor, busqueda) {
    const parrafo = document.createElement("p");
    const titulo = document.createElement("strong");

    titulo.textContent = `${etiqueta}: `;
    parrafo.appendChild(titulo);

    resaltarTexto(parrafo, String(valor), busqueda);

    contenedor.appendChild(parrafo);
}

function resaltarTexto(contenedor, texto, busqueda) {
    if (!busqueda) {
        contenedor.appendChild(document.createTextNode(texto));
        return;
    }

    const textoMinuscula = texto.toLocaleLowerCase("es");
    const busquedaMinuscula = busqueda.toLocaleLowerCase("es");

    let inicio = 0;
    let posicion;

    while ((posicion = textoMinuscula.indexOf(
        busquedaMinuscula, inicio
    )) !== -1) {

        contenedor.appendChild(
            document.createTextNode(texto.slice(inicio, posicion))
        );

        const destacado = document.createElement("mark");
        destacado.textContent = texto.slice(
            posicion, posicion + busqueda.length
        );

        contenedor.appendChild(destacado);
        inicio = posicion + busqueda.length;
    }

    contenedor.appendChild(
        document.createTextNode(texto.slice(inicio))
    );
}



function agregarFormularioEvaluacion(item, id, valorPromedio) {
    const botonEvaluar = document.createElement("button");
    botonEvaluar.type = "button";
    botonEvaluar.textContent = "Evaluar";
    item.appendChild(botonEvaluar);

    const formulario = document.createElement("form");
    formulario.hidden = true;

    const etiqueta = document.createElement("label");
    etiqueta.textContent = "Selecciona una nota (1 a 7): ";

    const selector = document.createElement("select");
    selector.required = true;

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Seleccionar nota";
    selector.appendChild(opcionInicial);

    for (let i = 1; i <= 7; i++) {
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        selector.appendChild(opcion);
    }

    etiqueta.appendChild(selector);

    const botonGuardar = document.createElement("button");
    botonGuardar.type = "submit";
    botonGuardar.textContent = "Guardar nota";

    const mensajeNota = document.createElement("p");
    mensajeNota.setAttribute("role", "status");

    formulario.appendChild(etiqueta);
    formulario.appendChild(botonGuardar);

    item.appendChild(formulario);
    item.appendChild(mensajeNota);

    botonEvaluar.addEventListener("click", () => {
        formulario.hidden = !formulario.hidden;
        mensajeNota.textContent = "";

        if (!formulario.hidden) {
            selector.focus();
        }
    });

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nota = Number(selector.value);

        if (!Number.isInteger(nota) || nota < 1 || nota > 7) {
            mensajeNota.textContent = "Selecciona una nota válida.";
            return;
        }

        botonGuardar.disabled = true;
        mensajeNota.textContent = "Guardando evaluación...";

        try {
            const respuesta = await fetch(
                `${API_BASE}/api/avistamientos/${id}/notas`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nota })
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo guardar la nota");
            }

            const datos = await respuesta.json();

            valorPromedio.textContent = datos.promedio;
            mensajeNota.textContent = "¡Evaluación guardada!";

            selector.value = "";
            formulario.hidden = true;

        } catch (error) {
            mensajeNota.textContent = "Error al guardar la evaluación.";
            console.error(error);
        } finally {
            botonGuardar.disabled = false;
        }
    });
}
