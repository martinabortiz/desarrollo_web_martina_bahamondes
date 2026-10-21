# Tarea 3 - Desarrollo de Aplicaciones Web

Este proyecto consiste en una aplicación para registrar y consultar avistamientos de aves en Chile. Es una continuación de la Tarea 2, donde se trabajó con Flask, MySQL y SQLAlchemy.

En esta tarea se agregaron gráficos de estadísticas y un sistema de comentarios. Para ambas funciones se utilizó JavaScript con `fetch()`, lo que permite obtener y enviar información sin recargar la página.

## Estructura y navegación

Desde `inicio.html` se puede registrar un voluntario o ingresar con un correo ya registrado. Después se accede a `intermedio.html`, donde están las opciones para registrar avistamientos, revisar el listado y ver las estadísticas.

Los avistamientos se guardan en MySQL y pueden incluir fotografías o videos. Al seleccionar uno del listado se abre su página de detalle.

## Estadísticas

En `estadisticas.html` se implementaron tres gráficos:

- Avistamientos registrados por día (líneas).
- Cantidad de avistamientos por tipo de ave (circular).
- Cantidad de voluntarios por comuna (barras).

También se muestran los totales de voluntarios y avistamientos y se agregó un enlace para volver al inicio.

Los datos se consultan desde MySQL mediante funciones de `db.py`. Flask los entrega en formato JSON y `estadisticas.js` los obtiene con `fetch()` para mostrarlos utilizando Chart.js.

## Comentarios

En `detalle-avistamiento.html` se agregó una sección para ver y escribir comentarios asociados a cada avistamiento.

Los comentarios se guardan en una nueva tabla de MySQL, relacionada con `avistamiento` mediante una clave foránea. Se utiliza `comentario.js` para cargarlos y enviarlos con `fetch()`, sin recargar la página.

Se valida que el nombre tenga entre 3 y 50 caracteres y el comentario entre 5 y 300. Estas condiciones también se revisan en Flask. Para mostrar los textos se utiliza `textContent`, evitando interpretarlos como HTML.

## Base de datos

Se mantiene la base de datos `tarea2` de la tarea anterior, con las tablas de regiones, comunas, voluntarios, aves, avistamientos y registros audiovisuales. Se agregó la tabla `comentario`.

Para crear la base de datos desde cero se deben ejecutar los archivos SQL en este orden:

1. `tarea2.sql`
2. `region-comuna.sql`
3. `aves.sql`
4. `tabla-comentario.sql`

**Importante:** `tarea2.sql` elimina la base de datos anterior, por lo que no debe ejecutarse si se quieren conservar los registros existentes.

## Ejecución

Se requiere Python, MySQL y conexión a Internet para cargar Chart.js. Desde la carpeta del proyecto, en PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Luego se debe crear un archivo `.env` siguiendo `.env.example` e ingresar los datos de conexión a MySQL y la clave secreta de Flask. El usuario configurado debe tener permisos sobre la base de datos.

Para iniciar la aplicación:

```powershell
python app.py
```

Abrir `http://127.0.0.1:5000` en el navegador.

## Archivos principales

- `app.py`: rutas de Flask y respuestas JSON.
- `db.py`: consultas y operaciones en la base de datos.
- `models.py`: modelos y relaciones de las tablas.
- `validations.py`: validaciones en Python.
- `templates/`: páginas HTML.
- `static/js/estadisticas.js`: gráficos de estadísticas.
- `static/js/comentario.js`: carga y envío de comentarios.
- `requirements.txt`: dependencias de Python.
- `.env.example`: ejemplo de configuración.

## Decisiones de implementación

Se mantuvo la estructura de la Tarea 2 para aprovechar las páginas y funciones existentes. Las nuevas consultas se agregaron en `db.py` y los resultados se enviaron a JavaScript mediante rutas de Flask que devuelven JSON.

Se utilizó `fetch()` para actualizar los comentarios y cargar los gráficos sin recargar la página. Las validaciones importantes se realizan también en el servidor para no depender solamente del navegador.
