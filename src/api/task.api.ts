import type { TaskResponse, TaskType } from "@/types/task.type";
import api from "./axiosInstance";

export async function fetchTaskFn(): Promise<TaskResponse[]> {
    const response = await api.get('/collections/task/records')
    return response.data.data
}

export async function createTaskFn(data: TaskType) {
    return await api.post('/collections/task/records', data)
}

export async function updateTaskFn(data: TaskType & { id: string }) {
    const { id, ...rest } = data
    return await api.put(`/collections/task/records/${id}`, rest)
}

export async function deleteTaskFn(id: string) {
    return await api.delete(`/collections/task/records/${id}`)
}
