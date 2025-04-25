from django.contrib import admin
from .models import Chambre, Universite, Annonce

class ChambreAdmin(admin.ModelAdmin):
    list_display = ('titre', 'prix', 'ville', 'universite_proche', 'proprietaire')

admin.site.register(Chambre, ChambreAdmin)
admin.site.register(Universite)
admin.site.register(Annonce)
