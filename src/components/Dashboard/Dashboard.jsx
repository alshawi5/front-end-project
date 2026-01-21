import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as testService from '../../services/testService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await testService.test();
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchTest();
  }, [user]);

  const container = {
    padding: '40px',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const header = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '10px',
  };

  const subText = {
    color: '#6b7280',
    marginBottom: '30px',
  };

  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  };

  const card = {
    background: '#fff',
    borderRadius: '14px',
    padding: '22px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  };

  const cardTitle = {
    fontSize: '14px',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginBottom: '6px',
  };

  const cardValue = {
    fontSize: '26px',
    fontWeight: '700',
  };

  const adminCard = {
    ...card,
    borderLeft: '6px solid #2563eb',
  };

  const userCard = {
    ...card,
    borderLeft: '6px solid #10b981',
  };

  return (
    <main style={container}>
      <h1 style={header}>Welcome back, {user.username}</h1>
      <p style={subText}>
        {user.role === 'admin'
          ? 'Admin dashboard overview'
          : 'Your personal dashboard'}
      </p>

      {/* Admin Dashboard */}
      {user.role === 'admin' ? (
        <div style={grid}>
          <div style={adminCard}>
            <p style={cardTitle}>Total Users</p>
            <p style={cardValue}>—</p>
          </div>

          <div style={adminCard}>
            <p style={cardTitle}>Total Books</p>
            <p style={cardValue}>—</p>
          </div>

          <div style={adminCard}>
            <p style={cardTitle}>Top Reviews</p>
            <p style={cardValue}>—</p>
          </div>
        </div>
      ) : (
        /* User Dashboard */
        <div style={grid}>
          <div style={userCard}>
            <p style={cardTitle}>Borrowed Books</p>
            <p style={cardValue}>—</p>
          </div>

          <div style={userCard}>
            <p style={cardTitle}>Active Borrows</p>
            <p style={cardValue}>—</p>
          </div>

          <div style={userCard}>
            <p style={cardTitle}>Account Status</p>
            <p style={cardValue}>Active</p>
          </div>
        </div>
      )}

      {/* Existing message (unchanged)
      <div style={{ marginTop: '30px', fontWeight: '600' }}>
        {message}
      </div> */}
    </main>
  );
};

export default Dashboard;
