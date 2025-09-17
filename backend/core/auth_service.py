from backend.domain.models import UserInDB

# Base de données en mémoire pour les utilisateurs
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

def get_user(db, username: str):
    """Récupère un utilisateur de la base de données."""
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def fake_decode_token(token: str):
    """Simule le décodage d'un token pour trouver un utilisateur."""
    user = get_user(fake_users_db, token)
    return user

def fake_hash_password(password: str) -> str:
    """Simule le hachage d'un mot de passe."""
    return "fakehashed" + password
