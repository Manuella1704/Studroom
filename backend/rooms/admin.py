from django.contrib import admin
from .models import Chambre, Universite, Annonce, RoomImage, Signalement

class RoomImageInline(admin.TabularInline):
    model = RoomImage
    extra = 1

class ChambreAdmin(admin.ModelAdmin):
    list_display = ('titre', 'prix', 'ville', 'universite_proche', 'proprietaire')
    inlines = [RoomImageInline]

class UniversiteAdmin(admin.ModelAdmin):
    list_display = ('nom', 'ville')

admin.site.register(RoomImage)
admin.site.register(Chambre, ChambreAdmin)
admin.site.register(Universite, UniversiteAdmin)
admin.site.register(Annonce)
admin.site.register(Signalement)