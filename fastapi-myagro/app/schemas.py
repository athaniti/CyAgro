from pydantic import BaseModel
from typing import Optional
from datetime import date

# -------- Departments --------
class DepartmentBase(BaseModel):
    name: str
    code: str

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentRead(DepartmentBase):
    id: int
    class Config:
        orm_mode = True


# -------- Land Parcels --------
class LandParcelBase(BaseModel):
    department_id: Optional[int]
    region: Optional[str]
    community: Optional[str]
    block: Optional[str]
    parcel_number: Optional[str]
    description: Optional[str]
    ownership: str
    contract_start: Optional[date]
    contract_end: Optional[date]
    status: Optional[str]

class LandParcelCreate(LandParcelBase):
    pass

class LandParcelRead(LandParcelBase):
    id: int
    class Config:
        orm_mode = True


# -------- Cultivation Groups --------
class CultivationGroupBase(BaseModel):
    name: str
    code: str
    accounting_code: Optional[str]
    koap_code: Optional[str]

class CultivationGroupCreate(CultivationGroupBase):
    pass

class CultivationGroupRead(CultivationGroupBase):
    id: int
    class Config:
        orm_mode = True


# -------- Cultivations --------
class CultivationBase(BaseModel):
    group_id: int
    name: str
    code: str
    season_start: Optional[date]
    season_end: Optional[date]
    type: Optional[str]
    coverage: Optional[str]
    full_price: Optional[float]
    basic_price: Optional[float]
    active_from: Optional[date]
    active_to: Optional[date]

class CultivationCreate(CultivationBase):
    pass

class CultivationRead(CultivationBase):
    id: int
    class Config:
        orm_mode = True


# -------- Varieties --------
class VarietyBase(BaseModel):
    cultivation_id: int
    name: str
    unit: str

class VarietyCreate(VarietyBase):
    pass

class VarietyRead(VarietyBase):
    id: int
    class Config:
        orm_mode = True


# -------- Harmful Causes --------
class HarmfulCauseBase(BaseModel):
    name: str

class HarmfulCauseCreate(HarmfulCauseBase):
    pass

class HarmfulCauseRead(HarmfulCauseBase):
    id: int
    class Config:
        orm_mode = True
