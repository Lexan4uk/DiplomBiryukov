import '@styles/pages/Reviews.scss';
import getSvg from '@images/svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ReviewCard = ({ data, imgPlace = "right" }) => {
    const {
        quotes,
        star
    } = getSvg()
    console.log(data)
    const images = data?.order?.cover ? data.order.cover.split(", ") : [];

    return (
        <div className={`reviews__review-card f-row gap-10 ${imgPlace === 'left' ? 'reviews__review-card_left' : ''}`}>
            <div className="reviews__data-block f-column gap-10">
                <div className="reviews__name-block f-row gap-10">
                    <h2 className='reviews__name text-menu'>{data.clientName}</h2>
                    <span className='reviews__boquet-name text-m reviews__gray-text'>-</span>
                    <span className='reviews__boquet-name text-m reviews__gray-text'>{data.boquetName}</span>
                </div>

                <div className="reviews__stars-holder f-row gap-4">
                    {[...Array(data.rating)].map((_, index) => (
                        <div key={index} className="reviews__star">
                            {star()}
                        </div>
                    ))}
                </div>
                <p className='reviews__review text-l'>{data.text}</p>
                <div className="reviews__quotes">
                    {quotes()}
                </div>
            </div>
            <div className="reviews__img-block">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    className="reviews__swiper"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt={`review-${index}`} className="reviews__img" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewCard;
