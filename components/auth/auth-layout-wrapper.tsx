"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayoutWrapper({ children, className }: AuthLayoutWrapperProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}