from django.db import models
from django.contrib.auth.models import AbstractUser


# Classe utilisateur custom pour gérer étudiants et propriétaires
class Utilisateur(AbstractUser):
    ROLES = (
        ("etudiant", "Étudiant"),
        ("proprietaire", "Propriétaire"),
    )
    role = models.CharField(max_length=20, choices=ROLES)
    telephone = models.CharField(max_length=20)
    universite = models.CharField(max_length=100, blank=True, null=True)  # si étudiant
    ville = models.CharField(max_length=100)

    groups = models.ManyToManyField(
        "auth.Group", related_name="utilisateurs_groups", blank=True
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="utilisateurs_permissions", blank=True
    )

    def _str_(self):
        return self.username
