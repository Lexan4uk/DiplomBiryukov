import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { simplePost, apiTags } from '@api/simplePost';
import { useState } from 'react';
import getSvg from '@images/svg';

const AddressPopup = ({ onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { cross } = getSvg();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await simplePost(apiTags.addAddress, data);
            if (response.code === 200) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <div className="auth-popup_bg">
                <div className="auth-popup__main">
                    <button className="auth-popup__close-btn simple-button" onClick={onClose}>
                        {cross()}
                    </button>
                    <h2 className="auth-popup__title title-m">Добавить адрес</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="f-column gap-10">
                        <div className="auth-popup__input-holder">
                            <input
                                {...register('name', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Имя"
                            />
                        </div>
                        <div className="auth-popup__input-holder">
                            <input
                                {...register('phone', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Телефон"
                            />
                        </div>
                        <div className="auth-popup__input-holder">
                            <input
                                {...register('address1', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Адрес"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className={`auth-popup__submit profile-button ${isLoading ? 'button-inactive' : ''}`}
                            disabled={isLoading}
                        >
                            Добавить
                        </button>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default AddressPopup;