from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsEtudiant(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'etudiant'


class IsAnnonceur(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'annonceur'


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Lecture seule autorisée pour tout le monde
        if request.method in SAFE_METHODS:
            return True
        # Sinon, il faut être le propriétaire de l’objet
        return obj.proprietaire == request.user