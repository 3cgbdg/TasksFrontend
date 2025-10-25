import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';


export const createTask = async (task: taskCreate): Promise<boolean> => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, task, { withCredentials: true });
        toast.success(res.data.message)
        return true;
    } catch (err) {
        if (isAxiosError(err) && err.response?.data)
            toast.error(err.response.data.message)
        return false;
    }
}

export const deleteTask = async (taskId: string): Promise<boolean> => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${taskId}`, { withCredentials: true });
        toast.success(res.data.message)
        return true;
    } catch (err) {
        if (isAxiosError(err) && err.response?.data)
            toast.error(err.response.data.message)
        return false;
    }
}



export const getTasks = async (): Promise<ITask[] | void> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`, { withCredentials: true });
        return res.data as ITask[];
    } catch (err) {
        if (isAxiosError(err) && err.response?.data)
            toast.error(err.response.data.message)
    }
}

export const updateTaskStatus = async (taskId: string): Promise<boolean> => {
    try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${taskId}`, {}, { withCredentials: true });
        toast.success(res.data.message)
        return true;
    } catch (err) {
        if (isAxiosError(err) && err.response?.data)
            toast.error(err.response.data.message)
        return false;
    }
}