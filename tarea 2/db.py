from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, joinedload, selectinload
from datetime import datetime
from models import Region, Comuna, Voluntario, Ave, Avistamiento, Registro


DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306


DATABASE_URL = (
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(
    DATABASE_URL,
    echo=False,
    future=True
)

SessionLocal = sessionmaker(bind=engine)


def get_regiones():
    session = SessionLocal()

    regiones = session.query(Region).all()

    session.close()

    return regiones

def get_comunas():
    session = SessionLocal()

    comunas = session.query(Comuna).all()

    session.close()

    return comunas


def get_comuna_by_id(comuna_id):
    session = SessionLocal()

    comuna = (
        session.query(Comuna)
        .filter_by(id=comuna_id)
        .first()
    )

    session.close()

    return comuna

def create_voluntario(nombre, email, telefono, comuna_id):
    session = SessionLocal()

    telefono = telefono.replace(" ", "").replace("-", "")


    nuevo_voluntario = Voluntario(
        nombre=nombre,
        email=email,
        telefono=telefono,
        fecha_registro=datetime.now(),
        comuna_id=comuna_id
    )

    print("Intentando crear voluntario:", nombre)

    session.add(nuevo_voluntario)
    session.commit()

    print("Voluntario creado con ID:", nuevo_voluntario.id)

    voluntario_id = nuevo_voluntario.id

    session.close()

    return voluntario_id


def get_aves():
    session = SessionLocal()
    aves = session.query(Ave).all()
    session.close()
    return aves

def get_voluntario_by_email(email):
    session = SessionLocal()

    voluntario = (
        session.query(Voluntario)
        .filter_by(email=email)
        .first()
    )

    session.close()

    return voluntario


def create_avistamiento(voluntario_id, ave_id, comuna_id, fecha_hora, lugar, descripcion):
    session = SessionLocal()

    nuevo = Avistamiento(
        voluntario_id=voluntario_id,
        ave_id=ave_id,
        comuna_id = comuna_id,
        fecha_hora=fecha_hora,
        lugar=lugar.strip(),
        descripcion=descripcion.strip()
    )

    session.add(nuevo)
    session.commit()

    avistamiento_id = nuevo.id

    session.close()

    return avistamiento_id

def get_ave_by_id(ave_id):
    session = SessionLocal()

    ave = (
        session.query(Ave)
        .filter_by(id=ave_id)
        .first()
    )

    session.close()
    return ave


def get_avistamientos():
    session = SessionLocal()

    avistamientos = (
        session.query(Avistamiento)
        .options(
            joinedload(Avistamiento.ave),
            joinedload(Avistamiento.voluntario),
            joinedload(Avistamiento.comuna).joinedload(Comuna.region),
            selectinload(Avistamiento.registros)
        )
        .order_by(Avistamiento.fecha_hora.desc())
        .all()
    )

    session.expunge_all()
    session.close()

    return avistamientos


def get_avistamiento_by_id(avistamiento_id):
    session = SessionLocal()

    avistamiento = (
        session.query(Avistamiento)
        .options(
            joinedload(Avistamiento.ave),
            joinedload(Avistamiento.voluntario),
            joinedload(Avistamiento.comuna).joinedload(Comuna.region),
            selectinload(Avistamiento.registros)
        )
        .filter_by(id=avistamiento_id)
        .first()
    )

    if avistamiento is not None:
        session.expunge_all()

    session.close()

    return avistamiento

def create_registro(
    ruta_archivo,
    nombre_archivo,
    avistamiento_id
):
    session = SessionLocal()

    nuevo = Registro(
        ruta_archivo=ruta_archivo,
        nombre_archivo=nombre_archivo,
        avistamiento_id=avistamiento_id
    )

    session.add(nuevo)
    session.commit()
    session.close()


def get_ultimos_avistamientos():
    session = SessionLocal()

    avistamientos = (
        session.query(Avistamiento)
        .options(
            joinedload(Avistamiento.ave),
            joinedload(Avistamiento.comuna).joinedload(Comuna.region),
            selectinload(Avistamiento.registros)
        )
        .order_by(Avistamiento.id.desc())
        .limit(2)
        .all()
    )

    session.expunge_all()
    session.close()

    return avistamientos