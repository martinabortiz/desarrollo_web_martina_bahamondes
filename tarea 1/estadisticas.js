// DATOS FICTICIOS DE VOLUNTARIOS POR REGIÓN

const voluntariosPorRegion = [
  {
    region: "Metropolitana",
    cantidad: 35
  },

  {
    region: "Valparaíso",
    cantidad: 20
  },

  {
    region: "Biobío",
    cantidad: 16
  },

  {
    region: "Los Lagos",
    cantidad: 12
  },

  {
    region: "La Araucanía",
    cantidad: 10
  },

  {
    region: "Otras regiones",
    cantidad: 27
  }
];


// TOTAL DE AVISTAMIENTOS

const totalAvistamientos = avistamientos.length;


// TOTAL DE VOLUNTARIOS

let totalVoluntarios = 0;

voluntariosPorRegion.forEach(function(dato) {

  totalVoluntarios =
    totalVoluntarios + dato.cantidad;

});


// MOSTRAR LOS TOTALES EN EL HTML

document.getElementById(
  "total-avistamientos"
).textContent = totalAvistamientos;


document.getElementById(
  "total-voluntarios"
).textContent = totalVoluntarios;


// CONTAR AVISTAMIENTOS POR TIPO

const cantidadPorTipo = {};


avistamientos.forEach(function(avistamiento) {

  const tipo = avistamiento.tipoTexto;

  if (cantidadPorTipo[tipo] === undefined) {

    cantidadPorTipo[tipo] = 1;

  }

  else {

    cantidadPorTipo[tipo] =
      cantidadPorTipo[tipo] + 1;

  }

});


// FUNCIÓN PARA CREAR UNA BARRA

function crearBarra(
  contenedor,
  nombre,
  cantidad,
  maximo
) {

  const fila =
    document.createElement("div");

  fila.classList.add("fila-grafico");


  const nombreBarra =
    document.createElement("p");

  nombreBarra.classList.add("nombre-barra");

  nombreBarra.textContent = nombre;


  const fondoBarra =
    document.createElement("div");

  fondoBarra.classList.add("contenedor-barra");


  const barra =
    document.createElement("div");

  barra.classList.add("barra");


  const porcentaje =
    (cantidad / maximo) * 100;


  barra.style.width =
    porcentaje + "%";


  barra.textContent =
    cantidad;


  fondoBarra.appendChild(barra);

  fila.appendChild(nombreBarra);

  fila.appendChild(fondoBarra);

  contenedor.appendChild(fila);

}


// GRÁFICO DE AVISTAMIENTOS POR TIPO

function mostrarGraficoTipos() {

  const contenedor =
    document.getElementById("grafico-tipos");


  let maximo = 0;


  // Buscar cuál tipo tiene más avistamientos

  for (const tipo in cantidadPorTipo) {

    if (cantidadPorTipo[tipo] > maximo) {

      maximo = cantidadPorTipo[tipo];

    }

  }


  // Crear una barra para cada tipo

  for (const tipo in cantidadPorTipo) {

    crearBarra(
      contenedor,
      tipo,
      cantidadPorTipo[tipo],
      maximo
    );

  }

}


// GRÁFICO DE VOLUNTARIOS POR REGIÓN

function mostrarGraficoRegiones() {

  const contenedor =
    document.getElementById("grafico-regiones");


  let maximo = 0;


  // Buscar la región con más voluntarios

  voluntariosPorRegion.forEach(function(dato) {

    if (dato.cantidad > maximo) {

      maximo = dato.cantidad;

    }

  });


  // Crear una barra para cada región

  voluntariosPorRegion.forEach(function(dato) {

    crearBarra(
      contenedor,
      dato.region,
      dato.cantidad,
      maximo
    );

  });

}


// MOSTRAR LOS GRÁFICOS

mostrarGraficoTipos();

mostrarGraficoRegiones();