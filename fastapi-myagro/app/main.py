from fastapi import FastAPI, Security, Depends, HTTPException, status
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import database, models, schemas, crud
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from .auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from jose import JWTError, jwt
from .auth import (
    authenticate_user, create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM
)
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

API_KEY = "AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7a"  # 🔑 βάλε δικό σου μυστικό κλειδί
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key: str = Security(api_key_header)):
    if api_key == API_KEY:
        return api_key
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="CyAgro Demo API")
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "CyAgro API is running!"}

# ---------- Departments ----------
@app.get("/departments", response_model=list[schemas.DepartmentRead])
def list_departments(db: Session = Depends(get_db)):
    return crud.get_all(db, models.Department)

@app.get("/departments/{dep_id}", response_model=schemas.DepartmentRead)
def get_department(dep_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Department, dep_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Department not found")
    return db_obj

@app.post("/departments", response_model=schemas.DepartmentRead)
def create_department(dep: schemas.DepartmentCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.Department, dep)

@app.put("/departments/{dep_id}", response_model=schemas.DepartmentRead)
def update_department(dep_id: int, dep: schemas.DepartmentCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Department, dep_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Department not found")
    return crud.update_entry(db, db_obj, dep)

@app.delete("/departments/{dep_id}")
def delete_department(dep_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Department, dep_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Department not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Department deleted"}


# ---------- Land Parcels ----------
@app.get("/land_parcels", response_model=list[schemas.LandParcelRead])
def list_land_parcels(db: Session = Depends(get_db)):
    return crud.get_all(db, models.LandParcel)

@app.get("/land_parcels/{lp_id}", response_model=schemas.LandParcelRead)
def get_land_parcel(lp_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.LandParcel, lp_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Land Parcel not found")
    return db_obj

@app.post("/land_parcels", response_model=schemas.LandParcelRead)
def create_land_parcel(lp: schemas.LandParcelCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.LandParcel, lp)

@app.put("/land_parcels/{lp_id}", response_model=schemas.LandParcelRead)
def update_land_parcel(lp_id: int, lp: schemas.LandParcelCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.LandParcel, lp_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Land Parcel not found")
    return crud.update_entry(db, db_obj, lp)

@app.delete("/land_parcels/{lp_id}")
def delete_land_parcel(lp_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.LandParcel, lp_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Land Parcel not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Land Parcel deleted"}


# ---------- Cultivation Groups ----------
@app.get("/groups", response_model=list[schemas.CultivationGroupRead])
def list_groups(db: Session = Depends(get_db)):
    return crud.get_all(db, models.CultivationGroup)

@app.get("/groups/{group_id}", response_model=schemas.CultivationGroupRead)
def get_group(group_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.CultivationGroup, group_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_obj

@app.post("/groups", response_model=schemas.CultivationGroupRead)
def create_group(group: schemas.CultivationGroupCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.CultivationGroup, group)

@app.put("/groups/{group_id}", response_model=schemas.CultivationGroupRead)
def update_group(group_id: int, group: schemas.CultivationGroupCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.CultivationGroup, group_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Group not found")
    return crud.update_entry(db, db_obj, group)

@app.delete("/groups/{group_id}")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.CultivationGroup, group_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Group not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Group deleted"}


# ---------- Cultivations ----------
@app.get("/cultivations", response_model=list[schemas.CultivationRead])
def list_cultivations(db: Session = Depends(get_db)):
    return crud.get_all(db, models.Cultivation)

@app.get("/cultivations/{cult_id}", response_model=schemas.CultivationRead)
def get_cultivation(cult_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Cultivation, cult_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cultivation not found")
    return db_obj

@app.post("/cultivations", response_model=schemas.CultivationRead)
def create_cultivation(cult: schemas.CultivationCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.Cultivation, cult)

@app.put("/cultivations/{cult_id}", response_model=schemas.CultivationRead)
def update_cultivation(cult_id: int, cult: schemas.CultivationCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Cultivation, cult_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cultivation not found")
    return crud.update_entry(db, db_obj, cult)

@app.delete("/cultivations/{cult_id}")
def delete_cultivation(cult_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Cultivation, cult_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Cultivation not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Cultivation deleted"}


# ---------- Varieties ----------
@app.get("/varieties", response_model=list[schemas.VarietyRead])
def list_varieties(db: Session = Depends(get_db)):
    return crud.get_all(db, models.Variety)

@app.get("/varieties/{var_id}", response_model=schemas.VarietyRead)
def get_variety(var_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Variety, var_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Variety not found")
    return db_obj

@app.post("/varieties", response_model=schemas.VarietyRead)
def create_variety(var: schemas.VarietyCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.Variety, var)

@app.put("/varieties/{var_id}", response_model=schemas.VarietyRead)
def update_variety(var_id: int, var: schemas.VarietyCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Variety, var_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Variety not found")
    return crud.update_entry(db, db_obj, var)

@app.delete("/varieties/{var_id}")
def delete_variety(var_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.Variety, var_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Variety not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Variety deleted"}


# ---------- Harmful Causes ----------
@app.get("/harmful_causes", response_model=list[schemas.HarmfulCauseRead])
def list_harmful_causes(db: Session = Depends(get_db)):
    return crud.get_all(db, models.HarmfulCause)

@app.get("/harmful_causes/{hc_id}", response_model=schemas.HarmfulCauseRead)
def get_harmful_cause(hc_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.HarmfulCause, hc_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Harmful Cause not found")
    return db_obj

@app.post("/harmful_causes", response_model=schemas.HarmfulCauseRead)
def create_harmful_cause(hc: schemas.HarmfulCauseCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, models.HarmfulCause, hc)

@app.put("/harmful_causes/{hc_id}", response_model=schemas.HarmfulCauseRead)
def update_harmful_cause(hc_id: int, hc: schemas.HarmfulCauseCreate, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.HarmfulCause, hc_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Harmful Cause not found")
    return crud.update_entry(db, db_obj, hc)

@app.delete("/harmful_causes/{hc_id}")
def delete_harmful_cause(hc_id: int, db: Session = Depends(get_db)):
    db_obj = crud.get_by_id(db, models.HarmfulCause, hc_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Harmful Cause not found")
    crud.delete_entry(db, db_obj)
    return {"message": "Harmful Cause deleted"}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires
    )
    return {"access_token": token, "token_type": "bearer"}
    
@app.get("/secure-data")
def secure_data(current_user: str = Depends(get_current_user)):
    return {"msg": f"Hello {current_user}, this is protected data"}