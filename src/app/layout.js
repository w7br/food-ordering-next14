import {AppProvider} from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast";


import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <SessionProvider session={session}>
            <AppProvider>
              <Toaster />
              <Header />
              {children}
              <footer className="border-t p-8 text-center text-gray-500 mt-16">
                &copy; 2023 All rights reserved
              </footer>
            </AppProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  )
}
