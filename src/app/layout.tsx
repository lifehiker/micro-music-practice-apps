import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://earkit.local"),
  title: {
    default: "EarKit | 5-Minute Daily Ear Training Drills",
    template: "%s | EarKit",
  },
  description:
    "Build your ear in 5 minutes a day with interval, chord, and progression drills for self-taught musicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
