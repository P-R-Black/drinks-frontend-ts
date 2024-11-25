import { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface headers {
    Authorization: string;
    'Content-type': string;
}

type FetchPaginatedDataParams = {
    queryKey: [string, Record<string, string>]; // A tuple with a string (URL) and an object (headers)
    maxItems?: number; // Optional maxItems parameter, defaults to Infinity
};


// const drinksApi = process.env.REACT_APP_PRODUCTION_DRINK_PUBLIC_KEY
const cocktailBaseAlcohol = process.env.REACT_APP_PUBLIC_BASE_ALCOHOL
const drinksAPIKeyDev = process.env.REACT_APP_PRODUCTION_KEY


export const FetchAlcoholTypes = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/alcohol-types', {
            headers: {
                'Authorization': `Api-Key ${drinksAPIKeyDev}`,
                'Content-Type': 'application/json',
            },
        });

        // Handle the successful response
        return response.data;

    } catch (error) {
        // Handle any errors
        if (axios.isAxiosError(error)) {
            console.error('Error fetching alcohol types:', error.message);
            if (error.response) {
                console.error('Server error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
    }
};


const AxiosFetch = async (endpoint: string) => {
    console.log('AxiosFetch hit')
    const response = await axios.get('https://drinksapi.paulrblack.com/api/v1/' + endpoint, {
        headers: {
            'Authorization': `Api-Key ${drinksAPIKeyDev}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};



export const AllAlcoholType = () => {
    return useQuery({
        queryKey: ['alcoholTypes'], // Unique query key
        queryFn: async () => AxiosFetch('all-alcohol-types'),
        // queryFn: AxiosFetch('alcohol-types'), // Function to fetch the data
        staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}

export const CocktailAlcoholType = () => {
    console.log('CocktailAlcoholType called')
    return useQuery({
        queryKey: ['cocktailAlcoholTypes'], // Unique query key
        queryFn: async () => AxiosFetch('cocktail-alcohol-types'),
        // queryFn: AxiosFetch('alcohol-types'), // Function to fetch the data
        staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}

export const ShotsAlcoholType = () => {
    return useQuery({
        queryKey: ['shotAlcoholTypes'], // Unique query key
        queryFn: async () => AxiosFetch('shot-alcohol-types'),
        // queryFn: AxiosFetch('alcohol-types'), // Function to fetch the data
        staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}

export const CocktailsByBaseDrinkApi = (alcoholBase: string) => {
    console.log('alcoholBase called', alcoholBase)
    return useQuery({
        queryKey: ['cocktailByBase', alcoholBase], // Unique query key
        queryFn: async () => AxiosFetch('cocktail/' + alcoholBase),
        refetchOnWindowFocus: true, // Automatically refetch when window is focused
        refetchOnMount: true, // Automatically refetch when component remounts
        // staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}


export const ShotsByBaseDrinkApi = (shotBase: string) => {
    return useQuery({
        queryKey: ['shotsByBase', shotBase], // Unique query key
        queryFn: async () => AxiosFetch('shot/' + shotBase),
        refetchOnWindowFocus: true, // Automatically refetch when window is focused
        refetchOnMount: true, // Automatically refetch when component remounts
        // staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}


export const MustKnowDrinkApi = () => {
    return useQuery({
        queryKey: ['mustKnows'], // Unique query key
        queryFn: async () => AxiosFetch('must-knows'),
        refetchOnWindowFocus: true, // Automatically refetch when window is focused
        refetchOnMount: true, // Automatically refetch when component remounts
        // staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}




export const AllDrinksApi = () => {
    return useQuery({
        queryKey: ['allDrinks'], // Unique query key
        queryFn: async () => AxiosFetch('drinks'),
        refetchOnWindowFocus: true, // Automatically refetch when window is focused
        refetchOnMount: true, // Automatically refetch when component remounts
        // staleTime: 60000, // Cache data for 1 minute (optional, can adjust)
        // cacheTime: 5 * 60 * 1000, // Keep the cache for 5 minutes (optional)
    });
}



export const FetchPaginatedData = async ({ queryKey, maxItems = Infinity }: FetchPaginatedDataParams) => {

    const [url, headers] = queryKey;
    let apiData: any[] = [];
    let nextUrl = url;


    while (nextUrl && apiData.length < maxItems) {
        try {
            const response = await axios.get(nextUrl, { headers });
            console.log('response', response)
            apiData = [...apiData, ...response.data.results];
            nextUrl = response.data.next;


        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching paginated data', error.message);
                // Handle the error based on its type
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Server error:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something else happened
                    console.error('Error', error.message);
                }
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }
    return apiData;
}

export const DrinksAPI = () => {

    const drinksApi = process.env.REACT_APP_PRODUCTION_DRINK_PUBLIC_KEY || ""; //Not sure why this isn't working anymore
    const drinksAPIKeyProduction = process.env.REACT_APP_PRODUCTION_KEY;


    const headers = {
        'Authorization': `Api-Key ${drinksAPIKeyProduction}`,
        'Content-type': 'application/json',
    }

    const initialQuery = useQuery({
        queryKey: ['initialData', { headers }],
        queryFn: () => FetchPaginatedData(
            {
                queryKey: ["https://drinksapi.paulrblack.com/api/v1/", headers],
                maxItems: 100,
            }),
        refetchOnWindowFocus: false,
    })

    const fullQuery = useQuery({
        queryKey: ['fullData', { headers }],
        queryFn: async () => FetchPaginatedData(
            {
                queryKey: ["https://drinksapi.paulrblack.com/api/v1/", headers],
                // onUpdate: handleUpdate
            }),
        enabled: initialQuery.isSuccess,
        initialData: initialQuery.data,
        refetchOnWindowFocus: false,
    });
    return {
        initialData: initialQuery.data,
        fullData: fullQuery.data,
        isLoading: initialQuery.isLoading || fullQuery.isLoading,
        isError: initialQuery.isError || fullQuery.isError,
    };

}

