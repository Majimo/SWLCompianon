from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated

from .entities.unit import Unit
from .entities.user import User, UserInDB, get_user


fake_users_db = {
    "pierre": {
        "username": "pierre",
        "full_name": "Pierre Majimo",
        "email": "pierre@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "toto": {
        "username": "toto",
        "full_name": "Toto Test",
        "email": "toto@test.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

units = [
    Unit(id=1, name="Unit 1", points=100),
    Unit(id=2, name="Unit 2", points=200),
    Unit(id=3, name="Unit 3", points=300),
]

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Autorisation CORS pour le front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


### Authentification ###

def fake_decode_token(token):
    user = get_user(fake_users_db, token)
    return user

def fake_hash_password(password: str):
    return "fakehashed" + password

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


### API Endpoints ###

@app.get("/api")
def api_root():
    return {"message": "Hello World"}

@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
# **user_dict équivalent à :
# UserInDB(
#     username = user_dict["username"],
#     email = user_dict["email"],
#     full_name = user_dict["full_name"],
#     disabled = user_dict["disabled"],
#     hashed_password = user_dict["hashed_password"],
# )
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user

@app.get("/api/units")
def get_units(current_user: Annotated[User, Depends(get_current_active_user)]) -> list[Unit]:
    return units

@app.post("/api/units")
def create_unit(unit: Unit, current_user: Annotated[User, Depends(get_current_active_user)]) -> Unit:
    units.append(unit)
    return unit