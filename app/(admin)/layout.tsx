import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        {/* <header>Main App Header</header> */}
        <main>{children}</main>
        <footer>Main App Footer</footer>
      </body>
    </html>
  );
}
