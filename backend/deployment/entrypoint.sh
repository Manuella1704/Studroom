#!/bin/bash
set -e

# Attendre que le service MySQL soit disponible
if [ "$DB_HOST" = "db" ]; then
    echo "Waiting for MySQL..."
    while ! nc -z $DB_HOST 3306; do
        sleep 1
    done
    echo "MySQL is ready"
fi

# Appliquer les migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Créer un superutilisateur si nécessaire
if [ "$DJANGO_SUPERUSER_EMAIL" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser \
        --noinput \
        --email $DJANGO_SUPERUSER_EMAIL \
        --username $DJANGO_SUPERUSER_USERNAME || true
fi

# Collecter les fichiers statiques (déjà fait dans le Dockerfile)
# python manage.py collectstatic --noinput

# Démarrer Gunicorn et Nginx
echo "Starting Gunicorn..."
exec gunicorn \
    --bind unix:/run/gunicorn.sock \
    --workers 3 \
    --threads 2 \
    --worker-class=gthread \
    --log-level=info \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    backend.wsgi:application &
