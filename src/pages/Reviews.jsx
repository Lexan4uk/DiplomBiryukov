import '@styles/pages/Reviews.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { simpleGet, apiTags } from '@api/simpleGet'
import useSWR from 'swr';
import ReviewCard from '@components/page_elements/reviews_elements/ReviewCard';


function Reviews() {
  const { data: reviews, error: rError, isLoading: rIsLoading } = useSWR(apiTags.getReviews, simpleGet);

  return (
    <>
      <Header active={4} />
      <main className="reviews block-normalizer main-block f-column gap-16">
        <div className="reviews__introduction-block f-column gap-10">
          <h1 className="reviews__page-title title-l">Отзывы наших клиентов</h1>
          <p className="reviews__page-desc text-l">Нам всегда интересно узнать, что вы думаете! Здесь собраны отзывы людей, которые уже заказывали у нас цветы. Они делятся своими впечатлениями, а мы стараемся стать еще лучше. Ваше мнение для нас очень важно, ведь оно вдохновляет нас радовать вас снова и снова. Оставляйте свои отзывы - мы будем рады услышать вашу историю!</p>
        </div>
        <div className="reviews__cards-holder f-column gap-16">
          {reviews?.map((review, index) => (
            <ReviewCard
              key={index}
              data={review}
              imgPlace={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
}

export default Reviews;
