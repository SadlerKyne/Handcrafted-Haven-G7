// Importing Next.js metadata types.
import type { Metadata } from "next";
// Importing the Roboto font from Google.
import { Roboto } from "next/font/google";
// Importing my global stylesheet.
import "./globals.css";
// Importing my custom Navbar component.
import Navbar from "@/components/Navbar";
// Importing my custom Footer component.
import Footer from "@/components/Footer";

// Configuring the Roboto font weights and subsets.
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

// Defining the SEO metadata for my site.
export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A premier marketplace connecting artisans with buyers for unique handcrafted items.",
};

// Main layout wrapper for the entire application.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Applying my custom font variable to the HTML tag.
    <html lang="en" className={roboto.variable}>
      {/* Setting up a flexbox column layout to push the footer to the bottom. */}
      <body className="flex flex-col min-h-screen">
        {/* Rendering the global navigation bar at the top. */}
        <Navbar />
        {/* Main content area that expands to fill available space. */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Rendering the global footer at the bottom. */}
        <Footer />
      </body>
    </html>
  );
}