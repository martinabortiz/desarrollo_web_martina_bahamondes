from flask import Flask, request, render_template, redirect, url_for,session, flash
import db
from datetime import datetime
from validations import validate_voluntario, validate_avistamiento
from uuid import uuid4
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

app.secret_key = "clave_tarea2"

UPLOAD_FOLDER = "static/uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

EXTENSIONES_PERMITIDAS = {
    "png", "jpg", "jpeg", "gif",
    "mp4", "mov", "avi"
}

@app.route("/listado-aves.html")
def listado_avistamientos():

    avistamientos_db = db.get_avistamientos()

    avistamientos = []

    for avistamiento in avistamientos_db:

        archivo = None
        tipo_archivo = None

        if len(avistamiento.registros) > 0:

            registro = avistamiento.registros[0]

            archivo = url_for(
                "static",
                filename=registro.ruta_archivo
            )

            extension = registro.nombre_archivo.rsplit(
                ".", 1
            )[1].lower()

            if extension in ["png", "jpg", "jpeg", "gif"]:
                tipo_archivo = "imagen"
            else:
                tipo_archivo = "video"

        avistamientos.append({
            "id": avistamiento.id,
            "nombre": avistamiento.ave.nombre,
            "lugar": avistamiento.lugar,
            "comuna": (avistamiento.comuna.nombre if avistamiento.comuna else "Sin comuna"),
            "region": (avistamiento.comuna.region.nombre if avistamiento.comuna else "Sin región"),
            "fecha": avistamiento.fecha_hora.strftime("%Y-%m-%d"),
            "hora": avistamiento.fecha_hora.strftime("%H:%M"),
            "archivo": archivo,
            "tipoArchivo": tipo_archivo,
            "detalle_url": url_for(
            "detalle_avistamiento", avistamiento_id=avistamiento.id)
        })

    return render_template(
        "listado-aves.html",
        avistamientos=avistamientos
    )

@app.route("/")
def index():
    return render_template(
        "inicio.html"
    )

@app.route("/estadisticas.html")
def estadisticas():
    return render_template("estadisticas.html")

@app.route("/registro-ave.html", methods=["GET", "POST"])
def registrar_avistamiento():

    if "voluntario_id" not in session:
        return redirect(url_for("index"))

    aves = db.get_aves()
    regiones = db.get_regiones()
    comunas = db.get_comunas()

    if request.method == "POST":

        ave_id = request.form.get("ave")
        region_id = request.form.get("region")
        comuna_id = request.form.get("comuna")
        fecha = request.form.get("fecha")
        hora = request.form.get("hora")
        lugar = request.form.get("lugar")
        descripcion = request.form.get("comentarios", "")

        archivos = request.files.getlist("archivo")

        error = None
        fecha_hora = None

        # Unir fecha + hora
        if fecha and hora:
            try:
                fecha_hora = datetime.fromisoformat(
                    f"{fecha}T{hora}"
                )
            except ValueError:
                pass

        # Validar datos
        if not validate_avistamiento(
            ave_id,
            region_id,
            comuna_id,
            fecha_hora,
            lugar
        ):
            error = "Uno o más campos no son válidos."

        else:

            ave = db.get_ave_by_id(int(ave_id))
            comuna = db.get_comuna_by_id(int(comuna_id))

            if ave is None:
                error = "El ave seleccionada no es válida."

            elif (
                comuna is None
                or comuna.region_id != int(region_id)
            ):
                error = "La comuna seleccionada no pertenece a la región."

            # Validar archivos
            elif (
                len(archivos) == 0
                or archivos[0].filename == ""
            ):
                error = "Debe agregar al menos una foto o video."

            elif not all(
                archivo_permitido(archivo.filename)
                for archivo in archivos
            ):
                error = "Uno o más archivos no son válidos."

            else:

                avistamiento_id = db.create_avistamiento(
                    session["voluntario_id"],
                    int(ave_id),
                    int(comuna_id),
                    fecha_hora,
                    lugar,
                    descripcion
                )

                for archivo in archivos:

                    nombre_original = secure_filename(
                        archivo.filename
                    )

                    extension = nombre_original.rsplit(
                        ".", 1
                    )[1].lower()

                    nombre_guardado = (
                        f"{uuid4().hex}.{extension}"
                    )

                    ruta_guardado = os.path.join(
                        app.config["UPLOAD_FOLDER"],
                        nombre_guardado
                    )

                    archivo.save(ruta_guardado)

                    db.create_registro(
                        f"uploads/{nombre_guardado}",
                        nombre_original,
                        avistamiento_id
                    )

                flash(
                    "Avistamiento registrado exitosamente.",
                    "success"
                )

                return redirect(url_for("intermedio"))

        return render_template(
            "registro-ave.html",
            aves=aves,
            regiones=regiones,
            comunas=comunas,
            error=error
        )

    return render_template(
        "registro-ave.html",
        aves=aves,
        regiones=regiones,
        comunas=comunas
    )

