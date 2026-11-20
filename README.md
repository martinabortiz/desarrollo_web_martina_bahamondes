# desarrollo_web_martina_bahamondes

# Tarea 1 - Desarrollo de Aplicaciones Web

El sistema busca representar una plataforma colaborativa para el registro y consulta de avistamientos de aves en Chile. El prototipo fue desarrollado utilizando HTML5, CSS3 y JavaScript, sin servidor ni base de datos.

## Estructura general y flujo de navegación

La aplicación fue dividida en distintas páginas HTML, de manera que cada una tenga una función principal y la navegación entre ellas sea sencilla.

El flujo general es el siguiente:

`inicio.html`
→ `registro.html`
→ `intermedio.html`

Desde el menú principal (`intermedio.html`) se puede acceder a:

- `registro-ave.html`: registrar un nuevo avistamiento.
- `listado-aves.html`: consultar los avistamientos registrados.
- `estadisticas.html`: consultar indicadores y gráficos.

### Página de inicio

`inicio.html` corresponde a la portada de la aplicación. Contiene una imagen relacionada con las aves de Chile, una breve descripción del objetivo de la plataforma y un enlace para registrarse como voluntario.

### Registro de voluntario

`registro.html` contiene el formulario de registro de voluntarios.

Se solicita información que permite identificar y contactar al voluntario:

- Nombre completo.
- Correo electrónico.
- Repetición del correo electrónico.
- Número de teléfono.
- Región.
- Comuna.

Las validaciones se realizan mediante JavaScript en `registro.js`.

Entre las reglas definidas se encuentran:

- El nombre debe tener un largo válido y no contener números.
- El correo debe tener un formato válido.
- Ambos correos ingresados deben coincidir.
- El número de celular debe tener un formato válido.
- Se debe seleccionar una región.
- La comuna debe tener un largo válido y contener al menos una letra.

Cuando todos los datos son correctos, el usuario es dirigido al menú principal.

No se implementó un sistema de contraseña o inicio de sesión, ya que este prototipo no utiliza una base de datos ni requiere almacenar la información ingresada.

### Menú principal

`intermedio.html` funciona como menú principal después del registro del voluntario.

Desde esta página se puede:

- Registrar un avistamiento.
- Consultar el listado de avistamientos.
- Revisar las estadísticas del sistema.

Esta página permite mantener separada la portada inicial de las funcionalidades principales disponibles para un voluntario.

## Registro de avistamientos

`registro-ave.html` contiene el formulario utilizado para registrar un avistamiento.

El formulario fue separado mediante `fieldset` y `legend` en tres grupos:

1. Información del ave.
2. Información del avistamiento.
3. Registro audiovisual.

Los datos solicitados son:

- Tipo de ave.
- Nombre del ave.
- Región.
- Comuna.
- Lugar.
- Fecha del avistamiento.
- Hora del avistamiento.
- Fotografía o video.
- Comentarios adicionales, de forma opcional.

El tipo de ave se selecciona desde una lista de categorías predefinidas. Esta decisión permite mantener consistencia entre los registros y posteriormente utilizar las mismas categorías para filtrar el listado de avistamientos.

Las validaciones se realizan mediante JavaScript en `registro-avistamiento.js`.

Entre las principales reglas se encuentran:

- Se debe seleccionar un tipo de ave.
- El nombre del ave debe tener un formato y largo válido.
- Se debe seleccionar una región.
- La comuna y el lugar deben contener información válida.
- La fecha no puede encontrarse en el futuro ni tener más de un año de antigüedad.
- Si el avistamiento corresponde al día actual, la hora tampoco puede encontrarse en el futuro.
- Se debe agregar al menos una fotografía o video.
- El archivo seleccionado debe corresponder a una imagen o video.
- Los comentarios son opcionales y tienen un máximo de caracteres.

## Listado de avistamientos

`listado-aves.html` permite consultar los registros disponibles.

Los datos utilizados para representar los avistamientos se encuentran en `datos.js`. Debido a que la tarea corresponde a un prototipo sin almacenamiento persistente, estos registros son datos de ejemplo cargados directamente desde JavaScript.

El listado permite:

- Mostrar todos los avistamientos.
- Filtrar por tipo de ave.
- Ordenar por fecha, desde la más reciente o más antigua.
- Ordenar por lugar de forma alfabética.
- Mostrar los resultados mediante paginación.

La lógica de estas funciones se encuentra en `listado.js`.

Se definió como visualización inicial mostrar todos los avistamientos ordenados desde el más reciente.

Cada registro se presenta como una sección independiente e incluye la información del avistamiento y su evidencia audiovisual.

Para representar fotografías y videos, cada registro de `datos.js` indica el tipo de archivo y su ubicación. JavaScript crea un elemento `img` cuando la evidencia corresponde a una fotografía y un elemento `video` cuando corresponde a un video.

Las fotografías y videos utilizados en estos registros son archivos locales del proyecto.

## Estadísticas

`estadisticas.html` contiene indicadores y gráficos relacionados con voluntarios y avistamientos.

