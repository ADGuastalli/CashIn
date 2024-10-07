import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@/context/userContext";
import { GastosProvider } from "@/context/gastosContext";
import { IngresosProvider } from "@/context/incomeContext";
import { CategoriasProvider } from "@/context/categorias&variablesContext";
import { DeudaProvider } from "@/context/deudaContext";
import { PersonalPropertyProvider } from "@/context/personalPropertyContext";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "CashIn - Coach Financiero",
  description: "Aplicación web de Coach Financiero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <UserProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <CategoriasProvider>
              <GastosProvider>
                <IngresosProvider>
                  <DeudaProvider>
                    <PersonalPropertyProvider>
                      {children}
                    </PersonalPropertyProvider>
                  </DeudaProvider>
                </IngresosProvider>
              </GastosProvider>
            </CategoriasProvider>
          </GoogleOAuthProvider>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
