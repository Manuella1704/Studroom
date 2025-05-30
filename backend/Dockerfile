# Étape de construction
FROM python:3.11-slim AS builder

WORKDIR /app

# Installation des dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Installation des dépendances Python
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Étape d'exécution
FROM python:3.11-slim

WORKDIR /app

# Copie des dépendances depuis le builder
COPY --from=builder /root/.local /root/.local
COPY --from=builder /app/requirements.txt .

# Installation des dépendances système nécessaires pour l'exécution
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    ffmpeg \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Copie du code source
COPY . .

# Configuration des variables d'environnement
ENV PATH="/root/.local/bin:$PATH"
ENV PYTHONPATH="/app"

# Exposition du port
EXPOSE 8000

# Commande de démarrage
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
