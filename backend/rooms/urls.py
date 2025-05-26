from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChambreViewSet, RoomImageViewSet, UniversiteViewSet, AnnonceViewSet, FavoriViewSet, SignalementViewSet, ChambreListCreateView, DashboardAnnonceurStats, RoomListAPIView

from . import views

router = DefaultRouter()
router.register(r'chambres', ChambreViewSet)
router.register(r'images', RoomImageViewSet)
router.register(r'universites', UniversiteViewSet)
router.register(r'annonces', AnnonceViewSet)
router.register(r'favoris', FavoriViewSet, basename='favori')
router.register(r'signalements', SignalementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("chambres/", ChambreListCreateView.as_view(), name="chambre-list"),
    path('chatbot/recommandations/', views.ChatbotRecommendationView.as_view(), name='chatbot_recommendation'),
    path('dashboard-annonceur-stats/', DashboardAnnonceurStats.as_view(), name='dashboard-annonceur-stats'),
    path('rooms/', RoomListAPIView.as_view(), name= 'rooms-list'),
]
