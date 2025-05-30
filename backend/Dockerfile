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

# Installation des dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    ffmpeg \
    libsm6 \
    libxext6 \
    nginx \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# Copie des dépendances Python depuis le builder
COPY --from=builder /root/.local /root/.local

# Copie du code source
COPY . .

# Configuration des variables d'environnement
ENV PATH="/root/.local/bin:$PATH"
ENV PYTHONPATH="/app"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Configuration Nginx
COPY ./deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./deployment/nginx/studroom.conf /etc/nginx/sites-available/
RUN mkdir -p /etc/nginx/sites-enabled/ \
    && ln -s /etc/nginx/sites-available/studroom.conf /etc/nginx/sites-enabled/ \
    && rm /etc/nginx/sites-enabled/default

# Création des répertoires pour les fichiers statiques et médias
RUN mkdir -p /app/staticfiles /app/media

# Collecte des fichiers statiques
RUN python manage.py collectstatic --noinput

# Exposition des ports
EXPOSE 80 443

# Script de démarrage
COPY ./deployment/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
