import re
from datetime import datetime

def validate_nombre(nombre):
    if nombre is None:
        return False

    nombre = nombre.strip()

    return 3 <= len(nombre) <= 80


def validate_email(email):
    if email is None:
        return False

    patron = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

    return (
        len(email) <= 80
        and re.match(patron, email) is not None
    )


def validate_emails(email, repetir_email):
    return (
        validate_email(email)
        and email == repetir_email
    )


def validate_telefono(telefono):
    if telefono is None:
        return False

    # Permitimos que el usuario escriba espacios o guiones.
    telefono_limpio = telefono.replace(" ", "").replace("-", "")

    return re.match(r"^9[0-9]{8}$", telefono_limpio) is not None


def validate_region(region_id):
    if region_id is None:
        return False

    return str(region_id).isdigit()


def validate_comuna(comuna_id):
    if comuna_id is None:
        return False

    return str(comuna_id).isdigit()


def validate_voluntario(
    nombre,
    email,
    repetir_email,
    telefono,
    region_id,
    comuna_id
):
    return (
        validate_nombre(nombre)
        and validate_emails(email, repetir_email)
        and validate_telefono(telefono)
        and validate_region(region_id)
        and validate_comuna(comuna_id)
    )


def validate_avistamiento(
    ave_id,
    region_id,
    comuna_id,
    fecha_hora,
    lugar
):
    if ave_id is None or not str(ave_id).isdigit():
        return False

    if region_id is None or not str(region_id).isdigit():
        return False

    if comuna_id is None or not str(comuna_id).isdigit():
        return False

    if fecha_hora is None:
        return False

        ahora = datetime.now()

    # No puede estar en el futuro
    if fecha_hora > ahora:
        return False

    # No puede tener más de un año
    try:
        hace_un_ano = ahora.replace(
            year=ahora.year - 1
        )
    except ValueError:
        hace_un_ano = ahora.replace(
            year=ahora.year - 1,
            day=28
        )

    if fecha_hora < hace_un_ano:
        return False

    if lugar is None:
        return False

    lugar = lugar.strip()

    if len(lugar) < 3 or len(lugar) > 200:
        return False

    return True