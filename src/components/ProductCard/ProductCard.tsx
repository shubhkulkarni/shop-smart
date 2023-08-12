import { Body1, Body1Strong, Button, Caption1, Card, CardFooter, CardHeader, CardPreview, LargeTitle, Subtitle1, Title1, Title2, Title3, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { MoreHorizontal20Filled, Open16Regular, Share16Regular, ShoppingBag24Regular } from '@fluentui/react-icons';
import React from 'react'
import { Rating } from 'react-simple-star-rating';
import { IProduct } from '../../types/types';
import { shallowEqual, useSelector } from 'react-redux';
import { ICartState } from '../../redux/slices/cart';
import { RootState } from '../../redux/store';
interface IProductCardprops extends IProduct {
    onCartClick: () => void;
    inCart: boolean;
    onClick: () => void;
}


function ProductCard(props: IProductCardprops) {
    const { image, name, category, price, rating, reviews,onCartClick,inCart,onClick} = props;

    const styles = useStyles();
    
    return (

        <Card className={styles.card}>
            <CardPreview className={styles.cardimage} onClick={onClick}>
                <img
                    src={image}
                    alt="Sales Presentation Preview"
                />
            </CardPreview>

            <div className={styles.header} onClick={onClick}>
                <Caption1 className={styles.category}>{category}</Caption1>
                <Subtitle1 className={styles.name}>{name}</Subtitle1>
                <Title2><sup className={styles.curr}>₹</sup>{Math.ceil(Number(price ?? "0"))}</Title2>
                <div className={styles.rating}>
                    <Rating size={18} initialValue={rating} readonly />
                    <div className={styles.reviews}>({reviews || "No"} reviews)</div>
                </div>

            </div>

            <CardFooter className={styles.footer}>
                {!inCart && <Button icon={<ShoppingBag24Regular />} onClick={onCartClick} >
                    Add To Cart
                </Button>}
                {inCart && <Button appearance='subtle' icon={<ShoppingBag24Regular />} onClick={onCartClick} >
                     Added To Cart !
                </Button>}


            </CardFooter>
        </Card>
    )
}

export default ProductCard

const useStyles = makeStyles({
    card: {
        width: "100%",
        maxWidth: "250px",
        cursor: 'pointer'
    },
    footer: { display: 'flex', justifyContent: 'center', alignitems: 'center', marginTop: '5px' },
    header: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        flexDirection: 'column'

    },
    rating: {
        marginTop: '10px'
    },
    reviews: {
        color: tokens.colorNeutralForeground3,
        marginLeft: '10px'
    },
    category: {
        backgroundColor: tokens.colorBrandBackground2,
        ...shorthands.padding('3px', '8px'),
        ...shorthands.borderRadius('50px')
    },
    name: {
        ...shorthands.margin('5px', 0, '5px')
    },
    curr: { fontSize: '14px', marginRight: "4px" },
    cardimage: { height: '150px' },
    // addCart:{backgroundColor: tokens.colorPaletteYellowBackground2,
    // color: tokens.colorNeutralForeground1}

})