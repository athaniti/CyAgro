from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from passlib.context import CryptContext
from . import models, schemas
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Generic CRUD Operations
def get_all(db: Session, model):
    return db.query(model).all()

def get_by_id(db: Session, model, id: int):
    return db.query(model).filter(model.id == id).first()

def create_entry(db: Session, model, schema):
    db_obj = model(**schema.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_entry(db: Session, db_obj, schema):
    for key, value in schema.dict(exclude_unset=True).items():
        setattr(db_obj, key, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def delete_entry(db: Session, db_obj):
    db.delete(db_obj)
    db.commit()


# ================== USER CRUD OPERATIONS ==================

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        password_hash=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        id_number=user.id_number,
        address=user.address,
        city=user.city,
        postal_code=user.postal_code,
        role=user.role,
        has_profile=user.has_profile
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not pwd_context.verify(password, user.password_hash):
        return False
    return user

def update_user_profile(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = get_by_id(db, models.User, user_id)
    if not db_user:
        return None
    
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user


# ================== PLOT CRUD OPERATIONS ==================

def get_plots_by_user(db: Session, user_id: int):
    return db.query(models.Plot).filter(models.Plot.owner_id == user_id).all()

def create_plot(db: Session, plot: schemas.PlotCreate, owner_id: int):
    db_plot = models.Plot(**plot.dict(), owner_id=owner_id)
    db.add(db_plot)
    db.commit()
    db.refresh(db_plot)
    return db_plot

def get_plots_by_community(db: Session, community_id: int):
    return db.query(models.Plot).filter(models.Plot.community_id == community_id).all()


# ================== AGRICULTURAL PLOT CRUD OPERATIONS ==================

def get_agricultural_plots_by_plot(db: Session, plot_id: int):
    return db.query(models.AgriculturalPlot).filter(models.AgriculturalPlot.plot_id == plot_id).all()

def get_agricultural_plots_by_user(db: Session, user_id: int):
    return db.query(models.AgriculturalPlot).join(models.Plot).filter(models.Plot.owner_id == user_id).all()

def create_agricultural_plot(db: Session, ag_plot: schemas.AgriculturalPlotCreate):
    db_ag_plot = models.AgriculturalPlot(**ag_plot.dict())
    db.add(db_ag_plot)
    db.commit()
    db.refresh(db_ag_plot)
    return db_ag_plot


# ================== CULTIVATION DECLARATION CRUD OPERATIONS ==================

def get_declarations_by_user(db: Session, user_id: int):
    return db.query(models.CultivationDeclaration).filter(models.CultivationDeclaration.user_id == user_id).all()

def create_cultivation_declaration(db: Session, declaration: schemas.CultivationDeclarationCreate, user_id: int):
    db_declaration = models.CultivationDeclaration(**declaration.dict(), user_id=user_id)
    db.add(db_declaration)
    db.commit()
    db.refresh(db_declaration)
    return db_declaration

def get_declarations_by_status(db: Session, status: str):
    return db.query(models.CultivationDeclaration).filter(models.CultivationDeclaration.status == status).all()


# ================== DAMAGE DECLARATION CRUD OPERATIONS ==================

def get_damage_declarations_by_user(db: Session, user_id: int):
    return db.query(models.DamageDeclaration).filter(models.DamageDeclaration.user_id == user_id).all()

def create_damage_declaration(db: Session, declaration: schemas.DamageDeclarationCreate, user_id: int):
    db_declaration = models.DamageDeclaration(**declaration.dict(), user_id=user_id)
    db.add(db_declaration)
    db.commit()
    db.refresh(db_declaration)
    return db_declaration

def get_damage_declarations_by_status(db: Session, status: str):
    return db.query(models.DamageDeclaration).filter(models.DamageDeclaration.status == status).all()

def assign_inspector_to_damage(db: Session, declaration_id: int, inspector_id: int):
    db_declaration = get_by_id(db, models.DamageDeclaration, declaration_id)
    if db_declaration:
        db_declaration.inspector_id = inspector_id
        db_declaration.status = "assigned"
        db.commit()
        db.refresh(db_declaration)
    return db_declaration


# ================== GEOGRAPHIC CRUD OPERATIONS ==================

def get_provinces_by_region(db: Session, region_id: int):
    return db.query(models.Province).filter(models.Province.region_id == region_id).all()

def get_communities_by_province(db: Session, province_id: int):
    return db.query(models.Community).filter(models.Community.province_id == province_id).all()


# ================== CULTIVATION CRUD OPERATIONS ==================

def get_cultivations_by_group(db: Session, group_id: int):
    return db.query(models.Cultivation).filter(models.Cultivation.group_id == group_id).all()

def get_varieties_by_cultivation(db: Session, cultivation_id: int):
    return db.query(models.Variety).filter(models.Variety.cultivation_id == cultivation_id).all()


# ================== DOCUMENT CRUD OPERATIONS ==================

def create_document(db: Session, document: schemas.DocumentCreate):
    db_document = models.Document(**document.dict())
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def get_documents_by_cultivation_declaration(db: Session, declaration_id: int):
    return db.query(models.Document).filter(models.Document.cultivation_declaration_id == declaration_id).all()

def get_documents_by_damage_declaration(db: Session, declaration_id: int):
    return db.query(models.Document).filter(models.Document.damage_declaration_id == declaration_id).all()
