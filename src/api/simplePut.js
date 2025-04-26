import { api } from '@api/api'

export const apiTags = {
	updateBoquet: id => `boquets/updateBoquet/${id}`,
	updateNews: id => `news/updateNews/${id}`,
}

export async function simplePut(path, data) {
	if (path && data) {
		const response = await api.put(path, data)
		return response.data
	} else {
		console.log('Неверная форма запроса')
		return null
	}
}

export default simplePut
