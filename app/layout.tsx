import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js CRUD App",
  description: "Customers CRUD app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Next.js CRUD App
        </h1>
        <hr />
        <p>&nbsp;</p>

        {children}

        <p>&nbsp;</p>
        <div>Created by Karina</div>
      </body>
    </html>
  );
}
