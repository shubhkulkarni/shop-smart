import { Body1, Button, Divider, Subtitle1, Subtitle2, makeStyles, shorthands } from '@fluentui/react-components';
import { Send24Regular, ShoppingBagDismiss24Regular } from '@fluentui/react-icons';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../components/ProductCard/cartProduct';
import { useCartPrice } from '../hooks/hooks';
import { clearCart } from '../redux/slices/cart';

function CartDrawer() {
    
    const { totalPrice,validProducts,products } = useCartPrice();
    const styles = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onBuy = useCallback(()=>{
        navigate('/checkout/cart-checkout')
    },[navigate])

    return (
        <div className={styles.container}>
            {products.length === 0 && <div>
                <Body1>Your cart is empty! Add items to your cart to check-out.</Body1>
            </div>}
            {products.length > 0 && <><div className={styles.products}>
                {products.map(product => {
                    return <CartProduct product={product} />
                })}
                <Divider style={{ margin: `10px` }}>{validProducts} items</Divider>
                <Subtitle2 style={{ margin: `10px` }}>Total: </Subtitle2> <Subtitle1>{totalPrice} ₹ </Subtitle1>
            </div>
            <div className={styles.buy}>
                <Button icon={<ShoppingBagDismiss24Regular/>} style={{marginRight:'10px'}} iconPosition='after' onClick={() =>dispatch(clearCart())}>Clear cart</Button>
                <Button icon={<Send24Regular/>} iconPosition='after' appearance='primary' onClick={onBuy}>Proceed to Buy ({validProducts}) item{validProducts > 0 && "s"}</Button>
            </div></>}
        </div>
    )
}

export default CartDrawer

const useStyles = makeStyles({
    container: { height: '100%', display: 'flex', flexDirection: 'column' },
    buy: { position: 'sticky', bottom: 0, ...shorthands.padding('25px', '10px'), display: 'flex', justifyContent: 'end' },
    products: { ...shorthands.flex(1) }
});