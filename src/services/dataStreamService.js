import axios from 'axios';
import { object } from 'yup';

const API_URL = 'http://localhost:8080/api/data-streaming';

export const dataStreamService = {
    // Subscribe to a topic
    subscribe: async (topic, token) => {
        try {
            const response = await axios.post(`${API_URL}/subscribe?topic=${topic}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error subscribing from topic:', error);
            throw error;
        }
    },
    
    // Unsubscribe from a topic
    unsubscribe: async (topic, token) => {
        try {
            const response = await axios.post(`${API_URL}/unsubscribe?topic=${topic}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error unsubscribing from topic:', error);
            throw error;
        }
    },

    // Get recent messages from a topic
    getRecentMessages: async (topic, token) => {
        try {
            const response = await axios.get(`${API_URL}/recent?topic=${topic}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting recent messages:', error);
            throw error;
        }
    }
}; 