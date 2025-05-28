const toggleFavorite = async (chambreId, isFav) => {
  const token = await getAccesToken();
  if (!token) {
    alert("Veuillez vous connecter pour ajouter une chambre en favori.");
    return;
  }

  const url = "http://localhost:8000/favoris/";
  try {
    const res = await fetch(url, {
      method: isAlreadyFavorite ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chambre: chambreId }),
    });

    if (res.ok) {
      setFavoris((prev) =>
        isAlreadyFavorite
          ? prev.filter((id) => id !== chambreId)
          : [...prev, chambreId]
      );
    } else {
      const err = await res.json();
      alert(err?.detail || "Erreur lors du traitement.");
    }
  } catch (error) {
    console.error("Erreur favoris :", error);
  }
};

export default toggleFavorite;
