import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../../services/book';

import Review from '../Review/Review';

const Books = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    ISBN: '',
    description: '',
    publishYear: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Load books + check admin role
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    const token = window.localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])).payload;
      setIsAdmin(payload.role === 'admin');
    }

    fetchBooks();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Create book → go to details page
  const handleCreate = async () => {
    try {
      const createdBook = await createBook(newBook);
      navigate(`/books/${createdBook._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Update book title (simple prompt)
  const handleUpdate = async (id) => {
    const updatedTitle = prompt('Enter new title');
    if (!updatedTitle) return;

    try {
      const updatedBook = await updateBook(id, { title: updatedTitle });
      setBooks(books.map((b) => (b._id === id ? updatedBook : b)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;

    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Inline Styles
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    flex: '1 1 250px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '500',
    marginRight: '8px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '14px',
    width: '100%',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '30px',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardButtonContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: 'auto',
  };

  return (
    <div>
      <h1>Books</h1>

      {/* Admin Create Book */}
      {isAdmin && (
        <div style={formStyle}>
          <h2>Create New Book</h2>
          <input
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="ISBN"
            placeholder="ISBN"
            value={newBook.ISBN}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="description"
            placeholder="Description"
            value={newBook.description}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="publishYear"
            type="number"
            placeholder="Publish Year"
            value={newBook.publishYear}
            onChange={handleChange}
            style={inputStyle}
          />
          <button onClick={handleCreate} style={buttonStyle}>
            Create Book
          </button>
        </div>
      )}

      {/* Books List */}
      <div style={containerStyle}>
        {books.map((book) => (
          <div key={book._id} style={cardStyle}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.publishYear}</p>
            <p>{book.description}</p>

            <div style={cardButtonContainer}>
              <button
                onClick={() => navigate(`/books/${book._id}`)}
                style={buttonStyle}
              >
                View Details
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => handleUpdate(book._id)}
                    style={buttonStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    style={buttonStyle}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* Reviews */}
            <Review bookId={book._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
