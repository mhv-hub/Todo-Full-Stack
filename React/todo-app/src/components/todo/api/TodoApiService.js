import { apiClient } from "./ApiClient";

export const GetAllTodoListForUsername = (username) => apiClient.get(`/user/${username}/todos`);
export const DeleteTodoByUsernameAndId = (username, id) => apiClient.delete(`/user/${username}/todo/delete/${id}`);
export const GetTodoById = (username, id) => apiClient.get(`/user/${username}/todo/${id}`);
export const updateTodoById = (username, id, todo) => apiClient.put(`/user/${username}/todo/update/${id}`, todo);
export const createTodo = (username, todo) => apiClient.post(`/user/${username}/todo/add`, todo);