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
    padding: '40px 32px',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const header = {
    fontSize: '30px',
    fontWeight: '800',
    marginBottom: '8px',
    color: '#f1f5f9',
    letterSpacing: '-0.5px',
  };

  const subText = {
    color: '#64748b',
    fontSize: '15px',
    marginBottom: '36px',
  };

  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
  };

  const card = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const cardTitle = {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#64748b',
    marginBottom: '10px',
    fontWeight: '600',
  };

  const cardValue = {
    fontSize: '28px',
    fontWeight: '800',
    color: '#f1f5f9',
  };

  const adminCard = {
    ...card,
    borderTop: '3px solid #6366f1',
  };

  const userCard = {
    ...card,
    borderTop: '3px solid #10b981',
  };

  return (
    <main style={container}>
      <h1 style={header}>Welcome back, {user.username} 👋</h1>
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
          <div style={userCard}>
            <p style={cardTitle}>total borrows</p>
            <p style={cardValue}>--</p>
          </div>
          <div style={userCard}>
            <p style={cardTitle}>charage amount </p>
            <p style={cardValue}>$</p>
          </div>
          <div style={userCard}>
            <p style={cardTitle}>number of vialotions</p>
            <p style={cardValue}>none</p>
          </div>
          <div style={userCard}>
            <p style={cardTitle}> good customer ?</p>
            <p style={cardValue}>Yes</p>
          </div>
        <div style={userCard}>
            <p style={cardTitle}>Favitote Book </p>
            <p style={cardValue}>--</p>
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
