from sqlalchemy import Column, Integer, String, Date, Text, Enum, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from .database import Base

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, nullable=False)

    parcels = relationship("LandParcel", back_populates="department")


class LandParcel(Base):
    __tablename__ = "land_parcels"
    id = Column(Integer, primary_key=True, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    region = Column(String(255))
    community = Column(String(255))
    block = Column(String(50))
    parcel_number = Column(String(50))
    description = Column(Text)
    ownership = Column(Enum("ownership", "management"))
    contract_start = Column(Date)
    contract_end = Column(Date)
    status = Column(Enum("inactive", "active", "pending"), default="pending")

    department = relationship("Department", back_populates="parcels")


class CultivationGroup(Base):
    __tablename__ = "cultivation_groups"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    accounting_code = Column(String(50))
    koap_code = Column(String(50))

    cultivations = relationship("Cultivation", back_populates="group")


class Cultivation(Base):
    __tablename__ = "cultivations"
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("cultivation_groups.id"))
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    season_start = Column(Date)
    season_end = Column(Date)
    type = Column(Enum("annual", "perennial"))
    coverage = Column(Enum("full", "basic"))
    full_price = Column(DECIMAL(10, 2))
    basic_price = Column(DECIMAL(10, 2))
    active_from = Column(Date)
    active_to = Column(Date)

    group = relationship("CultivationGroup", back_populates="cultivations")
    varieties = relationship("Variety", back_populates="cultivation")


class Variety(Base):
    __tablename__ = "varieties"
    id = Column(Integer, primary_key=True, index=True)
    cultivation_id = Column(Integer, ForeignKey("cultivations.id"))
    name = Column(String(255), nullable=False)
    unit = Column(Enum("trees", "area"))

    cultivation = relationship("Cultivation", back_populates="varieties")


class HarmfulCause(Base):
    __tablename__ = "harmful_causes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
