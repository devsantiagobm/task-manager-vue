import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) throw new Error("The API URL must be obligatory")

export const fetcher = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})