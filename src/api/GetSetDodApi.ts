import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



export const GetBackendApi = () => {
    const getBackendApi = process.env.REACT_APP_DB_GET_KEY as string; // Type assertion

    if (!getBackendApi) {
        throw new Error("REACT_APP_DB_GET_KEY is not defined");
    }

    return useQuery({
        queryKey: ['getBackend'],
        queryFn: async () => {
            const newData = await axios.get(getBackendApi);
            return newData.data;
        }
    });
}

export const GetTodaysDrinkOfTheDay = () => {
    const getLastDodEntry = process.env.REACT_APP_DB_LAST_KEY as string;

    if (!getLastDodEntry) {
        throw new Error("REACT_APP_DB_LASK_KEY is not defined")
    }

    return useQuery({
        queryKey: ['getCurrentDod'],
        queryFn: async () => {
            const newData = await axios.get(getLastDodEntry)
            return newData.data
        }
    })
}
