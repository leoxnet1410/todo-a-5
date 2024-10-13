import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const ApiClient = {
  User: {
    create: async (data) => {
      const res = await axios.post(`${API_URL}/users`, data);
      return res.data;
    },
    login: async (data) => {
      const res = await axios.post(`${API_URL}/login`, data);
      return res.data;
    }
  },

  Category: {
    create: async (data) => {
      try {
        const res = await axios.post(`${API_URL}/categories`, data);
        return res.data;
      } catch (error) {
        console.error('Error creando categoría:', error);
        throw error;
      }
    },
    getAll: async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        return res.data;
      } catch (error) {
        console.error('Error obteniendo categorías:', error);
        throw error;
      }
    }
  },

  Publication: {
    create: async (formData) => {
      try {
        const res = await axios.post(`${API_URL}/publications`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data;
      } catch (error) {
        console.error('Error creando publicación:', error);
        throw error;
      }
    },
    getByCategoryName: async (categoryName) => { // Cambié el nombre de la función aquí
      const response = await fetch(`${API_URL}/publications/category/${categoryName}`); // Asegúrate de que la URL sea correcta
      if (!response.ok) {
        throw new Error('Error fetching publications');
      }
      return await response.json();
    },getById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}/publications/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error obteniendo publicación por ID:', error);
        throw error;
      }
    },
  }
}
