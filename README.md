**Projet de location de chambres**

Ce projet est une application web de location de chambres développée en utilisant le framework Django.

**Description**

L'application permet aux utilisateurs de créer des comptes, de publier des annonces de location de chambres et de réserver des chambres. Les utilisateurs peuvent également gérer leurs réservations et leurs annonces.

**Fonctionnalités**

* Création de comptes utilisateurs
* Publication d'annonces de location de chambres
* Réservation de chambres
* Gestion des réservations et des annonces
* Système de recherche de chambres

**Structure du projet**

Le projet est organisé en plusieurs applications :

* `backend` : contient les fichiers de configuration et les URLs de l'application
* `rooms` : contient les modèles, les vues et les URLs pour la gestion des chambres
* `users` : contient les modèles, les vues et les URLs pour la gestion des utilisateurs

**Dépendances**

* Django
* Python 3.12

**Installation**

1. Cloner le projet
2. Installer les dépendances en exécutant `pip install -r requirements.txt`
3. Créer une base de données et la configurer dans le fichier `settings.py`
4. Exécuter les migrations en exécutant `python manage.py migrate`
5. Démarrer le serveur en exécutant `python manage.py runserver`

**Contribution**

Si vous souhaitez contribuer au projet, veuillez suivre les étapes suivantes :

1. Forker le projet
2. Créer une branche pour votre contribution
3. Effectuer vos modifications et les tester
4. Soumettre une pull request
