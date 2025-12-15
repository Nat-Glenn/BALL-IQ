import "./globals.css";
import TopNav from "../components/TopNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900">
        <TopNav />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}

