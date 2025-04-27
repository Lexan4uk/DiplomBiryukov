import { apiTags as postTags, simplePost } from '@api/simplePost'
import { apiTags as putTags, simplePut } from '@api/simplePut'
import { Dialog } from '@headlessui/react'
import getSvg from '@images/svg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const NewsPopup = ({ news, onClose, onSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: news?.title || '',
			imgUrl: news?.imgUrl || '',
			text: news?.text || '',
			priority: news?.priority || '',
		},
	})

	const { cross } = getSvg()
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async data => {
		setIsLoading(true)
		try {
			// Преобразуем priority в число или null
			const formattedData = {
				...data,
				priority: data.priority === '' ? null : parseInt(data.priority),
			}

			let response
			if (news) {
				response = await simplePut(putTags.updateNews(news.id), formattedData)
			} else {
				response = await simplePost(postTags.addNews, formattedData)
			}

			if (response.code === 200) {
				onSuccess()
			}
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={true} onClose={onClose}>
			<div className='auth-popup_bg'>
				<div className='auth-popup__main'>
					<button
						className='auth-popup__close-btn simple-button'
						onClick={onClose}
					>
						{cross()}
					</button>
					<h2 className='auth-popup__title title-m'>
						{news ? 'Редактировать новость' : 'Добавить новость'}
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='auth-popup__form f-column gap-10'
					>
						<div className='auth-popup__input-block f-column gap-4'>
							<input
								{...register('title', { required: 'Заголовок обязателен' })}
								className='auth-popup__input text-m'
								type='text'
								placeholder='Заголовок новости'
							/>
							{errors.title && (
								<span className='auth-popup__error text-s text-red'>
									{errors.title.message}
								</span>
							)}
						</div>
						<div className='auth-popup__input-block f-column gap-4'>
							<input
								{...register('imgUrl', {
									required: 'URL изображения обязателен',
								})}
								className='auth-popup__input text-m'
								type='text'
								placeholder='URL изображения'
							/>
							{errors.imgUrl && (
								<span className='auth-popup__error text-s text-red'>
									{errors.imgUrl.message}
								</span>
							)}
						</div>
						<div className='auth-popup__input-block f-column gap-4'>
							<input
								{...register('priority', {
									validate: {
										isValidNumber: value => {
											if (value === '') return true
											const num = parseInt(value)
											return (
												(!isNaN(num) && num >= 0) ||
												'Приоритет должен быть положительным числом'
											)
										},
									},
								})}
								className='auth-popup__input text-m'
								type='text'
								placeholder='Приоритет (необязательно)'
							/>
							{errors.priority && (
								<span className='auth-popup__error text-s text-red'>
									{errors.priority.message}
								</span>
							)}
						</div>
						<div className='auth-popup__input-block f-column gap-4'>
							<textarea
								{...register('text', { required: 'Текст новости обязателен' })}
								className='auth-popup__textarea text-m'
								placeholder='Текст новости'
								rows={5}
							/>
							{errors.text && (
								<span className='auth-popup__error text-s text-red'>
									{errors.text.message}
								</span>
							)}
						</div>
						<button
							type='submit'
							className={`auth-popup__submit profile-button ${
								isLoading ? 'button-inactive' : ''
							}`}
							disabled={isLoading}
						>
							{news ? 'Сохранить' : 'Добавить'}
						</button>
					</form>
				</div>
			</div>
		</Dialog>
	)
}

export default NewsPopup
