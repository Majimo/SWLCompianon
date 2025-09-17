from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from backend.domain.models import User, UserInDB
from backend.core.auth_service import fake_users_db, fake_hash_password
from backend.api.dependencies import get_current_active_user

router = APIRouter(tags=["Authentication"])

@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()])-> dict:
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


@router.get("/users/me", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user
