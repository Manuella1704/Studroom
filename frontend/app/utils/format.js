export function formatPrice(value) {
    if (!value) return "0 FCFA";
    return Number(value).toLocaleString("fr-FR") + " FCFA";
  }