// app/layout.js
import "./globals.css";
import ClientLayout from "./components/ui/ClientLayout";

export const metadata = {
  title: "Roomia",
  description: "Trouvez votre logement étudiant sécurisé au Cameroun.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gray-50 font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}