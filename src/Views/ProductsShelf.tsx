import { makeStyles } from "@fluentui/react-components";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProduct } from "../types/types"
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector, useStore } from "react-redux";
import { ICartState, addToCart, deleteItem } from "../redux/slices/cart";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useCartControls } from "../hooks/hooks";

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

