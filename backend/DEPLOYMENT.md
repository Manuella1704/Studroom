# Déploiement de Studroom Backend

Ce guide explique comment déployer l'application Studroom en production avec Docker.

## Prérequis

- Docker et Docker Compose installés sur le serveur
- Un nom de domaine configuré pour pointer vers votre serveur (optionnel mais recommandé)
- Un certificat SSL (Let's Encrypt recommandé)

## Configuration

1. Copiez le fichier `.env.prod` en `.env` et modifiez les valeurs selon votre configuration :
   ```bash
   cp .env.prod .env
   ```

2. Modifiez les paramètres sensibles comme les clés secrètes, les mots de passe de base de données, etc.

## Construction et démarrage

1. Construisez les images Docker :
   ```bash
   docker compose -f docker-compose.prod.yml build
   ```

2. Démarrer les conteneurs :
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

3. Vérifiez les logs pour vous assurer que tout fonctionne correctement :
   ```bash
   docker compose -f docker-compose.prod.yml logs -f
   ```

## Gestion des données

### Sauvegarde de la base de données

```bash
docker exec -t studroom-db pg_dump -U postgres studroom > backup_$(date +%Y-%m-%d_%H-%M-%S).sql
```

### Restauration de la base de données

```bash
cat backup_file.sql | docker exec -i studroom-db psql -U postgres studroom
```

## Mises à jour

Pour mettre à jour l'application :

1. Arrêtez les conteneurs :
   ```bash
   docker compose -f docker-compose.prod.yml down
   ```

2. Récupérez les dernières modifications :
   ```bash
   git pull origin main
   ```

3. Reconstruisez et redémarrez :
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

## Surveillance

- Consultez les logs :
  ```bash
  docker compose -f docker-compose.prod.yml logs -f
  ```

- Vérifiez l'état des conteneurs :
  ```bash
  docker compose -f docker-compose.prod.yml ps
  ```

## Sécurité

- Assurez-vous que seuls les ports nécessaires sont exposés (80, 443)
- Utilisez toujours HTTPS
- Maintenez vos images Docker à jour
- Ne stockez jamais de données sensibles dans votre dépôt Git
