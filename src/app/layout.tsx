import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NeuroForge | AI-Powered Code Intelligence",
    description: "Predict weak areas, track skill growth, and evolve your coding DNA with NeuroForge.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased overflow-x-hidden">
                {children}
            </body>
        </html>
    );
}
