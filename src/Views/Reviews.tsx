import { Body1, Button, Field, Textarea, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { AppsListDetail24Regular } from '@fluentui/react-icons';
import { useMemo } from 'react';
import { Rating } from 'react-simple-star-rating';
import NoItem from '../components/NoItem/NoItem';
import ReviewCard from '../components/Review/ReviewCard';
import { products } from '../mock/products';
interface IReviewsProps{
    id: string
}
function Reviews(props: IReviewsProps) {
    const { id} = props;
    const product = useMemo(() => {
        return products.find(i => i._id === id) ?? null;
    }, [id]);

const styles = useStyles()
  return (
    <div className="">
        <div className="">
            <Field label={"Add your review"}>
                <Textarea size='large' placeholder='I liked/disliked this product/service because...' appearance='filled-darker-shadow'></Textarea>
            </Field>
            <div className={styles.rating}>
                <Body1>Your rating </Body1>
                <Rating size={20} initialValue={0} />
            </div>
            <Button className={styles.addReview} appearance='secondary' icon={<AppsListDetail24Regular/>}>Add review</Button>
        </div>
        <div className="">
            {(!product?.reviews || product?.reviews?.length === 0) && <NoItem type="reviews"/> }
            {product?.reviews.map(review=>{
                return <ReviewCard review={review}/>
            })}
        </div>
    </div>
  )
}

export default Reviews

const useStyles = makeStyles({
    addReview:{...shorthands.margin('10px',0)},
    rating:{marginTop:'10px'},
    noItems:{
        boxShadow: tokens.shadow2,
    }
});