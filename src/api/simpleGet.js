import { api } from "@api/api";

export const apiTags = {
    getAddresses: "addresses/getAddresses",
    getBoquetCompleted: "boquets/getBoquetCompleted",
    getBoquetConstructor: "boquets/getBoquetConstructor",
    getBoquetByLink: (link) => `boquets/getBoquetByLink/${link}`,
    getReviews: "reviews/getReviews",
    getOrdersDone: (name) => `orders/getOrdersDone/${name}`,
};

export async function simpleGet(params) {
    if (params) {
        const response = await api.get(params);
        return response.data;
    }
    else {
        console.log("Неверная форма запроса")
        return null
    }

}
export default simpleGet