import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = "https://bc018530d1a4.ngrok-free.app/demo/api/";

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"ngrok-skip-browser-warning": "true",
	},
});

// Generic GET request
export async function get<T>(
	endpoint: string,
	params?: object,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await api.get(endpoint, {
		params,
		...config,
	});
	return response.data;
}

// Generic POST request
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function post<T, D = any>(
	endpoint: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await api.post(endpoint, data, config);
	return response.data;
}

export default {
	get,
	post,
};
