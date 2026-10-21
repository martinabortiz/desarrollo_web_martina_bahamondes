async function cargarGraficoAvistamientos() {

    const mensaje = document.getElementById("mensaje-grafico");

    try {
        const respuesta = await fetch("/api/estadisticas/avistamientos-dia");

        if (!respuesta.ok) {
            throw new Error("Error al obtener estadísticas");
        }

        const datos = await respuesta.json();

        if (datos.length === 0) {
            mensaje.textContent = "Todavía no hay avistamientos registrados.";
            return;
        }

        const fechas = datos.map(dato => dato.fecha);
        const cantidades = datos.map(dato => dato.cantidad);

        const canvas = document.getElementById("grafico-avistamientos");

        new Chart(canvas, {
            type: "line",

            data: {
                labels: fechas,

                datasets: [{
                    label: "Cantidad de avistamientos",
                    data: cantidades,
                    borderColor: "#2c5598",
                    backgroundColor: "#2697a6",
                    tension: 0.2
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: "Cantidad de avistamientos"
                        }
                    },

                    x: {
                        title: {
                            display: true,
                            text: "Fecha"
                        }
                    }
                }
            }
        });

    } catch (error) {
        mensaje.textContent = "No se pudieron cargar las estadísticas.";
        console.error(error);
    }
}

async function cargarGraficoAves() {

    const mensaje = document.getElementById("mensaje-grafico-aves");

    try {
        const respuesta = await fetch("/api/estadisticas/avistamientos-ave");

        if (!respuesta.ok) {
            throw new Error("Error al obtener estadísticas");
        }

        const datos = await respuesta.json();

        if (datos.length === 0) {
            mensaje.textContent = "Todavía no hay avistamientos registrados.";
            return;
        }

        const nombres = datos.map(dato => dato.ave);
        const cantidades = datos.map(dato => dato.cantidad);

        const canvas = document.getElementById("grafico-aves");

        new Chart(canvas, {
            type: "pie",

            data: {
                labels: nombres,

                datasets: [{
                    label: "Avistamientos",
                    data: cantidades,
                    backgroundColor: [
                        "#2c5598",
                        "#2697a6",
                        "#62b6a4",
                        "#82a8d1",
                        "#91c788",
                        "#f0b76e",
                        "#a58bc5",
                        "#e58f8f"
                    ]
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

    } catch (error) {
        mensaje.textContent = "No se pudieron cargar las estadísticas.";
        console.error(error);
    }
}

async function cargarGraficoComunas() {

    const mensaje = document.getElementById("mensaje-grafico-comunas");

    try {
        const respuesta = await fetch("/api/estadisticas/voluntarios-comuna");

        if (!respuesta.ok) {
            throw new Error("Error al obtener estadísticas");
        }

        const datos = await respuesta.json();

        if (datos.length === 0) {
            mensaje.textContent = "Todavía no hay voluntarios registrados.";
            return;
        }

        const comunas = datos.map(dato => dato.comuna);
        const cantidades = datos.map(dato => dato.cantidad);

        const canvas = document.getElementById("grafico-comunas");

        new Chart(canvas, {
            type: "bar",

            data: {
                labels: comunas,

                datasets: [{
                    label: "Cantidad de voluntarios",
                    data: cantidades,
                    backgroundColor: "#2697a6",
                    borderColor: "#2c5598",
                    borderWidth: 1
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: "Cantidad de voluntarios"
                        }
                    },

                    x: {
                        title: {
                            display: true,
                            text: "Comuna"
                        }
                    }
                }
            }
        });

    } catch (error) {
        mensaje.textContent = "No se pudieron cargar las estadísticas.";
        console.error(error);
    }
}


async function cargarTotales() {

    try {
        const respuesta = await fetch("/api/estadisticas/totales");

        if (!respuesta.ok) {
            throw new Error("Error al obtener los totales");
        }

        const datos = await respuesta.json();

        document.getElementById("total-voluntarios").textContent =
            datos.voluntarios;

        document.getElementById("total-avistamientos").textContent =
            datos.avistamientos;

    } catch (error) {
        console.error("No se pudieron cargar los totales:", error);
    }
}

cargarGraficoAvistamientos();
cargarGraficoAves();
cargarGraficoComunas();
cargarTotales();