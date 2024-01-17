import axios from 'axios';

const baseUrl = "http://localhost:3001";

export const getAllTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks`, { headers: { 'Cache-Control': 'no-store' } });
    return res.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const res = await axios.post(`${baseUrl}/tasks`, todo, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const editTodo = async (todo) => {
  try {
    const res = await axios.put(`${baseUrl}/tasks/${todo.id}`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error editing todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${baseUrl}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
