import os
from functools import lru_cache
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    database_url: str = "mysql+pymysql://ada:kekropia@localhost:3306/cyagro"
    
    # Security
    secret_key: str = "supersecret_change_this_in_production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API
    api_key: str = "AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7a"
    api_key_name: str = "X-API-Key"
    
    # CORS
    frontend_url: str = "http://localhost:3000"
    angular_url: str = "http://localhost:4200"
    angular_url2: str = "http://127.0.0.1:4200"    
    
    # File Upload
    upload_dir: str = "uploads"
    max_file_size: int = 10485760  # 10MB
    
    # Environment
    environment: str = "development"
    debug: bool = True

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()