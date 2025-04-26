import { apiTags as deleteTags, simpleDelete } from '@api/simpleDelete'
import { apiTags as getTags, simpleGet } from '@api/simpleGet'
import NewsPopup from '@components/popups/NewsPopup'
import '@styles/pages/AdminPage.scss'
import { useState } from 'react'
import useSWR from 'swr'

const NewsModule = () => {
	const {
		data: news,
		error,
		isLoading,
		mutate,
	} = useSWR(getTags.getNews, simpleGet)
	const [selectedNews, setSelectedNews] = useState(null)
	const [isPopupOpen, setIsPopupOpen] = useState(false)

	const handleDelete = async id => {
		if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
			try {
				const response = await simpleDelete(deleteTags.deleteNews(id))
				if (response.code === 200) {
					mutate()
				}
			} catch (error) {
				console.error('Error deleting news:', error)
			}
		}
	}

	const handleEdit = newsItem => {
		setSelectedNews(newsItem)
		setIsPopupOpen(true)
	}

	const handleAdd = () => {
		setSelectedNews(null)
		setIsPopupOpen(true)
	}

	return (
		<div className='news-module'>
			<div className='news-module__header'>
				<h2 className='news-module__title title-l'>Управление новостями</h2>
				<button className='news-module__add profile-button' onClick={handleAdd}>
					Добавить новость
				</button>
			</div>
			<div className='news-module__table-wrapper'>
				<table className='news-module__table'>
					<thead>
						<tr>
							<th>Изображение</th>
							<th>Заголовок</th>
							<th>Текст</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{news?.map(newsItem => (
							<tr key={newsItem.id}>
								<td>
									<div className='news-module__image-wrapper'>
										<img
											src={newsItem.imgUrl}
											alt={newsItem.title}
											className='news-module__image'
										/>
									</div>
								</td>
								<td>{newsItem.title}</td>
								<td>
									<div className='news-module__text'>{newsItem.text}</div>
								</td>
								<td>
									<div className='news-module__actions f-column gap-10'>
										<button
											className='news-module__edit profile-button'
											onClick={() => handleEdit(newsItem)}
										>
											Изменить
										</button>
										<button
											className='news-module__delete profile-button'
											onClick={() => handleDelete(newsItem.id)}
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
				<NewsPopup
					news={selectedNews}
					onClose={() => setIsPopupOpen(false)}
					onSuccess={() => {
						setIsPopupOpen(false)
						mutate()
					}}
				/>
			)}
		</div>
	)
}

export default NewsModule
