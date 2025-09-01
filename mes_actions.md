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