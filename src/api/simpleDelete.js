import { api } from '@api/api'

export const apiTags = {
	deleteBoquet: id => `boquets/deleteBoquet/${id}`,
	deleteAddress: id => `addresses/deleteAddress/${id}`,
	deleteOrder: id => `orders/deleteOrder/${id}`,
	deleteReview: id => `reviews/deleteReview/${id}`,
	deleteNews: id => `news/deleteNews/${id}`,
}

export async function simpleDelete(path) {
	if (path) {
		const response = await api.delete(path)
		return response.data
	} else {
		console.log('Неверная форма запроса')
		return null
	}
}

export default simpleDelete
