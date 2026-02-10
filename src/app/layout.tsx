import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Beberia - Korean Medical Tourism for Vietnamese",
    template: "%s | Beberia",
  },
  description:
    "Book Korean hospitals with exclusive Beberia community discounts. Plastic surgery, ophthalmology, dentistry, dermatology, and oriental medicine.",
  keywords: [
    "Korean medical tourism",
    "Vietnam",
    "plastic surgery Korea",
    "Beberia",
    "hospital booking",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
