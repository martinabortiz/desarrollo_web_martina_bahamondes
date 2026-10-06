# desarrollo_web_martina_bahamondes

# Tarea 2 - Desarrollo de Aplicaciones Web

El sistema corresponde a una plataforma colaborativa para el registro y consulta de avistamientos de aves en Chile.

A diferencia de la Tarea 1, en esta versión se incorporó almacenamiento persistente mediante una base de datos MySQL y un servidor desarrollado en Python utilizando Flask. Para la interacción con la base de datos se utilizó SQLAlchemy.

## Estructura general y flujo de navegación

La aplicación fue dividida en distintas páginas HTML, manteniendo una función principal para cada una.

El flujo general es:

`inicio.html` → registro o ingreso → `intermedio.html`

Desde el menú principal (`intermedio.html`) se puede acceder a:

- `registro-ave.html`: registrar un nuevo avistamiento.
- `listado-aves.html`: consultar los avistamientos registrados.
- `estadisticas.html`: acceder a la sección de estadísticas.

Además, el menú muestra los últimos avistamientos registrados en la base de datos.

## Página de inicio

`inicio.html` corresponde a la página inicial de la aplicación.

Desde esta página el usuario puede registrarse como voluntario o ingresar utilizando el correo electrónico de un voluntario previamente registrado.

No se implementó un sistema de contraseñas, ya que para esta tarea se decidió identificar al voluntario mediante su correo electrónico.

## Registro de voluntario

`registro.html` contiene el formulario utilizado para registrar voluntarios.

Se solicita:

- Nombre completo.
- Correo electrónico.
- Repetición del correo electrónico.
- Número de teléfono.
- Región.
- Comuna.

Las regiones y comunas se obtienen directamente desde la base de datos.

Al seleccionar una región, JavaScript filtra las comunas para mostrar únicamente aquellas que pertenecen a la región seleccionada.

Las validaciones se realizan tanto en JavaScript como en Flask.

Entre las principales reglas se encuentran:

- El nombre debe tener un largo válido.
- El correo electrónico debe tener un formato válido.
- Ambos correos deben coincidir.
- El teléfono debe tener un formato válido.
- Se debe seleccionar una región y una comuna.
- La comuna seleccionada debe pertenecer a la región seleccionada.
- No se permite registrar dos voluntarios con el mismo correo electrónico.

Cuando los datos son válidos, el voluntario se inserta en la tabla `voluntario` y se almacena su identificador en la sesión de Flask.

## Ingreso de voluntario

`ingresar.html` permite acceder utilizando el correo electrónico de un voluntario registrado.

Flask consulta la base de datos utilizando el correo ingresado. Si existe un voluntario asociado, su identificador queda almacenado en la sesión.

De esta forma, los avistamientos registrados posteriormente pueden quedar asociados automáticamente al voluntario activo.

## Menú principal

`intermedio.html` funciona como menú principal de la aplicación.

Desde esta página se puede:

- Registrar un nuevo avistamiento.
- Consultar el listado de avistamientos.
- Acceder a estadísticas.

Además, se muestran los últimos dos avistamientos registrados en la base de datos.

Los mensajes de registro exitoso se muestran mediante `flash()` de Flask.

## Registro de avistamientos

`registro-ave.html` contiene el formulario utilizado para registrar un avistamiento.

Los datos solicitados son:

- Ave.
- Región.
- Comuna.
- Lugar.
- Fecha del avistamiento.
- Hora del avistamiento.
- Fotografías o videos.
- Comentarios adicionales de forma opcional.

Las aves, regiones y comunas se obtienen directamente desde la base de datos.

Al seleccionar una región se muestran solamente las comunas correspondientes.

Las validaciones se realizan tanto mediante JavaScript en `registro-avistamiento.js` como mediante Flask.

Entre las principales reglas se encuentran:

- Se debe seleccionar un ave.
- Se debe seleccionar una región y una comuna.
- La comuna debe pertenecer a la región seleccionada.
- El lugar debe contener entre 3 y 200 caracteres.
- La fecha no puede encontrarse en el futuro ni tener más de un año de antigüedad.
- Si el avistamiento corresponde al día actual, la hora no puede encontrarse en el futuro.
- Se debe agregar al menos una fotografía o video.
- Los archivos deben corresponder a extensiones permitidas.
- Los comentarios no pueden superar los 500 caracteres.

Una vez validada la información, se crea un registro en la tabla `avistamiento`.

## Región y comuna del avistamiento

Para almacenar la ubicación se agregó `comuna_id` a la tabla `avistamiento`.

No se almacena también `region_id`, ya que cada comuna contiene una referencia a su región.

Por lo tanto, la relación utilizada es:

`avistamiento` → `comuna` → `region`

Esto permite evitar almacenar información duplicada y obtener igualmente la región de cada avistamiento.

## Registro audiovisual

Las fotografías y videos seleccionados por el usuario se almacenan físicamente en:

`static/uploads/`

Para evitar conflictos entre nombres de archivos se genera un nombre único mediante `uuid4`.

La tabla `registro` almacena:

- Ruta del archivo.
- Nombre original del archivo.
- Identificador del avistamiento asociado.

Un avistamiento puede tener más de un archivo audiovisual asociado.

## Listado de avistamientos

