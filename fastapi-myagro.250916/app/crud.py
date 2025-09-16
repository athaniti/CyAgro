from sqlalchemy.orm import Session
from . import models, schemas

# Generic
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
