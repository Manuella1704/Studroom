from django.db import models
from users.models import Utilisateur
from django.contrib.auth.models import AbstractUser
from location_field.models.plain import PlainLocationField

# Classe Université (facultatif mais pratique pour les filtres)
class Universite(models.Model):
    nom = models.CharField(max_length=100)
    ville = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

# Classe Chambre
class Chambre(models.Model):
    proprietaire = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='chambres')
    titre = models.CharField(max_length=100)
    description = models.TextField()
    prix = models.FloatField()
    ville = models.CharField(max_length=100)
    quartier = models.CharField(max_length=100)
    adresse_complete = models.CharField(max_length=255, blank=True)
    est_meublee = models.BooleanField(default=False)
    wifi_disponible = models.BooleanField(default=False)
    douche_interne = models.BooleanField(default=False)
    universite_proche = models.ForeignKey(Universite, on_delete=models.SET_NULL, null=True, blank=True)
    date_publication = models.DateTimeField(auto_now_add=True)

    localisation = PlainLocationField(based_fields=['ville'], zoom=7, blank=True, null=True)

    def __str__(self):
        return self.titre

# Classe Annonce (facultatif si tu veux séparer logique de chambre et publication)
class Annonce(models.Model):
    chambre = models.OneToOneField(Chambre, on_delete=models.CASCADE)
    statut = models.CharField(max_length=20, default='active')  # ou 'en attente', 'refusée'
    nombre_vues = models.IntegerField(default=0)

    def _str_(self):
        return f"Annonce: {self.chambre.titre}"

# Classe Favori
class Favori(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    chambre = models.ForeignKey(Chambre, on_delete=models.CASCADE)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.utilisateur.username} - {self.chambre.titre}"

# Classe Signalement
class Signalement(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    chambre = models.ForeignKey(Chambre, on_delete=models.CASCADE)
    motif = models.TextField()
    date_signalement = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.utilisateur.username} signale {self.chambre.titre}"

#pour l'image
class RoomImage(models.Model):
    chambre = models.ForeignKey('Chambre', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='chambre_images/')

    def __str__(self):
        return f"Image for {self.chambre.titre}"
