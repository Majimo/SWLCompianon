from typing import Annotated
from fastapi import APIRouter, Depends

from backend.domain.models import Unit, User
from backend.api.dependencies import get_current_active_user

router = APIRouter(prefix="/api", tags=["Units"])

units = [
    Unit(id=1, name="Unit 1", points=100),
    Unit(id=2, name="Unit 2", points=200),
    Unit(id=3, name="Unit 3", points=300),
]

@router.get("/units")
def get_units(current_user: Annotated[User, Depends(get_current_active_user)]) -> list[Unit]:
    return units

@router.post("/units")
def create_unit(unit: Unit, current_user: Annotated[User, Depends(get_current_active_user)]) -> Unit:
    units.append(unit)
    return unit