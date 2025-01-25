import '@styles/popups/ReviewPopup.scss';
import { Dialog } from '@headlessui/react'
import getSvg from '@images/svg'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags as getTags } from '@api/simpleGet'
import { simplePost, apiTags as postTags } from '@api/simplePost'
import useAuth from '@scripts/custom_hooks/useAuth';

const ReviewPopup = ({ state, setState }) => {
    const [step, setStep] = useState("select");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reviewData, setReviewData] = useState({
        rating: 1, // Default to 1 star
        text: ""
    });

    // Reset data when popup closes
    useEffect(() => {
        if (!state) {
            setStep("select");
            setSelectedOrder(null);
            setReviewData({
                rating: 1,
                text: ""
            });
        }
    }, [state]);

    const { accData } = useAuth();
    const { data: possibleOrders, error: pError, isLoading: pIsLoading } = 
        useSWR(getTags.getOrdersDone(accData.name), simpleGet);

    const {
        cross,
        star,
        arrow_left
    } = getSvg()

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        setStep("review");
    }

    const handleReviewSubmit = async () => {
        const orderData = {
            clientName: accData.name,
            boquetName: selectedOrder.boquetName,
            text: reviewData.text,
            orderId: selectedOrder.id,
            rating: reviewData.rating
        };

        try {
            const response = await simplePost(postTags.addReview, orderData);
            if (response.code === 200) {
                setState(false);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    }

    const handleBack = () => {
        setStep("select");
        setSelectedOrder(null);
        setReviewData({
            rating: 1,
            text: ""
        });
    };

    return (
        <Dialog open={state} onClose={() => setState(false)}>
            <div className="review-popup_bg f-column gap-10">
                <div className="review-popup__main f-column">
                    {step === "review" && (
                        <button 
                            className="review-popup__back-btn simple-button" 
                            onClick={handleBack}
                        >
                            {arrow_left("var(--gray-text-inactive)", undefined, undefined, "review-popup__back-icon")}
                        </button>
                    )}
                    <button className="review-popup__close-btn simple-button" onClick={() => setState(false)}>
                        {cross("var(--gray-text-inactive)")}
                    </button>
                    <h2 className="review-popup__title title-m">
                        {step === "select" ? "Выберите заказ" : "Оставьте отзыв"}
                    </h2>

                    {step === "select" && (
                        <div className="review-popup__input-block f-column gap-10">
                            {possibleOrders?.data?.length ? (
                                possibleOrders.data.map((order, index) => (
                                    <button 
                                        key={index}
                                        className="review-popup__order-btn profile-button"
                                        onClick={() => handleOrderSelect(order)}
                                    >
                                        {order.boquetName}
                                    </button>
                                ))
                            ) : (
                                <p className="review-popup__empty-text text-m text-center">
                                    Нет доступных товаров для отзыва
                                </p>
                            )}
                        </div>
                    )}

                    {step === "review" && (
                        <div className="review-popup__input-block f-column gap-10">
                            <div className="review-popup__rating f-row gap-4">
                                {[1,2,3,4,5].map((rating) => (
                                    <button 
                                        key={rating}
                                        className="simple-button"
                                        onClick={() => setReviewData(prev => ({...prev, rating}))}
                                    >
                                        {star(
                                            rating <= reviewData.rating ? "var(--green)" : "var(--gray-text-inactive)",
                                            15,
                                            16
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="review-popup__input-holder">
                                <textarea 
                                    className="review-popup__input text-m"
                                    value={reviewData.text}
                                    onChange={(e) => setReviewData(prev => ({...prev, text: e.target.value}))}
                                    placeholder="Ваш отзыв"
                                />
                            </div>
                            <button 
                                className="review-popup__submit-button profile-button"
                                onClick={handleReviewSubmit}
                            >
                                Отправить отзыв
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    )
}

export default ReviewPopup