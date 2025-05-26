from rest_framework import serializers
from .models import Utilisateur
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = Utilisateur
        fields = ('username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = Utilisateur.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        user.role = validated_data.get('role', 'etudiant')
        user.is_active = True  # <-- Active l'utilisateur ici
        user.save()
        return user