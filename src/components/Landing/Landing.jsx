const Landing = () => {
  const pageStyle = {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  };

  const containerStyle = {
    maxWidth: '680px',
    width: '100%',
    textAlign: 'center',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '20px',
    background: 'rgba(99,102,241,0.15)',
    border: '1px solid rgba(99,102,241,0.3)',
    color: '#a5b4fc',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginBottom: '28px',
  };

  const headingStyle = {
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: '800',
    color: '#f1f5f9',
    lineHeight: '1.15',
    marginBottom: '20px',
    letterSpacing: '-1px',
  };

  const accentStyle = {
    background: 'linear-gradient(135deg, #818cf8, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const textStyle = {
    fontSize: '17px',
    color: '#94a3b8',
    lineHeight: '1.7',
    marginBottom: '40px',
    maxWidth: '480px',
    margin: '0 auto 40px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const signUpButton = {
    padding: '14px 32px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    color: '#fff',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  };

  const signInButton = {
    padding: '14px 32px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    color: '#e2e8f0',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.15s',
  };

  // landing same as template
  return (
    <div style={pageStyle}>
      <main style={containerStyle}>
        <span style={badgeStyle}>📚 Your Digital Library</span>
        <h1 style={headingStyle}>
          Read More,<br />
          <span style={accentStyle}>Borrow Smarter</span>
        </h1>
        <p style={textStyle}>
          Sign up now, or sign in to see your super secret dashboard and start borrowing books!
        </p>
        <div style={buttonGroupStyle}>
          <button
            style={signUpButton}
            onClick={() => (window.location.href = '/sign-up')}
          >
            Get Started
          </button>
          <button
            style={signInButton}
            onClick={() => (window.location.href = '/sign-in')}
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};
// modfied the landing in term of the style 
export default Landing;
