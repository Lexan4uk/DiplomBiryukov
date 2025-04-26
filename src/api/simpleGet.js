import { api } from '@api/api'

export const apiTags = {
	getAddresses: 'addresses/getAddresses',
	getBoquetCompleted: 'boquets/getBoquetCompleted',
	getBoquetByLink: link => `boquets/getBoquetByLink/${link}`,
	getReviews: 'reviews/getReviews',
	getOrdersDone: name => `orders/getOrdersDone/${name}`,
	getOrders: 'orders/getOrders',
	getReviewsApproved: 'reviews/getReviewsApproved',
	getNews: 'news/getNews',
}

export async function simpleGet(params) {
	if (params) {
		const response = await api.get(params)
		return response.data
	} else {
		console.log('Неверная форма запроса')
		return null
	}
}
export default simpleGet
