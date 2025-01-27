import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { simplePost, apiTags as postTags } from '@api/simplePost';
import { simplePut, apiTags as putTags } from '@api/simplePut';
import { useState } from 'react';
import getSvg from '@images/svg';

const BoquetPopup = ({ boquet, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            name: boquet?.name || '',
            price: boquet?.price || '',
            oldPrice: boquet?.oldPrice || 0,
            promo: boquet?.promo || false,
            cover: boquet?.cover || '',
            description: boquet?.description || '',
            composition: boquet?.composition?.replace(/\\n/g, '\n') || ''
        }
    });

    const isPromo = watch('promo');

    const { cross } = getSvg();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formattedData = {
            ...data,
            composition: data.composition.replace(/\n/g, '\\n'),
            link: data.name.toLowerCase().replace(/ /g, '-')
        };

        try {
            let response;
            if (boquet) {
                response = await simplePut(putTags.updateBoquet(boquet.id), formattedData);
            } else {
                response = await simplePost(postTags.addBoquet, formattedData);
            }
            
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
                    <h2 className="auth-popup__title title-m">
                        {boquet ? 'Редактировать букет' : 'Добавить букет'}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="f-column gap-10">
                        <div className="auth-popup__input-holder">
                            <input
                                {...register('name', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Название букета"
                            />
                        </div>

                        <div className="auth-popup__input-holder">
                            <input
                                {...register('price', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                type="number"
                                placeholder="Цена"
                            />
                        </div>

                        <div className="auth-popup__input-holder">
                            <input
                                {...register('oldPrice')}
                                className={`auth-popup__input text-m ${!isPromo ? 'input-disabled' : ''}`}
                                type="number"
                                placeholder="Старая цена"
                                disabled={!isPromo}
                            />
                        </div>

                        <div className="auth-popup__input-holder">
                            <input
                                {...register('cover', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="URL обложки"
                            />
                        </div>

                        <div className="auth-popup__checkbox-holder f-row gap-10">
                            <input
                                {...register('promo')}
                                type="checkbox"
                                id="promo"
                            />
                            <label htmlFor="promo" className="text-m">Акция</label>
                        </div>

                        <div className="auth-popup__input-holder">
                            <textarea
                                {...register('description', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Описание"
                                rows={3}
                            />
                        </div>

                        <div className="auth-popup__input-holder">
                            <textarea
                                {...register('composition', { required: 'Обязательное поле' })}
                                className="auth-popup__input text-m"
                                placeholder="Состав (каждый элемент с новой строки)"
                                rows={5}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`auth-popup__submit profile-button ${isLoading ? 'button-inactive' : ''}`}
                            disabled={isLoading}
                        >
                            {boquet ? 'Сохранить изменения' : 'Добавить букет'}
                        </button>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default BoquetPopup;