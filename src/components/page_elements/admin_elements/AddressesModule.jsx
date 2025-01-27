import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags as getTags } from '@api/simpleGet';
import { simpleDelete, apiTags as deleteTags } from '@api/simpleDelete';
import AddressPopup from '@components/popups/AddressPopup';

const AddressesModule = () => {
    const { data: addresses, error, isLoading, mutate } = useSWR(getTags.getAddresses, simpleGet);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот адрес?')) {
            try {
                const response = await simpleDelete(deleteTags.deleteAddress(id));
                if (response.code === 200) {
                    mutate();
                }
            } catch (error) {
                console.error('Error deleting address:', error);
            }
        }
    };

    return (
        <div className="addresses-module">
            <div className="addresses-module__header">
                <h2 className="addresses-module__title title-l">Адреса доставки</h2>
                <button 
                    className="addresses-module__add profile-button"
                    onClick={() => setIsPopupOpen(true)}
                >
                    Добавить адрес
                </button>
            </div>
            <div className="addresses-module__table-wrapper">
                <table className="addresses-module__table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Адрес</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addresses?.map((address) => (
                            <tr key={address.id}>
                                <td>{address.name}</td>
                                <td>{address.phone}</td>
                                <td>{address.address1}</td>
                                <td>
                                    <button 
                                        className="addresses-module__delete profile-button"
                                        onClick={() => handleDelete(address.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPopupOpen && (
                <AddressPopup 
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

export default AddressesModule;