import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

import Books from './components/Books/Books';
import BookDetails from './components/Books/BookDetails';

import Borrow from './components/Borrow/Borrow';
import BorrowDetails from './components/Borrow/BorrowDetails';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* Public / Landing */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Landing />}
        />

        {/* Auth */}
        <Route
          path="/sign-up"
          element={!user ? <SignUpForm /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignInForm /> : <Navigate to="/" />}
        />

        {/* Books */}
        <Route
          path="/books"
          element={user ? <Books /> : <Navigate to="/" />}
        />
        <Route
          path="/books/:id"
          element={user ? <BookDetails /> : <Navigate to="/" />}
        />

        {/* Borrow */}
        <Route
          path="/borrow"
          element={user ? <Borrow /> : <Navigate to="/" />}
        />
        <Route
          path="/borrows/:id"
          element={user ? <BorrowDetails /> : <Navigate to="/" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
