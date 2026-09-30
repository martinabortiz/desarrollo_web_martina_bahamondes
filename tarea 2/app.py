from flask import Flask
from sqlalchemy import create_engine, text

app = Flask(__name__)

# Conexión a la base de datos
DATABASE_URL = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"

engine = create_engine(DATABASE_URL)


@app.route("/")
def index():

    with engine.connect() as conexion:

        resultado = conexion.execute(
            text("SELECT COUNT(*) FROM region")
        )

        cantidad_regiones = resultado.scalar()

    return f"Flask conectado a MySQL. Cantidad de regiones: {cantidad_regiones}"


if __name__ == "__main__":
    app.run(debug=True)