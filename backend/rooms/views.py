from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Chambre, RoomImage, Universite, Annonce
from .serializers import ChambreSerializer, RoomImageSerializer, UniversiteSerializer, AnnonceSerializer

class ChambreViewSet(viewsets.ModelViewSet):
    queryset = Chambre.objects.all()
    serializer_class = ChambreSerializer

class ChambreListCreateView(generics.ListCreateAPIView):
    queryset = Chambre.objects.all()
    serializer_class = ChambreSerializer

class RoomImageViewSet(viewsets.ModelViewSet):
    queryset = RoomImage.objects.all()
    serializer_class = RoomImageSerializer

class UniversiteViewSet(viewsets.ModelViewSet):
    queryset = Universite.objects.all()
    serializer_class = UniversiteSerializer

class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
