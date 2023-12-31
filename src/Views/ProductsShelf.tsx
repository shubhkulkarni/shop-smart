import { makeStyles } from "@fluentui/react-components";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCartControls } from "../hooks/hooks";
import { IProduct } from "../types/types";

interface IProductShelf{    
    products: IProduct[];
}
function ProductsShelf(props: IProductShelf) {
    const { products} = props;
    const styles = useStyles();
    const navigate = useNavigate();
    const {isInCart,onCartClick} = useCartControls();

    const onCardClick = useCallback((id: string|number)=>{
        return () => {
           
            navigate(`/product/${id}`)
        };
    },[navigate]);

  return (
    <div className={styles.shelf} style={{gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr)"}}>
        {products.map(product=>{
            const inCart = isInCart(product.id);
            return <ProductCard key={product.id}
                image={product.image}
                name={product.name}
                category={product.category}
                price={product.price}
                rating={product.rating}
                id={product.id}
                inCart={inCart}
                reviews={product.reviews}
                onCartClick={onCartClick(product,inCart)}
                onClick={onCardClick(product.id)}
            />
        })}
    </div>
  )
}

export default ProductsShelf
const useStyles = makeStyles({
    shelf:{
        display: "grid",
        gridGap: "30px",
        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)",
        marginTop: "30px"
    }
})

