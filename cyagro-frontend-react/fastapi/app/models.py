from sqlalchemy import Column, Integer, String, Date, Text, Enum, ForeignKey, DECIMAL, DateTime, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
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


# ================== NEW MODELS FOR EXTENDED FUNCTIONALITY ==================

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(20))
    id_number = Column(String(20), unique=True)
    address = Column(Text)
    city = Column(String(100))
    postal_code = Column(String(10))
    is_active = Column(Boolean, default=True)
    has_profile = Column(Boolean, default=False)
    role = Column(Enum("farmer", "inspector", "admin"), default="farmer")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    plots = relationship("Plot", back_populates="owner")
    cultivation_declarations = relationship("CultivationDeclaration", back_populates="user")
    damage_declarations = relationship("DamageDeclaration", back_populates="user")


class Region(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(10), unique=True, nullable=False)

    # Relationships
    provinces = relationship("Province", back_populates="region")


class Province(Base):
    __tablename__ = "provinces"
    id = Column(Integer, primary_key=True, index=True)
    region_id = Column(Integer, ForeignKey("regions.id"), nullable=False)
    name = Column(String(100), nullable=False)
    code = Column(String(10), nullable=False)

    # Relationships
    region = relationship("Region", back_populates="provinces")
    communities = relationship("Community", back_populates="province")


class Community(Base):
    __tablename__ = "communities"
    id = Column(Integer, primary_key=True, index=True)
    province_id = Column(Integer, ForeignKey("provinces.id"), nullable=False)
    name = Column(String(100), nullable=False)
    code = Column(String(10), nullable=False)

    # Relationships
    province = relationship("Province", back_populates="communities")
    plots = relationship("Plot", back_populates="community")


class Plot(Base):
    __tablename__ = "plots"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    community_id = Column(Integer, ForeignKey("communities.id"), nullable=False)
    plot_number = Column(String(50), nullable=False)
    area_in_sqm = Column(Float, nullable=False)
    location_description = Column(Text)
    coordinates_lat = Column(Float)
    coordinates_lng = Column(Float)
    soil_type = Column(String(100))
    irrigation_type = Column(Enum("drip", "sprinkler", "flood", "none"), default="none")
    ownership_type = Column(Enum("owned", "rented", "managed"), default="owned")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="plots")
    community = relationship("Community", back_populates="plots")
    agricultural_plots = relationship("AgriculturalPlot", back_populates="plot")


class AgriculturalPlot(Base):
    __tablename__ = "agricultural_plots"
    id = Column(Integer, primary_key=True, index=True)
    plot_id = Column(Integer, ForeignKey("plots.id"), nullable=False)
    cultivation_id = Column(Integer, ForeignKey("cultivations.id"), nullable=False)
    variety_id = Column(Integer, ForeignKey("varieties.id"))
    area_in_sqm = Column(Float, nullable=False)
    planting_date = Column(Date)
    expected_harvest_date = Column(Date)
    irrigation_system = Column(String(100))
    notes = Column(Text)
    status = Column(Enum("planned", "planted", "growing", "harvested", "abandoned"), default="planned")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    plot = relationship("Plot", back_populates="agricultural_plots")
    cultivation = relationship("Cultivation")
    variety = relationship("Variety")
    cultivation_declarations = relationship("CultivationDeclaration", back_populates="agricultural_plot")
    damage_declarations = relationship("DamageDeclaration", back_populates="agricultural_plot")


class CultivationDeclaration(Base):
    __tablename__ = "cultivation_declarations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    agricultural_plot_id = Column(Integer, ForeignKey("agricultural_plots.id"), nullable=False)
    cultivation_year = Column(Integer, nullable=False)
    declared_area = Column(Float, nullable=False)
    coverage_type = Column(Enum("full", "basic"), default="full")
    estimated_production = Column(Float)
    cultivation_practices = Column(Text)
    status = Column(Enum("draft", "submitted", "under_review", "approved", "rejected"), default="draft")
    submission_date = Column(DateTime)
    review_date = Column(DateTime)
    reviewer_notes = Column(Text)
    fee_amount = Column(DECIMAL(10, 2))
    payment_status = Column(Enum("pending", "paid", "overdue"), default="pending")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="cultivation_declarations")
    agricultural_plot = relationship("AgriculturalPlot", back_populates="cultivation_declarations")
    documents = relationship("Document", back_populates="cultivation_declaration")


class DamageDeclaration(Base):
    __tablename__ = "damage_declarations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    agricultural_plot_id = Column(Integer, ForeignKey("agricultural_plots.id"), nullable=False)
    harmful_cause_id = Column(Integer, ForeignKey("harmful_causes.id"), nullable=False)
    damage_date = Column(Date, nullable=False)
    reported_date = Column(DateTime, server_default=func.now())
    affected_area = Column(Float, nullable=False)
    damage_percentage = Column(Float)  # 0-100
    estimated_loss = Column(DECIMAL(10, 2))
    description = Column(Text, nullable=False)
    inspector_id = Column(Integer, ForeignKey("users.id"))
    inspection_date = Column(DateTime)
    inspector_notes = Column(Text)
    verified_damage_percentage = Column(Float)
    verified_loss = Column(DECIMAL(10, 2))
    status = Column(Enum("reported", "assigned", "inspected", "approved", "rejected"), default="reported")
    compensation_amount = Column(DECIMAL(10, 2))
    payment_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="damage_declarations")
    agricultural_plot = relationship("AgriculturalPlot", back_populates="damage_declarations")
    harmful_cause = relationship("HarmfulCause")
    inspector = relationship("User", foreign_keys=[inspector_id])
    documents = relationship("Document", back_populates="damage_declaration")


class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    cultivation_declaration_id = Column(Integer, ForeignKey("cultivation_declarations.id"))
    damage_declaration_id = Column(Integer, ForeignKey("damage_declarations.id"))
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer)
    mime_type = Column(String(100))
    document_type = Column(Enum("photo", "certificate", "contract", "other"), default="other")
    upload_date = Column(DateTime, server_default=func.now())

    # Relationships
    cultivation_declaration = relationship("CultivationDeclaration", back_populates="documents")
    damage_declaration = relationship("DamageDeclaration", back_populates="documents")
