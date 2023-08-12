import { Avatar, Body1Strong, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { useId } from 'react';
import { Rating } from 'react-simple-star-rating';
import { IReview } from '../../types/types';

interface IReviewCard {
    review: IReview
}

function ReviewCard(props: IReviewCard) {
    const { review } = props;
    const styles = useStyles();
    const id = useId();
    return (
        <div className={styles.reviewCardMain}>
            <div className={styles.persona}>
                <Avatar
                    color="colorful"
                    idForColor={id}
                    name={`${review?.comment[0]} ${review?.comment[1]}`}
                    aria-label="Guest"
                    style={{ marginRight: '10px' }}
                />
                <div><Body1Strong>Shubham Kulkarni</Body1Strong>
                    <div className={styles.rating}>
                        <Rating size={18} initialValue={review?.rating} readonly />
                    </div>

                    <div className={styles.content}>
                        {review?.comment}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ReviewCard

const useStyles = makeStyles({
    content: {},
    rating: {
        marginTop: '10px'
    },
    persona: {
        display: 'flex', justifyContent: 'start', alignItems: 'start'
    },
    reviewCardMain: {
        backgroundColor: tokens.colorNeutralBackground1, boxShadow: tokens.shadow4, ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.margin('10px', 0),
        ...shorthands.padding('15px'),
    },
})