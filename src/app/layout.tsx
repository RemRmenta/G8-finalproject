// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers"; // ensure the correct path

export const metadata = {
  title: "Group 8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
