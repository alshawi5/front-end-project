import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { borrowBook, getUserBorrows, updateBorrow } from '../../services/borrow';
import { getAllBooks } from '../../services/book';

const Borrow = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);

        const borrowsData = await getUserBorrows();
        setBorrows(borrowsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      const newBorrow = await borrowBook(bookId);

      setBorrows((prev) => [...prev, newBorrow]);

      const updatedBooks = await getAllBooks();
      setBooks(updatedBooks);

      navigate(`/borrows/${newBorrow._id}`);
    } catch (err) {
      alert('This book is already borrowed.');
      console.error(err);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await updateBorrow(borrowId, { status: 'returned' });

      const booksData = await getAllBooks();
      const borrowsData = await getUserBorrows();

      setBooks(booksData);
      setBorrows(borrowsData);
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '18px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '600',
    marginTop: '10px',
  };

  return (
    <div>
      <h1>Borrow Books</h1>

      <h2>Available Books</h2>
      <div style={containerStyle}>
        {books
          .filter((book) => book.isAvailable)
          .map((book) => (
            <div key={book._id} style={cardStyle}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.publishYear}</p>

              <button
                style={buttonStyle}
                onClick={() => handleBorrow(book._id)}
              >
                Borrow
              </button>
            </div>
          ))}
      </div>

      <h2 style={{ marginTop: '40px' }}>My Borrows</h2>
      <div style={containerStyle}>
  {borrows.map((borrow) => (
    <div key={borrow._id} style={cardStyle}>
      <h3>
        {borrow.book ? borrow.book.title : 'Book unavailable'}      
        {/* added this to make sure its title */}
      </h3>

      <p>
        <strong>Status:</strong> {borrow.status}
      </p>

      {borrow.status === 'borrowed' && borrow.book && (
        <button
          style={buttonStyle}
          onClick={() => handleReturn(borrow._id)}  
        >
          Return
        </button>
      )}
    </div>
  ))}
</div>
    </div>
  );
};

export default Borrow;