`listado-aves.html` permite consultar los avistamientos almacenados en MySQL.

Los datos son obtenidos mediante Flask y SQLAlchemy y posteriormente enviados al HTML para su visualización.

El listado permite:

- Ordenar desde el avistamiento más reciente al más antiguo.
- Ordenar desde el más antiguo al más reciente.
- Ordenar por lugar de forma alfabética.
- Mostrar los resultados mediante paginación.

La lógica de ordenamiento, visualización y paginación se encuentra en `listado.js`.

Cada avistamiento se presenta mediante una tarjeta que incluye:

- Nombre del ave.
- Fotografía o video.
- Lugar.
- Comuna.
- Región.
- Fecha.
- Hora.

Cada tarjeta es seleccionable y permite acceder al detalle completo del avistamiento.

## Detalle de avistamiento

`detalle-avistamiento.html` muestra la información completa de un avistamiento seleccionado.

Se presenta:

- Ave.
- Voluntario asociado.
- Región.
- Comuna.
- Lugar.
- Fecha.
- Hora.
- Descripción.
- Fotografías y videos asociados.

La información se obtiene nuevamente desde MySQL utilizando el identificador del avistamiento presente en la URL.

## Estadísticas

`estadisticas.html` corresponde a la sección destinada a indicadores y métricas.

La página se encuentra incorporada a la navegación de la aplicación, pero el desarrollo de las estadísticas queda pendiente para la siguiente tarea según lo indicado en el enunciado.

## Base de datos y SQLAlchemy

La aplicación utiliza una base de datos MySQL llamada `tarea2`.

Las principales tablas utilizadas son:

- `region`
- `comuna`
- `voluntario`
- `ave`
- `avistamiento`
- `registro`

Las clases correspondientes se encuentran definidas en `models.py`.

Las relaciones entre los modelos se implementaron utilizando `ForeignKey` y `relationship`.

Las consultas e inserciones en la base de datos se concentran principalmente en `db.py`.

## Diseño y CSS

Se mantuvo una estética similar a la desarrollada en la Tarea 1.

La paleta utiliza principalmente:

- Tonos verdes y celestes claros para el fondo.
- Verde oscuro para títulos y elementos destacados.
- Tonos rojizos para botones y acciones principales.
- Tarjetas blancas para separar visualmente formularios y registros.

También se utilizaron:

- Bordes redondeados.
- Sombras suaves.
- Cambios visuales al pasar el cursor.
- Mensajes de error próximos a los campos correspondientes.
- Límites máximos de ancho para mejorar la visualización en distintas resoluciones.

## HTML semántico

Se intentó mantener una estructura HTML clara utilizando etiquetas semánticas como:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `form`
- `fieldset`
- `legend`
- `label`

Los elementos `fieldset` y `legend` se utilizan para agrupar información relacionada en los formularios, mientras que `article` se utiliza principalmente para representar registros independientes.

## JavaScript y validaciones

JavaScript continúa siendo utilizado para realizar validaciones inmediatas en los formularios y mejorar la experiencia del usuario.

Sin embargo, en esta tarea las mismas reglas importantes también son comprobadas desde Flask.

Esto permite evitar depender exclusivamente de las validaciones del navegador, ya que una solicitud podría enviarse directamente al servidor sin ejecutar JavaScript.

Entre las funcionalidades realizadas con JavaScript se encuentran:

- Validación de formularios.
- Filtrado de comunas según región.
- Validación de fecha y hora.
- Validación inicial de fotografías y videos.
- Ordenamiento del listado.
- Paginación del listado.
- Navegación hacia el detalle de un avistamiento.

## Manejo de datos

A diferencia de la Tarea 1, la aplicación utiliza almacenamiento persistente.

Los voluntarios, aves, comunas, regiones, avistamientos y registros audiovisuales se almacenan mediante MySQL.

SQLAlchemy se utiliza para realizar las consultas e inserciones desde Python.

Las fotografías y videos no se almacenan directamente dentro de la base de datos. En su lugar, se almacenan en el sistema de archivos y la tabla `registro` mantiene la información necesaria para encontrarlos.

## Archivos principales

- `app.py`: aplicación Flask y definición de rutas.
- `db.py`: consultas e inserciones en la base de datos.
- `models.py`: definición de los modelos SQLAlchemy.
- `validations.py`: validaciones realizadas en el servidor.
- `inicio.html`: página inicial.
- `registro.html`: formulario de registro de voluntarios.
- `ingresar.html`: ingreso mediante correo electrónico.
- `intermedio.html`: menú principal.
- `registro-ave.html`: formulario de registro de avistamientos.
- `detalle-avistamiento.html`: detalle completo de un avistamiento.
- `listado-aves.html`: listado de avistamientos.
- `estadisticas.html`: sección de estadísticas.
- `registro.js`: validaciones del registro de voluntarios.
- `registro-avistamiento.js`: validaciones del registro de avistamientos.
- `listado.js`: ordenamiento, visualización y paginación.
- `tarea2.sql`: estructura de la base de datos.
- `requirements.txt`: dependencias necesarias para ejecutar la aplicación.
- `static/uploads/`: almacenamiento de fotografías y videos registrados.

## Ejecución

Para instalar las dependencias:

```powershell
pip install -r requirements.txt
