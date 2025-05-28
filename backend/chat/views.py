from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from g4f.client import Client
import g4f

from rooms.models import Chambre

client = Client()


@api_view(['POST'])
def chat_ai(request):

    chambres = Chambre.objects.filter().distinct()
    training_rooms = []
    for chambre in chambres:
        training_rooms.append({"role": "user", "content": chambre.description})
        training_rooms.append({"role": "assistant", "content": chambre.titre})
        training_rooms.append({"role": "assistant", "content": chambre.prix})
        training_rooms.append({"role": "assistant", "content": chambre.ville})
        training_rooms.append({"role": "assistant", "content": chambre.quartier})
        training_rooms.append({"role": "assistant", "content": chambre.adresse_complete})

    str_training_rooms = str(training_rooms)

    question = request.data.get("question")
    if not question:
        return Response({"error": "Aucune question reçue."}, status=400)

    history = str(request.data.get("history"))

    try:

        response = client.chat.completions.create(
            model=g4f.models.gemini_2_5_flash,
            messages=[
                {"role": "system", "content": "Tu es un assistant utile qui aide les étudiants à trouver des chambres. avec ces données : " + str_training_rooms + "Si on te demande des chambre et que tu ne trouve pas dans cette liste dis juste que tu ne trouve pas de chambre."},
                {"role": "system", "content": "Le contexte de la conversation est le suivant : " + history},
                {"role": "user", "content": question}
            ]
        )

        answer = response.choices[0].message.content.strip()
        return Response({"answer": answer})

    except Exception as e:
        print("Erreur OpenAI :", str(e))  # Affiche l'erreur dans le terminal
        return Response({"error": str(e)}, status=500)
