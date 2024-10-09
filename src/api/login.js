import { api } from "@api/api";

export async function login() {
    const response = await api.get("accounts/login");
    return response.data;
}