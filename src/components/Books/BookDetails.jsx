import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getBookById, deleteBook } from '../../services/book';
import Review from '../Review/Review';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);

  // Get user from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])).payload;
      setUser(payload);
    }
  }, []);

  // Fetch book by ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  // Delete book
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    await deleteBook(id);
    navigate('/books');
  };

  if (!book) return <p>Loading...</p>;

  // Inline styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '10px',
  };

  const textStyle = {
    fontSize: '16px',
    color: '#374151',
    lineHeight: '1.5',
  };

  const buttonContainer = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  };

  const buttonStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#fff',
  };

  const editButton = { ...buttonStyle, backgroundColor: '#2563eb' };
  const deleteButton = { ...buttonStyle, backgroundColor: '#dc2626' };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{book.title}</h1>
      <p style={textStyle}><strong>Author:</strong> {book.author}</p>
      <p style={textStyle}><strong>ISBN:</strong> {book.ISBN}</p>
      <p style={textStyle}><strong>Year:</strong> {book.publishYear}</p>
      <p style={textStyle}>{book.description}</p>

      {user?.role === 'admin' && (
        <div style={buttonContainer}>
          <button style={editButton} onClick={() => navigate(`/books/${id}/edit`)}>
            Edit
          </button>
          <button style={deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {/* Reviews Section */}
      <Review bookId={id} />
    </div>
  );
};

export default BookDetails;
