import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Hint Word Game",
  description:
    "Game to try guess word by write number of letters , hint letters and correct it to get the right word ..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="seagreen" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
