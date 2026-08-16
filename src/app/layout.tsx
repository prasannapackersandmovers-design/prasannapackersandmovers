import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasanna Packers & Movers",
  description:
    "Prasanna Packers & Movers provides professional moving, transportation, AC, TV, water purifier, geyser, fan, electrical and plumbing services across Guntur, Vizag, Bengaluru and Hyderabad.",
  keywords: [
    "Prasanna Packers & Movers",
    "Packers and Movers Guntur",
    "House Shifting Guntur",
    "Office Shifting Guntur",
    "Moving Services Guntur",
    "AC Services Guntur",
    "TV Installation Guntur",
    "Water Purifier Service Guntur",
    "Geyser Service Guntur",
    "Fan Service Guntur",
    "Electrical Services Guntur",
    "Plumbing Services Guntur",
  ],
  authors: [
    {
      name: "Prasanna Packers & Movers",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}