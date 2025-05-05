import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/provider/theme-provider";

export const metadata: Metadata = {
  title: "MahPotion – Open Source Alternative to Notin",
  description:
    "MahPotion is a privacy-first, open source Notin alternative. Capture and keep your quick thoughts, reminders, and tasks — host it yourself, no strings attached.",
  keywords: [
    "MahPotion",
    "Notin alternative",
    "open source notes app",
    "privacy first notes",
    "self-hosted notes",
    "quick reminder app",
    "MahLogic",
    "shadcn UI",
    "next.js trpc",
  ],
  authors: [{ name: "MahLogic Solutions", url: "https://github.com/MahLogic" }],
  creator: "MahLogic Solutions",
  openGraph: {
    title: "MahPotion – Open Source Alternative to Notin",
    description:
      "Capture thoughts. Keep them until you’re done. A clean, privacy-first Notin alternative.",
    url: "https://mahpotion.dev", // update to actual URL
    siteName: "MahPotion",
    images: [
      {
        url: "https://mahpotion.dev/og-image.png", // you’ll want to create a social preview image
        width: 1200,
        height: 630,
        alt: "MahPotion – Privacy-first note app",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MahPotion – Open Source Notin Alternative",
    description: "Self-hosted. Open source. Privacy-first.",
    creator: "@YourHandle", // update this
    images: ["https://mahpotion.dev/og-image.png"],
  },
  metadataBase: new URL("https://mahpotion.dev"),
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
