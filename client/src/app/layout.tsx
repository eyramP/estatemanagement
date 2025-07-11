import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { openSans, robotoSlab } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

import ReduxProvider from "@/lib/redux/provider";
import Toast from "@/components/shared/Toast";
import { PersistAuth } from "@/utils";

export const metadata: Metadata = {
  title: "Home | Estate Management",
  description: "Welcome to the official website of Estate Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${robotoSlab.variable}`}>
          <Toast />
          <ReduxProvider>
            <PersistAuth />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </body>
    </html>
  );
}
