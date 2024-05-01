import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
export const metadata = {
  title: "Upcycle Pioneers",
  description: "save the environment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <body>
        <div className="layout">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
