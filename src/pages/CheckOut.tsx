import { Button, Divider, Field, Input, Textarea, Title3, makeStyles } from '@fluentui/react-components';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Views/Layout';
import CartProduct from '../components/ProductCard/cartProduct';
import { useCartPrice } from '../hooks/hooks';
import { products } from '../mock/products';
import { getProductBinding } from '../mock/services';
import { IProduct } from '../types/types';

function CheckOut() {
    const styles = useStyles();
    const { id } = useParams();
    const cartCheckOut = id === 'cart-checkout';
    const { validProductsItems, totalPrice,validProducts } = useCartPrice();
    const [addCart,setAddCart] = useState(false);

    const productsList: IProduct[] = useMemo(() => {
        if (!cartCheckOut) {
            return getProductBinding(products.filter(i => i._id === id)) as IProduct[]
        }
        return [] as IProduct[];
    }, [cartCheckOut, id])

    const onAddCart = useCallback(()=>{
        setAddCart(prev => !prev)
    },[])

    // const checkOutItems = cartCheckOut ? validProductsItems : productsList;
    const {checkOutItems,price} = useMemo(()=>{
        if(cartCheckOut){
            return {checkOutItems: validProductsItems,price: totalPrice}
        }else if(addCart && !cartCheckOut){
            if(validProductsItems.findIndex(i=>i.id===id)!== -1) return {checkOutItems: validProductsItems,price: totalPrice}
            return {checkOutItems:[...validProductsItems,...productsList],price: totalPrice+Math.ceil(Number(productsList[0]?.price ?? 0))}
        }else return {checkOutItems: productsList,price: Math.ceil(Number(productsList[0]?.price ?? 0))}
    },[addCart,validProductsItems,productsList,cartCheckOut,id,totalPrice]);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.formMain}>
                    <Title3 style={{ marginBottom: '15px' }}>Delivery details</Title3>
                    <div className={styles.form}>
                        <Field label={"Your name"} className={styles.formItem} required>
                            <Input placeholder='Enter full name'  appearance='filled-darker-shadow' />
                        </Field>
                        <Field label={"Add detailed address"} className={styles.formItem} required>
                            <Textarea size='large' placeholder='Your delivery address' appearance='filled-darker-shadow'></Textarea>
                        </Field>
                        <Field label={"Pin code"} className={styles.formItem} required>
                            <Input type='number' maxLength={6} placeholder='Pin Code' appearance='filled-darker-shadow' />
                        </Field>
                        <div className={styles.buyBtn}>
                           {!cartCheckOut && <Button onClick={onAddCart} style={{ marginRight: '10px',marginTop: '15px' }}>{addCart ? "Remove" :"Add"} cart items ({validProducts})</Button>}
                            <Button appearance='primary' style={{ marginTop: '15px' }}>Pay {price} ₹</Button>
                        </div>
                    </div>
                </div>
                <Divider vertical style={{ height: "100%" }}>

                </Divider>
                <div className={styles.products}>
                    {checkOutItems.map(product => {
                        return <CartProduct product={product} hasActions={false} price={(!addCart && !cartCheckOut) ? Math.ceil((product?.price ? Number(product?.price) : 0)) : undefined} />
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default CheckOut

const useStyles = makeStyles({
    container: { display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'start', height: '100%' },
    formMain: { width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', paddingRight: '10px' },
    products: { width: '50%' },
    form: { width: '100%' },
    formItem: { marginBottom: '10px' },
    buyBtn:{display:'flex',justifyContent:'end'}
})