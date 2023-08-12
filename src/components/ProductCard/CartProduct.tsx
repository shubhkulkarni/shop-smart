import { Body1, Button, Caption1, Caption2, Card, CardHeader, CardPreview, Text, makeStyles, shorthands, tokens } from '@fluentui/react-components'
import { Add24Filled, Delete24Regular, MoreHorizontal20Filled, Subtract24Filled } from '@fluentui/react-icons'
import React from 'react'
import { IProduct } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, deleteItem, reduceQuantity } from '../../redux/slices/cart';
import { RootState } from '../../redux/store';
import { useCartPrice } from '../../hooks/hooks';
const useStyles = makeStyles({
    card: {
        // width: "360px",
        maxWidth: "100%",
        height: "fit-content",
        display: 'flex',
        ...shorthands.margin('10px')
    },
    header: {
       
    },
    cartProductName:{
        // maxWidth:'40px',
        // whiteSpace: 'nowrap',
        // ...shorthands.overflow('hidden'),
        // textOverflow: 'ellipsis',
        ...shorthands.overflow("hidden"),
    width: "300px",
    display: "block",
    },

    horizontalCardImage: {
        width: "64px",
        height: "64px",
        ...shorthands.padding('5px')
    },
    actions: {
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
       ...shorthands.gap('10px')
    },
    caption: {
        color: tokens.colorNeutralForeground3,
        marginTop:'5px'
    },
    qty:{
        // ...shorthands.margin(0,'10px')
    },
});

interface ICartProduct {
    product: IProduct;
    hasActions?: boolean;
    price?: number;
}
function CartProduct(props: ICartProduct) {
    const { product,hasActions = true,price} = props;
    const styles = useStyles();
    const dispatch = useDispatch();
    const {quantities,calculateEffectivePrice} = useCartPrice();
    return (
        <Card className={styles.card} size="small" role="listitem" orientation='horizontal'>
            <CardPreview className={styles.horizontalCardImage}>
                <img
                    className={styles.horizontalCardImage}
                    src={product.image}
                    alt="App Name Document"
                />
            </CardPreview>
            <CardHeader
                className={'cart-header'}

                header={<Text weight="semibold" truncate className={styles.cartProductName} style={{width: price!==undefined ? 'unset' : '300'}}>{product.name}</Text>}
                description={
                    <Body1 className={styles.caption}>
                        {price===undefined ? calculateEffectivePrice(product?.price,product?.id as string) : price} ₹
                    </Body1>
                }
                action={ hasActions ? 
                    <div className={styles.actions}>
                        <Button icon={<Delete24Regular />} onClick={() => dispatch(deleteItem(product.id))}/>
                        <Button icon={<Subtract24Filled />} onClick={() => dispatch(reduceQuantity(product.id))}/>
                        <div className={styles.qty}>{quantities[product.id]}</div>
                        <Button icon={<Add24Filled />} onClick={() => dispatch(addQuantity(product.id))}/>
                    </div> : undefined
                }
            />
        </Card>
    )
}

export default CartProduct