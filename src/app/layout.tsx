import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "JibinForge AI | Code Intelligence & Developer DNA",
    description: "Predict weak areas, track skill growth, and evolve your coding DNA with JibinForge AI.",
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "JibinForge AI | Code Intelligence & Developer DNA",
        description: "Predict weak areas, track skill growth, and evolve your coding DNA with JibinForge AI.",
        url: "https://jibinforge.ai",
        siteName: "JibinForge AI",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "JibinForge AI | Code Intelligence & Developer DNA",
        description: "Predict weak areas, track skill growth, and evolve your coding DNA with JibinForge AI.",
    },
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
