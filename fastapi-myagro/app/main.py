from fastapi import FastAPI, Security, Depends, HTTPException, status
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import database, models, schemas, crud
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from .database import get_db
from .auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from jose import JWTError, jwt
from .auth import (
    authenticate_user, create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM
)
from fastapi.security import OAuth2PasswordBearer
from typing import List
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

API_KEY = settings.api_key
API_KEY_NAME = settings.api_key_name
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key: str = Security(api_key_header)):
    if api_key == API_KEY:
        return api_key
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Get user from database instead of just returning username
        user = crud.get_user_by_username(db, username)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="CyAgro Demo API")
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, settings.angular_url, settings.angular_url2],
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
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return {
        "access_token": token, 
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "has_profile": user.has_profile,
            "role": user.role
        }
    }
    
@app.get("/secure-data")
def secure_data(current_user = Depends(get_current_user)):
    if isinstance(current_user, str):
        # Old auth system
        return {"msg": f"Hello {current_user}, this is protected data"}
    else:
        # New auth system
        return {"msg": f"Hello {current_user.first_name} {current_user.last_name}, this is protected data"}


# ================== NEW API ENDPOINTS ==================

# ---------- User Management ----------
@app.post("/users/register", response_model=schemas.UserRead)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    return crud.create_user(db=db, user=user)

