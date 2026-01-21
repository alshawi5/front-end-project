import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/borrow`;

// Borrow a book
async function borrowBook(bookId) {
  const token = window.localStorage.getItem('token');
  const response = await axios.post(
    BASE_URL,
    { book: bookId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get all borrows for logged-in user
async function getUserBorrows() {
  const token = window.localStorage.getItem('token');
  const response = await axios.get(`${BASE_URL}/my-borrows`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Update borrow (e.g., mark returned)
async function updateBorrow(borrowId, data) {
  const token = window.localStorage.getItem('token');
  const response = await axios.put(`${BASE_URL}/${borrowId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export { borrowBook, getUserBorrows, updateBorrow };
