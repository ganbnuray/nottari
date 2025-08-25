import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nottari Documents",
  description: "Collaborative Real-time Code Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-without-title.svg" />
      </head>
      <body className={inter.className}>
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster toastOptions={{ className: inter.className }} />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
        <SpeedInsights />
      </body>
    </html>
  );
}