@app.get("/users/me", response_model=schemas.UserRead)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.put("/users/me", response_model=schemas.UserRead)
def update_users_me(user_update: schemas.UserUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.update_user_profile(db, current_user.id, user_update)

@app.get("/users", response_model=List[schemas.UserRead])
def list_users(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.get_all(db, models.User)


# ---------- Geographic Data ----------
@app.get("/regions", response_model=List[schemas.RegionRead])
def list_regions(db: Session = Depends(get_db)):
    return crud.get_all(db, models.Region)

@app.get("/regions/{region_id}/provinces", response_model=List[schemas.ProvinceRead])
def list_provinces_by_region(region_id: int, db: Session = Depends(get_db)):
    return crud.get_provinces_by_region(db, region_id)

@app.get("/provinces/{province_id}/communities", response_model=List[schemas.CommunityRead])
def list_communities_by_province(province_id: int, db: Session = Depends(get_db)):
    return crud.get_communities_by_province(db, province_id)


# ---------- Plot Management ----------
@app.get("/plots", response_model=List[schemas.PlotRead])
def list_my_plots(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_plots_by_user(db, current_user.id)

@app.post("/plots", response_model=schemas.PlotRead)
def create_plot(plot: schemas.PlotCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_plot(db, plot, current_user.id)

@app.get("/plots/{plot_id}", response_model=schemas.PlotRead)
def get_plot(plot_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_plot = crud.get_by_id(db, models.Plot, plot_id)
    if not db_plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    if db_plot.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return db_plot

@app.put("/plots/{plot_id}", response_model=schemas.PlotRead)
def update_plot(plot_id: int, plot_update: schemas.PlotUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_plot = crud.get_by_id(db, models.Plot, plot_id)
    if not db_plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    if db_plot.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.update_entry(db, db_plot, plot_update)

@app.delete("/plots/{plot_id}")
def delete_plot(plot_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_plot = crud.get_by_id(db, models.Plot, plot_id)
    if not db_plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    if db_plot.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    crud.delete_entry(db, db_plot)
    return {"message": "Plot deleted"}


# ---------- Agricultural Plot Management ----------
@app.get("/agricultural-plots", response_model=List[schemas.AgriculturalPlotRead])
def list_my_agricultural_plots(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_agricultural_plots_by_user(db, current_user.id)

@app.post("/agricultural-plots", response_model=schemas.AgriculturalPlotRead)
def create_agricultural_plot(ag_plot: schemas.AgriculturalPlotCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Verify user owns the plot
    db_plot = crud.get_by_id(db, models.Plot, ag_plot.plot_id)
    if not db_plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    if db_plot.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return crud.create_agricultural_plot(db, ag_plot)

@app.get("/plots/{plot_id}/agricultural-plots", response_model=List[schemas.AgriculturalPlotRead])
def list_agricultural_plots_by_plot(plot_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Verify user owns the plot
    db_plot = crud.get_by_id(db, models.Plot, plot_id)
    if not db_plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    if db_plot.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return crud.get_agricultural_plots_by_plot(db, plot_id)


# ---------- Cultivation Data with Group Filter ----------
@app.get("/cultivation-groups/{group_id}/cultivations", response_model=List[schemas.CultivationRead])
def list_cultivations_by_group(group_id: int, db: Session = Depends(get_db)):
    return crud.get_cultivations_by_group(db, group_id)

@app.get("/cultivations/{cultivation_id}/varieties", response_model=List[schemas.VarietyRead])
def list_varieties_by_cultivation(cultivation_id: int, db: Session = Depends(get_db)):
    return crud.get_varieties_by_cultivation(db, cultivation_id)


# ---------- Cultivation Declarations ----------
@app.get("/cultivation-declarations", response_model=List[schemas.CultivationDeclarationRead])
def list_my_cultivation_declarations(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_declarations_by_user(db, current_user.id)

@app.post("/cultivation-declarations", response_model=schemas.CultivationDeclarationRead)
def create_cultivation_declaration(declaration: schemas.CultivationDeclarationCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_cultivation_declaration(db, declaration, current_user.id)

@app.get("/cultivation-declarations/{declaration_id}", response_model=schemas.CultivationDeclarationRead)
def get_cultivation_declaration(declaration_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_declaration = crud.get_by_id(db, models.CultivationDeclaration, declaration_id)
    if not db_declaration:
        raise HTTPException(status_code=404, detail="Declaration not found")
    if db_declaration.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return db_declaration

@app.put("/cultivation-declarations/{declaration_id}", response_model=schemas.CultivationDeclarationRead)
def update_cultivation_declaration(declaration_id: int, declaration_update: schemas.CultivationDeclarationUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_declaration = crud.get_by_id(db, models.CultivationDeclaration, declaration_id)
    if not db_declaration:
        raise HTTPException(status_code=404, detail="Declaration not found")
    if db_declaration.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.update_entry(db, db_declaration, declaration_update)


# ---------- Damage Declarations ----------
@app.get("/damage-declarations", response_model=List[schemas.DamageDeclarationRead])
def list_my_damage_declarations(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_damage_declarations_by_user(db, current_user.id)

@app.post("/damage-declarations", response_model=schemas.DamageDeclarationRead)
def create_damage_declaration(declaration: schemas.DamageDeclarationCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_damage_declaration(db, declaration, current_user.id)

@app.get("/damage-declarations/{declaration_id}", response_model=schemas.DamageDeclarationRead)
def get_damage_declaration(declaration_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_declaration = crud.get_by_id(db, models.DamageDeclaration, declaration_id)
    if not db_declaration:
        raise HTTPException(status_code=404, detail="Declaration not found")
    if db_declaration.user_id != current_user.id and current_user.role not in ["admin", "inspector"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return db_declaration

@app.put("/damage-declarations/{declaration_id}", response_model=schemas.DamageDeclarationRead)
def update_damage_declaration(declaration_id: int, declaration_update: schemas.DamageDeclarationUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_declaration = crud.get_by_id(db, models.DamageDeclaration, declaration_id)
    if not db_declaration:
        raise HTTPException(status_code=404, detail="Declaration not found")
    if db_declaration.user_id != current_user.id and current_user.role not in ["admin", "inspector"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.update_entry(db, db_declaration, declaration_update)


# ---------- Admin Endpoints ----------
@app.get("/admin/cultivation-declarations", response_model=List[schemas.CultivationDeclarationRead])
def list_all_cultivation_declarations(status: str = None, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if status:
        return crud.get_declarations_by_status(db, status)
    return crud.get_all(db, models.CultivationDeclaration)

@app.get("/admin/damage-declarations", response_model=List[schemas.DamageDeclarationRead])
def list_all_damage_declarations(status: str = None, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role not in ["admin", "inspector"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if status:
        return crud.get_damage_declarations_by_status(db, status)
    return crud.get_all(db, models.DamageDeclaration)

@app.put("/admin/damage-declarations/{declaration_id}/assign-inspector")
def assign_inspector(declaration_id: int, inspector_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    result = crud.assign_inspector_to_damage(db, declaration_id, inspector_id)
    if not result:
        raise HTTPException(status_code=404, detail="Declaration not found")
    return {"message": "Inspector assigned successfully"}