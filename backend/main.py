from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from entities.unit import Unit

app = FastAPI()

# Autorisation CORS pour le front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

units = [
        Unit(id=1, name="Unit 1", points=100),
        Unit(id=2, name="Unit 2", points=200),
        Unit(id=3, name="Unit 3", points=300),
    ]

@app.get("/api")
def api_root():
    return {"message": "Hello World"}

@app.get("/api/units")
def get_units() -> list[Unit]:
    return units

@app.post("/api/units")
def create_unit(unit: Unit):
    units.append(unit)
    return unit