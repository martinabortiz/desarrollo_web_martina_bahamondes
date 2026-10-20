DROP SCHEMA IF EXISTS tarea2;

CREATE SCHEMA tarea2
DEFAULT CHARACTER SET utf8;

USE tarea2;

CREATE TABLE region (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE comuna (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    region_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (region_id)
        REFERENCES region(id)
);

CREATE TABLE voluntario (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(80) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    comuna_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (comuna_id)
        REFERENCES comuna(id)
);

CREATE TABLE ave (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE avistamiento (
    id INT NOT NULL AUTO_INCREMENT,
    voluntario_id INT NOT NULL,
    ave_id INT NOT NULL,
    comuna_id INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    lugar VARCHAR(200) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (voluntario_id) REFERENCES voluntario(id),
    FOREIGN KEY (ave_id) REFERENCES ave(id),
    FOREIGN KEY (comuna_id) REFERENCES comuna(id)
);

CREATE TABLE registro (
    id INT NOT NULL AUTO_INCREMENT,
    ruta_archivo VARCHAR(300) NOT NULL,
    nombre_archivo VARCHAR(300) NOT NULL,
    avistamiento_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (avistamiento_id)
        REFERENCES avistamiento(id)
);

