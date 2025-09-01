from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

units = [1, 2, 3]

@app.get("/api")
def api_root():
    return {"message": "Hello World"}

@app.get("/api/units")
def get_units():
    return units