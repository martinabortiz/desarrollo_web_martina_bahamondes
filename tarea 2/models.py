from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()


class Region(Base):
    __tablename__ = "region"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")
        # no crea columna nueva sino que relaciona con la tabla comuna, back_populates indica que en la clase Comuna hay un atributo region que hace referencia a esta relación

class Comuna(Base):
    __tablename__ = "comuna"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(
        Integer,
        ForeignKey("region.id"),
        nullable=False
    )

    region = relationship(
        "Region",
        back_populates="comunas"
    )

    voluntarios = relationship(
        "Voluntario",
        back_populates="comuna"
    )

    avistamientos = relationship(
        "Avistamiento",
        back_populates="comuna"
    )

class Voluntario(Base):
    __tablename__ = "voluntario"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(DateTime, nullable=False)
    comuna_id = Column(Integer, ForeignKey("comuna.id"), nullable=False)

    comuna = relationship("Comuna", back_populates="voluntarios")
    avistamientos = relationship("Avistamiento", back_populates="voluntario")


class Ave(Base):
    __tablename__ = "ave"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)

    avistamientos = relationship("Avistamiento", back_populates="ave")


class Avistamiento(Base):
    __tablename__ = "avistamiento"

    id = Column(Integer, primary_key=True, autoincrement=True)
    voluntario_id = Column(
        Integer,
        ForeignKey("voluntario.id"),
        nullable=False
    )
    ave_id = Column(
        Integer,
        ForeignKey("ave.id"),
        nullable=False
    )
    comuna_id = Column(
        Integer,
        ForeignKey("comuna.id"),
        nullable=False
    )
    fecha_hora = Column(DateTime, nullable=False)
    comuna = relationship("Comuna", back_populates="avistamientos")
    lugar = Column(String(200), nullable=False)
    descripcion = Column(Text, nullable=True)

    voluntario = relationship("Voluntario", back_populates="avistamientos")
    ave = relationship("Ave", back_populates="avistamientos")
    registros = relationship("Registro", back_populates="avistamiento")


class Registro(Base):
    __tablename__ = "registro"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(
        Integer,
        ForeignKey("avistamiento.id"),
        nullable=False
    )

    avistamiento = relationship(
        "Avistamiento",
        back_populates="registros"
    )