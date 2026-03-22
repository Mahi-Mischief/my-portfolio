import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahi Deshpande - Full Stack Developer & Creative Artist",
  description: "West Forsyth High School student passionate about AI, web development, and creative technology. FBLA State Winner and experienced in Next.js, Python, and Unity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig>
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
