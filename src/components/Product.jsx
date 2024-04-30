import { Card, CardContent, Button } from "@mui/material";
import style from "./Products.module.css";

export default function Product() {
  return (
    <Card className={style.MuiCardRoot}>
      <CardContent className={style.MuiCardContentRoot}>
        <h2 className={style.productTitle}>Product Title</h2>
        <img
          className={style.productImage}
          src="ezgif-3-ac0541cb77.jpg"
          alt="product 1"
        />
        <div className={style.sellersDiv}>
          <p className={style.sellerName}>Seller: John Doe</p>
          <Button variant="contained" color="primary" href="#add-to-cart">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
