import { Viewport } from "next";
import Alert from "../components/Alert";
import { GlobalProvider } from "../redux/provider";
import "./globals.css";
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale:1,
  width: 'device-width'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <GlobalProvider>
          <Alert />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}