import { api } from "@api/api";

export const apiTags = {
    updateOrderToDone: (id) => `orders/updateToDone/${id}`,
    approveReview: (id) => `reviews/approveReview/${id}`,
};

export async function simplePatch(path) {
    if (path) {
        const response = await api.patch(path);
        return response.data;
    }
    else {
        console.log("Неверная форма запроса")
        return null
    }
}
export default simplePatch