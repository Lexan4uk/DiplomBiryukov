import { api } from "@api/api";

export const apiTags = {
    menu_categories: "menu_categories",
    menu: "products/menu",
    promotions: "promotion",
    promotionById: (id) => `promotion/${id}`,
    productById: (id) => `products/menu/${id}`,
    city: "delivery/city/filter_city",
    deliver_points: "delivery/delivery_point/get"
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