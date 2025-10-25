import axios, { isAxiosError } from "axios";
import { toast } from 'react-toastify';

export const getCategories = async (): Promise<ICategory[] | null> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { withCredentials: true });
        toast.success(res.data.message)
        return res.data;
    } catch (err) {
        if (isAxiosError(err) && err.response?.data)
            toast.error(err.response.data.message)
        return null
    }
}