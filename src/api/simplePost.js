import { api } from "@api/api";

export const apiTags = {
    email_enter: "accounts/login",
    get_token: "accounts/getToken",
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