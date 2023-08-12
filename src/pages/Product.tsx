import { Body1, Body1Strong, Button, Caption1, Caption1Strong, Image, Subtitle1, Subtitle2, Title1, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { ShoppingBag24Regular, ShoppingBagArrowLeft24Regular, ShoppingBagPercent24Regular } from '@fluentui/react-icons';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Layout from '../Views/Layout';
import Reviews from '../Views/Reviews';
import { useCartControls } from '../hooks/hooks';
import { products } from '../mock/products';
import { getProductBinding } from '../mock/services';

function Product() {
    const { id } = useParams();

    const product = useMemo(() => {
        return products.find(i => i._id === id) ?? null;
    }, [id]);

    const styles = useStyles();
    const {isInCart,onCartClick} = useCartControls();
    const navigate = useNavigate();
    
    const onBuy = useCallback(()=>{
        navigate('/checkout/'+product?._id ?? "")
        
    },[navigate,product?._id])

    const inCart = isInCart(product?._id as string);
    const onCartBtnClick = onCartClick(getProductBinding([product])[0],inCart);
    return (
        <Layout>
            <div className={styles.detailsMain}>
                <div className={styles.img}>
                    <Image src={product?.image} className={styles.imgMain} fit='contain' />
                </div>
                <div className={styles.details}>
                    <div><Caption1 className={styles.category}>{product?.category?.name}</Caption1></div>
                    <Title1>{product?.name}</Title1>
                    <div className={styles.desc}>
                        <Subtitle2>{product?.description}</Subtitle2>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.rating}>
                            <Rating size={18} initialValue={product?.rating} readonly />
                            <a className={styles.reviews} href={product?.reviews.length ? '#reviews' : undefined}>({product?.reviews.length || "No"} reviews)</a>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <Subtitle1 className={styles.discount}>-10%</Subtitle1>
                        <Title1><sup className={styles.curr}>₹</sup>{Math.ceil(product?.price as number)}</Title1>
                        <Body1 strikethrough className={styles.mrp}>{"MRP: " + Math.ceil(1.1 * (product?.price as number ?? 0))}</Body1>
                        <Caption1Strong className={styles.tag}>LIMITED TIME DEAL</Caption1Strong>
                    </div>
                    <div className={styles.desc}>
                        {product?.sold as number > 0 && <Alert className={styles.alert} appearance={'primary'} intent="warning" action="Hurry up!">
                            {`${product?.sold} already sold out of ${product?.quantity}. Only few left!`}
                        </Alert>}
                        {
                            product?.sold === 0 && <Alert className={styles.alertSuccess} appearance={'primary'} intent="success" action="Hurry up!">
                                {`In Stock!`}
                            </Alert>
                        }
                    </div>
                    <div className={styles.desc}>
                        <Body1Strong className={styles.offerHeading}><ShoppingBagPercent24Regular style={{ marginRight: '10px' }} /> Offers</Body1Strong>
                        <div className={styles.offers}>
                            <div className={styles.offer}>
                                <div className={styles.offerDisc}><ShoppingBagPercent24Regular style={{ marginBottom: '5px' }} /><div>10% Extra Off</div></div>

                            </div>
                            <div className={styles.offer}>
                                <div className={styles.offerDisc}><ShoppingBagPercent24Regular style={{ marginBottom: '5px' }} /><div>20% Extra Off</div></div>
                            </div>
                            <div className={styles.offer}>
                                <div className={styles.offerDisc}><ShoppingBagPercent24Regular style={{ marginBottom: '5px' }} /><div>15% Extra Off</div></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.actions}>
                            <Button className={styles.buy} icon={<ShoppingBagArrowLeft24Regular />} onClick={onBuy} appearance="primary">Buy Now</Button>
                            {/* <Button className={styles.cart} icon={<ShoppingBag24Regular />}>Add To Cart</Button> */}
                            {!inCart && <Button icon={<ShoppingBag24Regular />} onClick={onCartBtnClick} className={styles.cart}>
                                Add To Cart
                            </Button>}
                            {inCart && <Button appearance='subtle' icon={<ShoppingBag24Regular />} onClick={onCartBtnClick} className={styles.cart}>
                                Added To Cart !
                            </Button>}
                        </div>
                    </div>


                </div>
            </div>
            <div className={styles.reviewsSection} id='reviews'>
                <Reviews id={id ?? ""} />
            </div>
        </Layout>
    )
}

export default Product

const useStyles = makeStyles({
    buy: { marginRight: '10px' },
    cart: {},
    offer: {
        cursor: 'pointer',
        height: '100px', width: '100px', boxShadow: tokens.shadow4, backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.borderRadius(tokens.borderRadiusLarge),
        // ...shorthands.margin(0, '10px'),
        marginRight: '10px',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    offerDisc: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    },
    offerHeading: { display: 'flex', justifyContent: 'start', alignItems: 'center', ...shorthands.padding('10px') },
    offers: { display: 'flex', justifyContent: 'start', alignItems: 'baseline' },
    rating: {
        marginTop: '10px',
        display: 'flex', justifyContent: 'start', alignItems: 'baseline'
    },
    reviews: {
        color: tokens.colorNeutralForeground3,
        marginLeft: '10px'
    },
    reviewsSection: {},
    discount: {
        color: tokens.colorPaletteCranberryBorderActive,
        marginRight: '10px'
    },
    detailsMain: {
        display: 'flex', justifyContent: 'start', alignItems: 'start',
        width: '100%',
    },
    img: {
        minWidth: '40%',

        ...shorthands.padding('10px', '30px')
    },
    curr: { fontSize: '14px', marginRight: "4px" },
    alert: {
        backgroundColor: tokens.colorStatusWarningBackground2,
        marginBottom: '20px',
        boxShadow: tokens.shadow2,
        marginTop: '20px',
        // opacity: 0.8
    },
    alertSuccess: {
        // backgroundColor: tokens.colorPaletteLightGreenBackground2,
        marginBottom: '20px',
        // boxShadow: 'unset',
        marginTop: '20px',
        boxShadow: tokens.shadow2,
        // opacity: 0.8
    },
    imgMain: {
        maxHeight: '400px'
    },
    mrp: {
        color: tokens.colorNeutralForeground3,
        marginLeft: '10px'
    },
    details: {
        details: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        // paddingRight:'200px',

    },
    actions: { display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '30px' },

    desc: {
        marginTop: '15px',
        color: tokens.colorNeutralForeground1Hover,
        width: '80%'
    },
    sold: {
        marginTop: '15px',
        color: tokens.colorNeutralForeground1Hover,
        width: '80%'
    },
    category: {
        backgroundColor: tokens.colorBrandBackground2,
        ...shorthands.padding('3px', '8px'),
        ...shorthands.margin('10px', 0),
        ...shorthands.borderRadius('50px')
    },
    tag: {
        backgroundColor: tokens.colorPalettePeachBackground2,
        color: tokens.colorPaletteDarkOrangeForeground2,
        ...shorthands.padding('3px', '8px'),
        ...shorthands.margin('10px'),
        ...shorthands.borderRadius('50px')
    }
});