import Product from "../components/Product";
import style from "./page.module.css";
export default function Home() {
  return (
    <div>
      <h3>Welcome to UpCycle Pioneers!</h3>
      <main>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </main>
    </div>
  );
}
