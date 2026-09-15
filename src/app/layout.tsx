import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "TheraScore AI — Psychotherapy Quality, DBT Adherence & CBT Competence Platform",
  description: "AI-Powered Psychotherapy Quality Platform: Session Diarization, DBT Adherence Rating Scale, CBT CTRS Competence Scoring, Automated SOAP Clinical Notes, and HIPAA PHI De-Identification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-teal-500/20 selection:text-teal-700 dark:selection:text-teal-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central Traffic Tracking Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=therascore-ai"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
