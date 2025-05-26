from django.shortcuts import render
from rest_framework import generics 
from rest_framework.generics import ListAPIView
from rest_framework import viewsets, serializers
from .models import Chambre, RoomImage, Universite, Annonce, Favori, Signalement
from .serializers import ChambreSerializer, RoomImageSerializer, UniversiteSerializer, AnnonceSerializer, FavoriSerializer, SignalementSerializer
from users.permissions import IsAnnonceur, IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from users.permissions import IsEtudiant
from users.permissions import IsAnnonceur, IsAdmin
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import AllowAny

class DashboardAnnonceurStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        annonceur_id = request.user.id
        user = request.user
        nb_chambres = Chambre.objects.filter(proprietaire=user).count()
        nb_annonces = Annonce.objects.filter(chambre__proprietaire=user, statut='active').count()
        nb_signalements = Signalement.objects.filter(chambre__proprietaire=user).count()

        return Response({
            "nb_chambres": nb_chambres,
            "nb_annonces": nb_annonces,
            "nb_signalements": nb_signalements
        })
class ChambreViewSet(viewsets.ModelViewSet):
    queryset = Chambre.objects.all()
    serializer_class = ChambreSerializer

    def get_queryset(self):
        queryset = self.queryset
        ville = self.request.query_params.get('ville')
        quartier = self.request.query_params.get('quartier')
        wifi = self.request.query_params.get('wifi')
        meuble = self.request.query_params.get('meuble')
        prix_max = self.request.query_params.get('prix_max')

        if ville:
            queryset = queryset.filter(ville__icontains=ville)
        if quartier:
            queryset = queryset.filter(quartier__icontains=quartier)
        if wifi == 'true':
            queryset = queryset.filter(wifi_disponible=True)
        if meuble == 'true':
            queryset = queryset.filter(est_meublee=True)
        if prix_max:
            try:
                queryset = queryset.filter(prix__lte=int(prix_max))
            except ValueError:
                pass

        return queryset

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAnnonceur(), IsOwnerOrReadOnly()]
        return [AllowAny()]

class ChambreListCreateView(generics.ListCreateAPIView):
    serializer_class = ChambreSerializer

    def get_queryset(self):
        return Chambre.objects.filter(valide=True, images__isnull=False).distinct()

class RoomImageViewSet(viewsets.ModelViewSet):
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer

class UniversiteViewSet(viewsets.ModelViewSet):
    queryset = Universite.objects.all()
    serializer_class = UniversiteSerializer


class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Annonce.objects.all()
        if user.role == 'annonceur':
            return Annonce.objects.filter(chambre__proprietaire=user)
        return Annonce.objects.none()

    def perform_create(self, serializer):
        chambre = serializer.validated_data['chambre']
        if chambre.proprietaire != self.request.user:
            raise serializers.ValidationError("Vous ne pouvez créer une annonce que pour vos propres chambres.")
        serializer.save()
    
    def perform_update(self, serializer):
        if self.get_object().chambre.proprietaire != self.request.user and self.request.user.role != 'admin':
            raise serializers.ValidationError("Vous ne pouvez modifier que vos propres annonces.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.chambre.proprietaire != self.request.user and self.request.user.role != 'admin':
            raise serializers.ValidationError("Suppression refusée : vous n’êtes pas le propriétaire.")
        instance.delete()

class FavoriViewSet(viewsets.ModelViewSet):
    queryset = Favori.objects.all()
    serializer_class = FavoriSerializer
    permission_classes = [IsAuthenticated, IsEtudiant]

    def get_queryset(self):
        # Ne retourne que les favoris de l’utilisateur, dont la chambre est liée à une annonce active
        return Favori.objects.filter(
            utilisateur=self.request.user,
            chambre__annonce__statut='active'
        )

    def perform_create(self, serializer):
        chambre = self.request.data.get('chambre')
        if Favori.objects.filter(utilisateur=self.request.user, chambre=chambre).exists():
            raise serializers.ValidationError("Cette chambre est déjà dans vos favoris.")
        serializer.save(utilisateur=self.request.user)

class SignalementViewSet(viewsets.ModelViewSet):
    queryset = Signalement.objects.all()
    serializer_class = SignalementSerializer
    permission_classes = [IsAuthenticated, IsEtudiant]

    def get_queryset(self):
        # L’étudiant voit ses propres signalements
        return Signalement.objects.filter(utilisateur=self.request.user)

    def perform_create(self, serializer):
        chambre = self.request.data.get('chambre')
        if Signalement.objects.filter(utilisateur=self.request.user, chambre=chambre).exists():
            raise serializers.ValidationError("Vous avez déjà signalé cette chambre.")
        serializer.save(utilisateur=self.request.user)

class ChatbotRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        prix_max = data.get("prix_max", 999999)
        ville = data.get("ville", None)
        wifi = data.get("wifi", None)
        universite = data.get("universite", None)

        chambres = Chambre.objects.filter(annonce__statut='active')

        if prix_max:
            chambres = chambres.filter(prix__lte=prix_max)
        if ville:
            chambres = chambres.filter(ville__icontains=ville)
        if wifi is not None:
            chambres = chambres.filter(wifi_disponible=wifi)
        if universite:
            chambres = chambres.filter(universite_proche_nom_icontains=universite)

        serialized = ChambreSerializer(chambres, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)
    
class RoomListAPIView(ListAPIView):
    queryset = Chambre.objects.all()
    serializer_class = ChambreSerializer