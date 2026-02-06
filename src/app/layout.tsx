import "./globals.css";

export const metadata = {
  title: "Receitas Inteligentes",
  description: "Encontre e gere receitas com inteligência artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
