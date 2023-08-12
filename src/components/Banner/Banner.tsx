import { Image, makeStyles } from "@fluentui/react-components";
import { ArrowCircleLeft24Regular, ArrowCircleRight24Regular } from '@fluentui/react-icons';
import Carousel from 'nuka-carousel';
import b1 from '../../assets/banner2.jpg';
import b2 from '../../assets/banner3.jpg';
const useStyles = makeStyles({
    banner: {
        width: '100%',
        
    },

});
function Banner() {
    const styles = useStyles();
    return (
        <div className={styles.banner}>
            <Carousel wrapAround={true} autoplayInterval={2000} autoplay pauseOnHover defaultControlsConfig={{
                pagingDotsStyle: { margin: 10, fontSize: '1.2rem' },
                prevButtonText: <ArrowCircleLeft24Regular />, nextButtonText: <ArrowCircleRight24Regular />
            }}>
                <Image src={b1} height={700} width={'100%'} />
                <Image src={b2} height={700} width={'100%'} />
            </Carousel>
        </div>
    )
}

export default Banner