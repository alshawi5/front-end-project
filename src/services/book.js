import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;

// Get all books (public)
async function getAllBooks() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

// Get single book by ID (public)
async function getBookById(bookId) {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  return response.data;
}

// Create a book (admin only)
async function createBook(bookData) {
  const token = window.localStorage.getItem('token');
  const response = await axios.post(BASE_URL, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Update a book (admin only)
async function updateBook(bookId, bookData) {
  const token = window.localStorage.getItem('token');
  const response = await axios.put(`${BASE_URL}/${bookId}`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Delete a book (admin only)
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
