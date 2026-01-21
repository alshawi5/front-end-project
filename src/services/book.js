import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;

async function getAllBooks() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

async function getBookById(bookId) {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  return response.data;
}

async function createBook(bookData) {
  const token = window.localStorage.getItem('token');
  const response = await axios.post(BASE_URL, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function updateBook(bookId, bookData) {
  const token = window.localStorage.getItem('token');
  const response = await axios.put(`${BASE_URL}/${bookId}`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function deleteBook(bookId) {
  const token = window.localStorage.getItem('token');
  const response = await axios.delete(`${BASE_URL}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
