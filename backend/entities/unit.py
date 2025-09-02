from pydantic import BaseModel

class Unit(BaseModel):
    id: int
    name: str
    points: int

    def __repr__(self):
        return f"Unit(id={self.id}, name='{self.name}', points={self.points})"
