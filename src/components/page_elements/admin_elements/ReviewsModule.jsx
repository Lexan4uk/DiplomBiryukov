import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags } from '@api/simpleGet';
import getSvg from '@images/svg';
import { simpleDelete, apiTags as deleteTags } from '@api/simpleDelete';
import { simplePatch, apiTags as patchTags } from '@api/simplePatch';

const ReviewsModule = () => {
    const { data: reviews, error, isLoading, mutate } = useSWR(apiTags.getReviews, simpleGet);
    const { star } = getSvg();

    const sortReviews = (reviews) => {
        return [...reviews].sort((a, b) => {
            if (a.approved === b.approved) return 0;
            return a.approved ? 1 : -1;
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            try {
                const response = await simpleDelete(deleteTags.deleteReview(id));
                if (response.code === 200) {
                    mutate();
                }
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await simplePatch(patchTags.approveReview(id));
            if (response.code === 200) {
                mutate();
            }
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    return (
        <div className="reviews-module">
            <div className="reviews-module__header">
                <h2 className="reviews-module__title title-l">Отзывы</h2>
            </div>
            <div className="reviews-module__table-wrapper">
                <table className="reviews-module__table">
                    <thead>
                        <tr>
                            <th>Клиент</th>
                            <th>Букеты</th>
                            <th>Отзыв</th>
                            <th>Оценка</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews && sortReviews(reviews).map((review) => (
                            <tr key={review.id}>
                                <td>{review.clientName}</td>
                                <td>{review.boquetName}</td>
                                <td>
                                    <div className="reviews-module__text">
                                        {review.text}
                                    </div>
                                </td>
                                <td>{review.rating}</td>
                                <td>
                                    <span className={`reviews-module__status ${review.approved ? 'reviews-module__status_approved' : ''}`}>
                                        {review.approved ? 'Одобрен' : 'На проверке'}
                                    </span>
                                </td>
                                <td>
                                    <div className="reviews-module__actions f-column gap-10">
                                        {!review.approved && (
                                            <button 
                                                className="reviews-module__approve profile-button"
                                                onClick={() => handleApprove(review.id)}
                                            >
                                                Одобрить
                                            </button>
                                        )}
                                        <button 
                                            className="reviews-module__delete profile-button"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewsModule;