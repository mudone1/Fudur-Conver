import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fudur Conver",
  description: "AI-assisted conversation management across your platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        {/* Inline theme script avoids a flash of the wrong theme on load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
