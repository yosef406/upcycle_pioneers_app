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
