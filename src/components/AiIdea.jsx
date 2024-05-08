import { Card, CardContent, Button } from "@mui/material";
import style from "./Products.module.css";

export default function AiIdea(props) {
  const { idea } = props;
  return (
    <Card className={style.MuiCardRoot}>
      <CardContent className={style.MuiCardContentRoot}>
        <h2 className={style.productTitle}>{idea.title}</h2>
        <img
          className={style.productImage}
          src={idea.imageData[0].url}
          alt="product 1"
        />
        <div className={style.sellersDiv}>
          <p className={style.sellerName}>{idea.ideaDescription}</p>
          <Button variant="contained" color="primary">
            post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
