import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useMemo } from "react";
import { IProduct } from "../types/types";
import { addToCart, deleteItem } from "../redux/slices/cart";

export const useCartControls = () => {
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state: RootState)=> state?.cart?.cart.map(i=>i.id),shallowEqual);

    const onCartClick = useCallback((product: IProduct,inCart: boolean)=>{
        
        return () => {
            if(!inCart) dispatch(addToCart(product))
            else dispatch(deleteItem(product.id))
        }
    },[dispatch]);

    const isInCart = (id: string|number) => cartItems.includes(id);
    return {isInCart,onCartClick,cartItems}
}

export const useCartPrice = () =>{
    const quantities = useSelector((state: RootState)=>state.cart.quantities);
    const products = useSelector((state: RootState) => state?.cart?.cart);
    const calculateEffectivePrice = useCallback((price: string | undefined,id: string) => {
        return Math.ceil((price ? Number(price) : 0) * (quantities[id] ?? 0))
    },[quantities]); 

    const totalPrice = useMemo(() => {
        let sum = 0;
        products.forEach(i => {
            sum = sum + calculateEffectivePrice(i.price, i.id as string);
        })
        return sum;
    }, [calculateEffectivePrice, products]);

    const validProductsItems = useMemo(() => {
        return (products.filter(i => quantities[i.id] !== 0) ?? [])
    }, [products, quantities]);
    const validProducts = validProductsItems.length

    return {calculateEffectivePrice,quantities,totalPrice,validProducts,validProductsItems,products};
}
