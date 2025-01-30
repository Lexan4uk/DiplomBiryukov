import '@styles/pages/Reviews.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { simpleGet, apiTags } from '@api/simpleGet'
import useSWR from 'swr';
import ReviewCard from '@components/page_elements/reviews_elements/ReviewCard';
import useAuth from '@scripts/custom_hooks/useAuth';
import { useState } from 'react';
import ReviewPopup from '@components/popups/ReviewPopup';

function Reviews() {
  const [reviewState, setReviewState] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < reviews?.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const {
    accData,
    isAuthorised
  } = useAuth();

  const { data: reviews, error: rError, isLoading: rIsLoading } = useSWR(apiTags.getReviewsApproved, simpleGet);

  return (
    <>
      <Header active={4} />
      <main className="reviews block-normalizer main-block f-column gap-16">
        <div className="reviews__introduction-block f-column gap-10">
          <div className="reviews__title-block f-row">
            <h1 className="reviews__page-title title-l">Отзывы наших клиентов</h1>
            {isAuthorised && (
              <button 
                className='reviews__add-review-btn profile-button' 
                onClick={() => setReviewState(true)}
              >
                Оставить отзыв
              </button>
            )}
          </div>
          <p className="reviews__page-desc text-l">Нам всегда интересно узнать, что вы думаете! Здесь собраны отзывы людей, которые уже заказывали у нас цветы. Они делятся своими впечатлениями, а мы стараемся стать еще лучше. Ваше мнение для нас очень важно, ведь оно вдохновляет нас радовать вас снова и снова. Оставляйте свои отзывы - мы будем рады услышать вашу историю!</p>
        </div>
        <div className="reviews__cards-holder f-column gap-16">
          {reviews?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((review, index) => (
            <ReviewCard
              key={index}
              data={review}
              imgPlace={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
        <div className="reviews__navigation f-row gap-16">
          <button 
            className={`reviews__nav-btn profile-button ${currentPage === 0 ? 'button-inactive' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Назад
          </button>
          <button 
            className={`reviews__nav-btn profile-button ${(currentPage + 1) * itemsPerPage >= reviews?.length ? 'button-inactive' : ''}`}
            onClick={handleNextPage}
            disabled={(currentPage + 1) * itemsPerPage >= reviews?.length}
          >
            Вперед
          </button>
        </div>
      </main>
      <Footer />
      <ReviewPopup state={reviewState} setState={setReviewState} />
    </>
  );
}

export default Reviews;
