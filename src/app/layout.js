// src/app/layout.js

import "./globals.css";

// Pakai CDN font Geist (stabil dan tanpa error import)
export const metadata = {
  title: "Etalase Barang",
  description: "Aplikasi barang dengan Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-geist bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}


