from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChambreViewSet, RoomImageViewSet, UniversiteViewSet, AnnonceViewSet
from . import views

router = DefaultRouter()
router.register(r'chambres', ChambreViewSet)
router.register(r'images', RoomImageViewSet)
router.register(r'universites', UniversiteViewSet)
router.register(r'annonces', AnnonceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('chambres', views.ChambreListCreateView.as_view(), name='chambres'),
]