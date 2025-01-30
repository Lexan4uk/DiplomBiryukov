import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags as getTags } from '@api/simpleGet';
import { simpleDelete, apiTags as deleteTags } from '@api/simpleDelete';
import { simplePatch, apiTags as patchTags } from '@api/simplePatch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const OrdersModule = () => {
    const { data: orders, error, isLoading, mutate } = useSWR(getTags.getOrders, simpleGet);

    const sortOrders = (orders) => {
        const orderPriority = {
            'Pending': 0,
            'Done': 1,
            'Reviewed': 2
        };

        return [...orders].sort((a, b) => 
            orderPriority[a.orderState] - orderPriority[b.orderState]
        );
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
            try {
                const response = await simpleDelete(deleteTags.deleteOrder(id));
                if (response.code === 200) {
                    mutate();
                }
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const handleStatusUpdate = async (id) => {
        try {
            const response = await simplePatch(patchTags.updateOrderToDone(id));
            if (response.code === 200) {
                mutate();
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="orders-module">
            <div className="orders-module__header">
                <h2 className="orders-module__title title-l">Заказы</h2>
            </div>
            <div className="orders-module__table-wrapper">
                <table className="orders-module__table">
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Клиент</th>
                            <th>Телефон</th>
                            <th>Букеты</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && sortOrders(orders).map((order) => (
                            <tr key={order.id}>
                                <td>
                                    <div className="orders-module__swiper-wrapper">
                                        <Swiper
                                            slidesPerView={1}
                                            className="orders-module__swiper"
                                        >
                                            {order.cover.split(', ').map((url, index) => (
                                                <SwiperSlide key={index}>
                                                    <img 
                                                        src={url} 
                                                        alt={`Букет ${index + 1}`} 
                                                        className="orders-module__image"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </td>
                                <td>{order.clientName}</td>
                                <td>{order.clientPhone}</td>
                                <td>{order.boquetName}</td>
                                <td>{order.boquetPrice} ₽</td>
                                <td>{order.orderState}</td>
                                <td>
                                    <div className="orders-module__actions f-column gap-8">
                                        {order.orderState === "Pending" && (
                                            <button 
                                                className="orders-module__done profile-button"
                                                onClick={() => handleStatusUpdate(order.id)}
                                            >
                                                Подтвердить
                                            </button>
                                        )}
                                        <button 
                                            className="orders-module__delete profile-button"
                                            onClick={() => handleDelete(order.id)}
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

export default OrdersModule;