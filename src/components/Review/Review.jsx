import { useEffect, useState } from 'react';
import { createReview, getBookReviews } from '../../services/review';
// export const getTopReviews = async () => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews/top`
//   );
//   return res.data;
// };

// working like expected 
const Review = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getBookReviews(bookId);
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [bookId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = await createReview(bookId, rating, comment);
      setReviews([...reviews, newReview]);
      setRating(5);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };
  

  const containerStyle = {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  };

  const reviewCardStyle = {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '500',
    width: '120px',
    alignSelf: 'flex-start',
  };

  return (
    <div style={containerStyle}>
      <h3>Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}

      {reviews.map((rev) => (
        <div key={rev._id} style={reviewCardStyle}>
          <strong>{rev.user.username}</strong> rated {rev.rating}/5
          <p>{rev.comment}</p>
        </div>
      ))}

      <h4>Leave a Review</h4>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>
          Rating:
          <select
            style={inputStyle}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label>
          Comment:
          <textarea
            style={inputStyle}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Submit Review
        </button>
      </form>
    </div>
  );
};
// reviewe modifyed 
export default Review;
