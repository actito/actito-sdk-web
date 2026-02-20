import { ReactNode } from "react";
import { Toaster } from "sonner";
import { GoogleMapsBootstrap } from "@/components/google-maps-bootstrap";

import "./globals.css";

export const metadata = {
  title: "Sample app",
  description: "Sample app used for testing the Actito web libraries.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-neutral-950">
      <body className="h-full">
        <Toaster position="bottom-right" offset={32} mobileOffset={44} />
        <main>
          {children}

          <GoogleMapsBootstrap />
        </main>
      </body>
    </html>
  );
}
