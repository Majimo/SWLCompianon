# === Stage build-frontend ===
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# === Stage build-backend ===
FROM python:3.11-slim AS build-backend
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./

# === Stage de création de l'image finale pour le frontend ===
FROM nginx:alpine AS final-frontend
COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html
EXPOSE 80

# === Stage de création de l'image finale pour le backend ===
FROM python:3.11-slim AS final-backend
WORKDIR /app/backend
COPY --from=build-backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=build-backend /app/backend ./
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
