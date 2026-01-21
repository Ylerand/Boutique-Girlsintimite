import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Boutique Girlsintimite",
    description: "Lencería y Moda Feminina",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen pb-16 lg:pb-0">
                    {children}
                </main>
                <MobileNav />
            </body>
        </html>
    );
}