Actualmente se muestran:

- Cantidad total de voluntarios registrados.
- Cantidad total de avistamientos.
- Avistamientos por tipo de ave.
- Voluntarios por región.

La lógica se encuentra en `estadisticas.js`.

El número de avistamientos y su distribución por tipo son calculados utilizando los registros presentes en `datos.js`.

Debido a que el registro de voluntarios no se almacena de forma persistente, los datos utilizados para representar la cantidad de voluntarios por región son datos ficticios definidos únicamente para mostrar el funcionamiento de la interfaz de estadísticas.

Los gráficos fueron implementados directamente con HTML, CSS y JavaScript mediante barras cuyo ancho depende de la cantidad correspondiente a cada categoría. No se utilizaron librerías externas de gráficos.

## Diseño y CSS

Se utilizó una estética común en todas las páginas.

La paleta utiliza principalmente:

- Tonos verdes y celestes claros para el fondo.
- Verde oscuro para títulos y textos destacados.
- Tonos rojizos para botones y acciones principales.
- Tarjetas blancas para separar visualmente formularios, registros e indicadores.

El diseño busca mantenerse simple y fácil de utilizar, sin agregar elementos gráficos innecesarios.

Para mejorar la visualización de los formularios se utilizaron:

- Bordes redondeados.
- Sombras suaves.
- Cambios de borde al seleccionar un campo.
- Mensajes de error cercanos al campo correspondiente.
- Botones con cambios visuales al pasar el cursor.

También se utilizaron medidas relativas y límites máximos de ancho para que las páginas puedan adaptarse de mejor manera a distintas resoluciones.

El CSS se mantuvo dentro de cada archivo HTML para que cada página del prototipo sea fácil de revisar de forma independiente. 
 Además, cabe destacar que para la construcción del CSS se utilizó información disponible en internet, para mejorar la estética de la plataforma. 
 

## HTML semántico

Se intentó mantener una estructura HTML clara y evitar el uso innecesario de etiquetas `div`.

Se utilizaron etiquetas semánticas como:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `form`
- `fieldset`
- `legend`
- `label`

En particular, `fieldset` y `legend` fueron utilizados para agrupar información relacionada dentro del formulario de avistamiento, mientras que `article` se utiliza para representar elementos independientes, como indicadores o registros.

Además, los elementos `label` están asociados a los campos correspondientes mediante el atributo `for`.

## JavaScript y validaciones

Las validaciones principales de los formularios fueron implementadas utilizando JavaScript.

Los formularios utilizan `novalidate` para evitar depender exclusivamente de las validaciones automáticas del navegador y permitir que las reglas sean controladas desde los archivos JavaScript.

Cuando se intenta enviar un formulario, se utiliza `event.preventDefault()` para detener temporalmente el comportamiento normal del formulario, realizar las validaciones y permitir la navegación a la siguiente página solamente cuando todos los datos son correctos.

Los mensajes de error se presentan directamente bajo el campo que presenta el problema.

## Manejo de datos

La aplicación no utiliza servidor, base de datos ni almacenamiento persistente.

Por este motivo, los datos ingresados mediante los formularios son validados, pero no quedan almacenados después de cambiar de página.

Los avistamientos presentados en el listado corresponden a registros de ejemplo definidos en `datos.js`. Esto permite demostrar el funcionamiento de:

- Filtros.
- Ordenamiento.
- Paginación.
- Fotografías y videos.
- Indicadores.
- Gráficos.

Esta decisión se tomó considerando que el objetivo de la tarea es desarrollar y validar las interfaces, navegación y reglas de los datos, y no implementar persistencia.

## Archivos principales

- `inicio.html`: portada del sistema.
- `registro.html`: registro de voluntarios.
- `registro.js`: validaciones del registro de voluntarios.
- `intermedio.html`: menú principal.
- `registro-ave.html`: formulario de registro de avistamientos.
- `registro-avistamiento.js`: validaciones del avistamiento.
- `listado-aves.html`: consulta de avistamientos.
- `listado.js`: filtros, ordenamiento, visualización y paginación.
- `datos.js`: registros ficticios utilizados por el prototipo.
- `estadisticas.html`: página de indicadores y gráficos.
- `estadisticas.js`: generación de indicadores y gráficos.
- Archivos de imagen y video: evidencia audiovisual utilizada en los registros de ejemplo.

## Consideraciones

Este proyecto corresponde a un prototipo frontend. Por esta razón:

- No existe almacenamiento permanente de los registros.
- No se utiliza una base de datos.
- No se utiliza un servidor web.
- No existe autenticación de usuarios.
- Los registros mostrados en el listado son datos de ejemplo.
- Los datos de voluntarios utilizados en las estadísticas son ficticios.
- **Las fotos fueron tomadas por mi, por lo tanto no poseen derechos de autor.**

El objetivo principal de la implementación es demostrar el flujo de navegación, las interfaces, las validaciones de los formularios y las distintas formas de consultar la información.
