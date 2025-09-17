from pydantic import BaseModel

class Unit(BaseModel):
    id: int
    name: str
    points: int

    def __repr__(self):
        return f"Unit(id={self.id}, name='{self.name}', points={self.points})"


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str
