# Listing des différentes actions au fur à mesure pour pouvoir revenir dessus

## React

### Installation React dans `/frontend`

On installe React avec Vite (autant en profiter :P )
```
pnpm create vite@latest . -- --template react-ts
```

### Unit
- Création de Unit.tsx
    - On utilise les props (UnitProps)
- On utilise useState pour monter un tableau de 3 unités dans App et on importe Unit avec l'idx du tableau

### App
On utilise useState en donnant un état initial et un set pour faire changer notre titlePage
On fait évoluer la titlePage avec un useEffect pour simuler un appel API (setTimeout pour le temps de chargement potentiel)


## Objectif de Structure Clean Archi du backend

```
1 backend/
2 ├───api/
3 │   ├───__init__.py
4 │   ├───dependencies.py
6 │       ├───__init__.py
7 │       ├───units.py
8 │       └───auth.py
9 ├───core/
10 │   ├───config.py
10 │   └───auth_service.py
11 ├───domain/
12 │   ├───__init__.py
13 │   ├───models.py
24 └───main.py
```