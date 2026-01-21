import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/review`;

// Create a review
async function createReview(bookId, rating, comment) {
  const token = window.localStorage.getItem('token');
  const response = await axios.post(
    BASE_URL,
    { book: bookId, rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get all reviews for a specific book
async function getBookReviews(bookId) {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  return response.data;
}

export { createReview, getBookReviews };