@app.route("/registro.html", methods=["GET", "POST"])
def registrar_voluntario():

    regiones = db.get_regiones()
    comunas = db.get_comunas()

    # print("Regiones:", len(regiones))
    # print("Comunas:", len(comunas))

    

    if request.method == "POST":

        nombre = request.form.get("nombre")
        email = request.form.get("email")
        repetir_email = request.form.get("repetir_email")
        telefono = request.form.get("telefono")
        region_id = request.form.get("region")
        comuna_id = request.form.get("comuna")

        error = None

        if not validate_voluntario(
            nombre,
            email,
            repetir_email,
            telefono,
            region_id,
            comuna_id
        ):
            error = "Uno o más campos no son válidos."

        else:
            comuna = db.get_comuna_by_id(int(comuna_id))

            if (
                comuna is None
                or comuna.region_id != int(region_id)
            ):
                error = "La comuna seleccionada no pertenece a la región."

            else:

                voluntario_existente = db.get_voluntario_by_email(email)

                if voluntario_existente is not None:
                    error = "Ya existe un voluntario registrado con ese correo."

                else:
                    voluntario_id = db.create_voluntario(
                        nombre,
                        email,
                        telefono,
                        int(comuna_id)
                    )

                    session["voluntario_id"] = voluntario_id

                    flash("Voluntario registrado exitosamente.", "success")
                    return redirect(url_for("intermedio"))

        return render_template(
            "registro.html",
            regiones=regiones,
            comunas=comunas,
            error=error
        )

    return render_template(
        "registro.html",
        regiones=regiones,
        comunas=comunas
    )

@app.route("/ingresar", methods=["GET", "POST"])
def ingresar():

    if request.method == "POST":
        email = request.form.get("email", "").strip()

        voluntario = db.get_voluntario_by_email(email)

        if voluntario is None:
            return render_template(
                "ingresar.html",
                error="No existe un voluntario registrado con ese correo."
            )

        session["voluntario_id"] = voluntario.id

        flash("Ingreso exitoso. ¡Bienvenido!", "success")
        return redirect(url_for("intermedio"))

    return render_template("ingresar.html")

@app.route("/avistamiento/<int:avistamiento_id>")
def detalle_avistamiento(avistamiento_id):

    avistamiento = db.get_avistamiento_by_id(
        avistamiento_id
    )

    if avistamiento is None:
        flash(
            "El avistamiento solicitado no existe.",
            "error"
        )
        return redirect(
            url_for("listado_avistamientos")
        )

    return render_template(
        "detalle-avistamiento.html",
        avistamiento=avistamiento
    )


@app.route("/intermedio")
def intermedio():

    if "voluntario_id" not in session:
        return redirect(url_for("index"))
    
    ultimos_avistamientos = db.get_ultimos_avistamientos()

    return render_template(
        "intermedio.html",
        ultimos_avistamientos=ultimos_avistamientos
    )



if __name__ == "__main__":
    app.run(debug=True)