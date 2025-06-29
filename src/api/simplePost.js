import { api } from '@api/api'

export const apiTags = {
	email_enter: 'accounts/checkEmail',
	get_token: 'accounts/getToken',
	register: 'accounts/createAccount',
	editName: 'accounts/editName',
	editPhone: 'accounts/editPhone',
	editPassword: 'accounts/editPassword',
	editPasswordWithoutToken: 'accounts/editPasswordWithoutToken',
	addOrder: 'orders/addOrder',
	addReview: 'reviews/addReview',
	adminLogin: 'admin/login',
	addBoquet: 'boquets/addBoquet',
	addAddress: 'addresses/addAddress',
	addNews: 'news/addNews',
}

export async function simplePost(path, data) {
	if (path && data) {
		const response = await api.post(path, data)
		return response.data
	} else {
		console.log('Неверная форма запроса')
		return null
	}
}
export default simplePost
