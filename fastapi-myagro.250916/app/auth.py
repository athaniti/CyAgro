from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "supersecret"        # ⚠️ βάλε πραγματικό μυστικό σε production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# mock users (με hashed password)
fake_users_db = {
    "admin": {
        "username": "admin",
        "full_name": "Admin User",
        "hashed_password": pwd_context.hash("1234"),
    },
    "demo": {
        "username": "demo",
        "full_name": "Demo User",
        "hashed_password": pwd_context.hash("demo"),
    }
}

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user: return None
    if not verify_password(password, user["hashed_password"]): return None
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
