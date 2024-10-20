import { api } from "@api/api";

export const apiTags = {
    getAddresses: "addresses/getAddresses",
    getBoquetCompleted: "boquets/getBoquetCompleted",
    getBoquetConstructor: "boquets/getBoquetConstructor"
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