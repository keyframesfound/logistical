import axios from 'axios';
import { Item } from '../types/Item';

const isDevelopment = process.env.NODE_ENV === 'development';
const API_URL = isDevelopment 
    ? 'http://localhost:5000/api'
    : 'https://logistical-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const itemService = {
    getAllItems: async (): Promise<Item[]> => {
        const response = await api.get('/items');
        return response.data;
    },

    getItemById: async (id: string): Promise<Item> => {
        const response = await api.get(`/items/${id}`);
        return response.data;
    },

    createItem: async (item: Omit<Item, '_id' | 'qrCode' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
        const response = await api.post('/items', item);
        return response.data;
    },

    updateItem: async (id: string, item: Partial<Item>): Promise<Item> => {
        const response = await api.put(`/items/${id}`, item);
        return response.data;
    },

    deleteItem: async (id: string): Promise<void> => {
        await api.delete(`/items/${id}`);
    },
}; 