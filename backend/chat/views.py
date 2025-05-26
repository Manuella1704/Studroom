from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
import os

@api_view(['POST'])
def chat_ai(request):
    question = request.data.get("question")
    if not question:
        return Response({"error": "Aucune question reçue."}, status=400)

    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Tu es un assistant utile qui aide les étudiants à trouver des chambres."},
                {"role": "user", "content": question}
            ]
        )

        answer = response.choices[0].message.content.strip()
        return Response({"answer": answer})

    except Exception as e:
        print("Erreur OpenAI :", str(e))  # Affiche l'erreur dans le terminal
        return Response({"error": str(e)}, status=500)
        