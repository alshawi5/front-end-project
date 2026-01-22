import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserBorrows } from '../../services/borrow';
import { updateBook } from '../../services/book';
// i dont know if i should keep this maybe ill do it under the book ?
const BorrowDetails = () => {
    const { id } = useParams();
    const [borrow, setBorrow] = useState(null);

    useEffect(() => {
        const fetchBorrow = async () => {
            const borrows = await getUserBorrows();
            //  const borrow = await updateBook();
            const found = borrows.find((b) => b._id === id);
            setBorrow(found);
        };


        fetchBorrow();
    }, [id]);

    if (!borrow) return <p>Loading...</p>;

    return (
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '24px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        }}>
            <h1>Borrow Details</h1>

            <p><strong>Book:</strong> {borrow.book.title}</p>
            <p><strong>Author:</strong> {borrow.book.author}</p>
            <p><strong>Status:</strong> {borrow.status}</p>
            <p><strong>Borrowed At:</strong> {new Date(borrow.createdAt).toLocaleDateString()}</p>
            {/* <p><strong>returned At:</strong> {new Date(borrow.returnedAt).toLocaleDateString()}</p> */}
            <p>
                <strong>Returned At:</strong>{' '}
                {borrow.returnedAt
                    ? new Date(borrow.returnedAt).toLocaleDateString()
                    : 'Not returned yet'}
            </p>


        </div>
    );
};

export default BorrowDetails;
