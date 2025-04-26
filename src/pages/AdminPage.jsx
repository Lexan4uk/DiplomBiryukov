import AddressesModule from '@components/page_elements/admin_elements/AddressesModule'
import AdminAuth from '@components/page_elements/admin_elements/AdminAuth'
import BoquetsModule from '@components/page_elements/admin_elements/BoquetsModule'
import NewsModule from '@components/page_elements/admin_elements/NewsModule'
import OrdersModule from '@components/page_elements/admin_elements/OrdersModule'
import ReviewsModule from '@components/page_elements/admin_elements/ReviewsModule'
import '@styles/pages/AdminPage.scss'
import { useState } from 'react'

function AdminPage() {
	const [isAuth, setIsAuth] = useState(false)
	const [activeModule, setActiveModule] = useState('boquets')

	const renderModule = () => {
		switch (activeModule) {
			case 'boquets':
				return <BoquetsModule />
			case 'addresses':
				return <AddressesModule />
			case 'orders':
				return <OrdersModule />
			case 'reviews':
				return <ReviewsModule />
			case 'news':
				return <NewsModule />
			default:
				return <BoquetsModule />
		}
	}

	return (
		<main className='admin block-normalizer main-block'>
			{!isAuth ? (
				<AdminAuth setIsAuth={setIsAuth} />
			) : (
				<div className='admin__content'>
					<div className='admin__nav'>
						<button
							className={`admin__nav-btn ${
								activeModule === 'boquets' ? 'admin__nav-btn_active' : ''
							}`}
							onClick={() => setActiveModule('boquets')}
						>
							Букеты
						</button>
						<button
							className={`admin__nav-btn ${
								activeModule === 'addresses' ? 'admin__nav-btn_active' : ''
							}`}
							onClick={() => setActiveModule('addresses')}
						>
							Адреса
						</button>
						<button
							className={`admin__nav-btn ${
								activeModule === 'orders' ? 'admin__nav-btn_active' : ''
							}`}
							onClick={() => setActiveModule('orders')}
						>
							Заказы
						</button>
						<button
							className={`admin__nav-btn ${
								activeModule === 'reviews' ? 'admin__nav-btn_active' : ''
							}`}
							onClick={() => setActiveModule('reviews')}
						>
							Отзывы
						</button>
						<button
							className={`admin__nav-btn ${
								activeModule === 'news' ? 'admin__nav-btn_active' : ''
							}`}
							onClick={() => setActiveModule('news')}
						>
							Новости
						</button>
					</div>
					<div className='admin__module'>{renderModule()}</div>
				</div>
			)}
		</main>
	)
}

export default AdminPage
