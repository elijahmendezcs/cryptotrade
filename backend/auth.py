# auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError
from datetime import datetime, timedelta
from db import register_user, login_user, get_user_by_username
from pydantic import BaseModel

auth_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Config (in production, load SECRET_KEY from environment)
SECRET_KEY = "your_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Token response schema
class Token(BaseModel):
    access_token: str
    token_type: str

# Create a JWT access token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Decode and verify token, return user
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = get_user_by_username(username)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token decode error")

# ✅ REGISTER
@auth_router.post("/register")
def register(username: str, password: str):
    result = register_user(username, password)
    if "✅" in result:
        return {"message": result}
    raise HTTPException(status_code=400, detail=result)

# ✅ LOGIN (returns JWT)
@auth_router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    success = login_user(form_data.username, form_data.password)
    if "✅" not in success:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ✅ PROTECTED ROUTE
@auth_router.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": f"Hello {user['username']}, you're authenticated!"}
