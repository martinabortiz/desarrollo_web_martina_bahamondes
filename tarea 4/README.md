
# Tarea 4 - Desarrollo de Aplicaciones Web

## Descripción

Esta tarea incorpora un buscador dinámico y un sistema de evaluación de avistamientos a la aplicación web de aves desarrollada anteriormente.

La aplicación utiliza Flask para presentar las páginas web y Spring Boot para implementar los nuevos servicios de búsqueda y evaluación.

## Herramientas utilizadas

- Python y Flask: aplicación web original.
- Java 21 y Spring Boot: servicios del backend.
- Spring Data JPA: acceso a los datos.
- MySQL: base de datos.
- HTML y CSS: estructura y estilos.
- JavaScript: solicitudes asíncronas mediante Fetch API.

## Funcionalidades

### Búsqueda de avistamientos

- Búsqueda dinámica por nombre del ave, voluntario o comuna.
- Presentación de resultados sin recargar la página.
- Destacado del texto coincidente.
- Visualización de fecha y nota promedio.
- Enlace al detalle de cada avistamiento.

### Evaluación de avistamientos

- Evaluaciones mediante notas enteras entre 1 y 7.
- Almacenamiento de las notas en MySQL.
- Cálculo y actualización del promedio sin recargar la página.

## Requisitos

- Python y las dependencias de la Tarea 3.
- Java 21.
- MySQL.
- Base de datos `tarea2`.

## Configuración de la base de datos

1. Configurar la base de datos de la aplicación original.
2. Ejecutar `tabla-nota.sql` para crear la tabla de evaluaciones.
3. Configurar las credenciales de conexión de Flask.
4. Configurar las variables de entorno para Spring Boot.

## Ejecución

Se necesitan dos terminales independientes.

### Terminal 1: Flask

Desde la carpeta `tarea 3`, activar el entorno virtual correspondiente y ejecutar:

    python app.py

La aplicación Flask estará disponible en:

http://127.0.0.1:5000

### Terminal 2: Spring Boot

Desde la carpeta `tarea 4`, configurar las variables de entorno en PowerShell:

    $env:DB_USERNAME = Read-Host "Usuario de MySQL"
    $env:DB_PASSWORD = Read-Host "Contraseña de MySQL"

Luego ejecutar:

    .\mvnw.cmd spring-boot:run

La API de Spring Boot estará disponible en:

http://localhost:8080

## Acceso al buscador

Con ambos servidores ejecutándose, ingresar a la aplicación Flask y seleccionar la opción de buscar y evaluar avistamientos desde el menú.

También puede accederse directamente mediante:

http://127.0.0.1:5000/buscador.html

## Consideraciones

- Flask y Spring Boot deben ejecutarse simultáneamente.
- Ambos utilizan la misma base de datos MySQL.
- Las credenciales personales no están incluidas en el repositorio.
