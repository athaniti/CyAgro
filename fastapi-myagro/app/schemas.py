from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date, datetime
from decimal import Decimal

# -------- Departments --------
class DepartmentBase(BaseModel):
    name: str
    code: str

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentRead(DepartmentBase):
    id: int
    class Config:
        from_attributes = True


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
        from_attributes = True


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
        from_attributes = True


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
        from_attributes = True


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
        from_attributes = True


# -------- Harmful Causes --------
class HarmfulCauseBase(BaseModel):
    name: str

class HarmfulCauseCreate(HarmfulCauseBase):
    pass

class HarmfulCauseRead(HarmfulCauseBase):
    id: int
    class Config:
        from_attributes = True


# ================== NEW SCHEMAS FOR EXTENDED FUNCTIONALITY ==================

# -------- Users --------
class UserBase(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    id_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    is_active: bool = True
    has_profile: bool = False
    role: str = "farmer"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    id_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    has_profile: Optional[bool] = None

class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str


# -------- Regions --------
class RegionBase(BaseModel):
    name: str
    code: str

class RegionCreate(RegionBase):
    pass

class RegionRead(RegionBase):
    id: int
    class Config:
        from_attributes = True


# -------- Provinces --------
class ProvinceBase(BaseModel):
    region_id: int
    name: str
    code: str

class ProvinceCreate(ProvinceBase):
    pass

class ProvinceRead(ProvinceBase):
    id: int
    class Config:
        from_attributes = True


# -------- Communities --------
class CommunityBase(BaseModel):
    province_id: int
    name: str
    code: str

class CommunityCreate(CommunityBase):
    pass

class CommunityRead(CommunityBase):
    id: int
    class Config:
        from_attributes = True


# -------- Plots --------
class PlotBase(BaseModel):
    community_id: int
    plot_number: str
    area_in_sqm: float
    location_description: Optional[str] = None
    coordinates_lat: Optional[float] = None
    coordinates_lng: Optional[float] = None
    soil_type: Optional[str] = None
    irrigation_type: str = "none"
    ownership_type: str = "owned"

class PlotCreate(PlotBase):
    pass

class PlotUpdate(BaseModel):
    community_id: Optional[int] = None
    plot_number: Optional[str] = None
    area_in_sqm: Optional[float] = None
    location_description: Optional[str] = None
    coordinates_lat: Optional[float] = None
    coordinates_lng: Optional[float] = None
    soil_type: Optional[str] = None
    irrigation_type: Optional[str] = None
    ownership_type: Optional[str] = None

class PlotRead(PlotBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True


# -------- Agricultural Plots --------
class AgriculturalPlotBase(BaseModel):
    plot_id: int
    cultivation_id: int
    variety_id: Optional[int] = None
    area_in_sqm: float
    planting_date: Optional[date] = None
    expected_harvest_date: Optional[date] = None
    irrigation_system: Optional[str] = None
    notes: Optional[str] = None
    status: str = "planned"

class AgriculturalPlotCreate(AgriculturalPlotBase):
    pass

class AgriculturalPlotUpdate(BaseModel):
    cultivation_id: Optional[int] = None
    variety_id: Optional[int] = None
    area_in_sqm: Optional[float] = None
    planting_date: Optional[date] = None
    expected_harvest_date: Optional[date] = None
    irrigation_system: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None

class AgriculturalPlotRead(AgriculturalPlotBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True


# -------- Cultivation Declarations --------
class CultivationDeclarationBase(BaseModel):
    agricultural_plot_id: int
    cultivation_year: int
    declared_area: float
    coverage_type: str = "full"
    estimated_production: Optional[float] = None
    cultivation_practices: Optional[str] = None

class CultivationDeclarationCreate(CultivationDeclarationBase):
    pass

class CultivationDeclarationUpdate(BaseModel):
    declared_area: Optional[float] = None
    coverage_type: Optional[str] = None
    estimated_production: Optional[float] = None
    cultivation_practices: Optional[str] = None
    status: Optional[str] = None

class CultivationDeclarationRead(CultivationDeclarationBase):
    id: int
    user_id: int
    status: str
    submission_date: Optional[datetime] = None
    review_date: Optional[datetime] = None
    reviewer_notes: Optional[str] = None
    fee_amount: Optional[Decimal] = None
    payment_status: str
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True


# -------- Damage Declarations --------
class DamageDeclarationBase(BaseModel):
    agricultural_plot_id: int
    harmful_cause_id: int
    damage_date: date
    affected_area: float
    damage_percentage: Optional[float] = None
    estimated_loss: Optional[Decimal] = None
    description: str

class DamageDeclarationCreate(DamageDeclarationBase):
    pass

class DamageDeclarationUpdate(BaseModel):
    damage_date: Optional[date] = None
    affected_area: Optional[float] = None
    damage_percentage: Optional[float] = None
    estimated_loss: Optional[Decimal] = None
    description: Optional[str] = None
    inspector_notes: Optional[str] = None
    verified_damage_percentage: Optional[float] = None
    verified_loss: Optional[Decimal] = None
    status: Optional[str] = None
    compensation_amount: Optional[Decimal] = None

class DamageDeclarationRead(DamageDeclarationBase):
    id: int
    user_id: int
    reported_date: datetime
    inspector_id: Optional[int] = None
    inspection_date: Optional[datetime] = None
    inspector_notes: Optional[str] = None
    verified_damage_percentage: Optional[float] = None
    verified_loss: Optional[Decimal] = None
    status: str
    compensation_amount: Optional[Decimal] = None
    payment_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True


# -------- Documents --------
class DocumentBase(BaseModel):
    filename: str
    original_filename: str
    file_path: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    document_type: str = "other"

class DocumentCreate(DocumentBase):
    cultivation_declaration_id: Optional[int] = None
    damage_declaration_id: Optional[int] = None

class DocumentRead(DocumentBase):
    id: int
    cultivation_declaration_id: Optional[int] = None
    damage_declaration_id: Optional[int] = None
    upload_date: datetime
    class Config:
        from_attributes = True


# -------- Response Models --------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
