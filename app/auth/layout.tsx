import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthLayoutWrapper } from '@/components/layouts/auth-layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VentureConnect - Authentication',
  description: 'Sign in or create an account to get started',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}