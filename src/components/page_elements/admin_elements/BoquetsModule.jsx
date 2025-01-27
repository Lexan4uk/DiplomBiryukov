import '@styles/pages/AdminPage.scss';
import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags as getTags } from '@api/simpleGet';
import { simpleDelete, apiTags as deleteTags } from '@api/simpleDelete';
import BoquetPopup from '@components/popups/BoquetPopup';

const BoquetsModule = () => {
    const { data: boquets, error, isLoading, mutate } = useSWR(getTags.getBoquetCompleted, simpleGet);
    const [selectedBoquet, setSelectedBoquet] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот букет?')) {
            try {
                const response = await simpleDelete(deleteTags.deleteBoquet(id));
                if (response.code === 200) {
                    mutate();
                }
            } catch (error) {
                console.error('Error deleting boquet:', error);
            }
        }
    };

    const handleEdit = (boquet) => {
        setSelectedBoquet(boquet);
        setIsPopupOpen(true);
    };

    const handleAdd = () => {
        setSelectedBoquet(null);
        setIsPopupOpen(true);
    };

    return (
        <div className="boquets-module">
            <div className="boquets-module__header">
                <h2 className="boquets-module__title title-l">Управление букетами</h2>
                <button className="boquets-module__add profile-button" onClick={handleAdd}>
                    Добавить букет
                </button>
            </div>
            <div className="boquets-module__table-wrapper">
                <table className="boquets-module__table">
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Старая цена</th>
                            <th>Акция</th>
                            <th>Описание</th>
                            <th>Состав</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boquets?.map((boquet) => (
                            <tr key={boquet.id}>
                                <td>
                                    <img 
                                        src={boquet.cover} 
                                        alt={boquet.name} 
                                        className="boquets-module__image"
                                    />
                                </td>
                                <td>{boquet.name}</td>
                                <td>{boquet.price} ₽</td>
                                <td>{boquet.oldPrice || '-'} ₽</td>
                                <td>{boquet.promo ? 'Да' : 'Нет'}</td>
                                <td>
                                    <div className="boquets-module__description">
                                        {boquet.description}
                                    </div>
                                </td>
                                <td>
                                    <div className="boquets-module__composition">
                                        {boquet.composition}
                                    </div>
                                </td>
                                <td>
                                    <div className="boquets-module__actions f-column">
                                        <button className="boquets-module__edit profile-button" onClick={() => handleEdit(boquet)}>
                                            Изменить
                                        </button>
                                        <button 
                                            className="boquets-module__delete profile-button"
                                            onClick={() => handleDelete(boquet.id)}
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
            {isPopupOpen && (
                <BoquetPopup 
                    boquet={selectedBoquet}
                    onClose={() => setIsPopupOpen(false)}
                    onSuccess={() => {
                        setIsPopupOpen(false);
                        mutate();
                    }}
                />
            )}
        </div>
    );
};

export default BoquetsModule;