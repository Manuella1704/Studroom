# Generated by Django 5.2 on 2025-05-12 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilisateur',
            name='role',
            field=models.CharField(choices=[('etudiant', 'Étudiant'), ('annonceur', 'Annonceur'), ('administrateur', 'Adminstrateur')], default='etudiant', max_length=20),
        ),
    ]
