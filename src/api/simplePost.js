import { api } from "@api/api";

export const apiTags = {
    phone_enter: "accounts/login",
    get_token: "accounts/get_token",
};

export async function simplePost(path, data) {
    if (path && data) {
        const response = await api.post(path, data);
        return response.data;
    }
    else {
        console.log("Неверная форма запроса")
        return null
    }
}
export default simplePost