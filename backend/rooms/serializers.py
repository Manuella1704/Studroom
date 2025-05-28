from rest_framework import serializers
from .models import Chambre, RoomImage, Universite, Annonce, Favori, Signalement


class UniversiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Universite
        fields = '__all__'


class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = ['image']


class ChambreSerializer(serializers.ModelSerializer):
    images = RoomImageSerializer(many=True, read_only=True)
    universite_proche = UniversiteSerializer(read_only=True)

    class Meta:
        model = Chambre
        fields = '__all__'

    def validate(self, data):
        if not self.instance and not self.initial_data.get('images'):
            raise serializers.ValidationError(
                "Une chambre doit avoir au moins une image.")
        return data


class AnnonceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annonce
        fields = '__all__'


class FavoriSerializer(serializers.ModelSerializer):
    # Pour voir les infos de la chambre
    chambre = ChambreSerializer(read_only=True)

    class Meta:
        model = Favori
        fields = ['id', 'chambre', 'date_ajout']


class SignalementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signalement
        fields = '_all_'
        read_only_fields = ['utilisateur', 'date_signalement']
