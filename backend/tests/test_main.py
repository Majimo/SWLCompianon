from fastapi.testclient import TestClient
import sys
import os
import pytest
from main import app, units

# Ajout du répertoire racine du projet au sys.path pour résoudre les imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_before_and_after_tests():
    """Fixture to execute asserts before and after a test is run"""
    # Setup: fill with any logic you want
    
    yield # this is where the testing happens

    # Teardown : fill with any logic you want
    # On remet la liste des unités à son état initial après chaque test
    units.clear()
    units.extend([
        {"id":1, "name":"Unit 1", "points":100},
        {"id":2, "name":"Unit 2", "points":200},
        {"id":3, "name":"Unit 3", "points":300},
    ])


def test_api_root():
    """Teste la route racine de l'API."""
    response = client.get("/api")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_get_units():
    """Teste la récupération de la liste des unités."""
    response = client.get("/api/units")
    assert response.status_code == 200
    units_data = response.json()
    assert len(units_data) == 3
    assert units_data[0]["name"] == "Unit 1"


def test_create_unit():
    """Teste la création d'une nouvelle unité."""
    new_unit_data = {"id": 4, "name": "New Unit", "points": 400}
    response = client.post("/api/units", json=new_unit_data)

    assert response.status_code == 200
    created_unit = response.json()
    assert created_unit["name"] == new_unit_data["name"]
    assert created_unit["points"] == new_unit_data["points"]
    assert created_unit["id"] == new_unit_data["id"]
    
    response = client.get("/api/units")
    assert response.status_code == 200
    units_data = response.json()
    assert len(units_data) == 4
