from django.urls import path
from .views import chat_ai

urlpatterns = [
    path('', chat_ai, name='chatbot'),
]