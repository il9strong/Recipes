import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import Registration from './components/Registration/Registration';
import Recipes from './components/Recipes/Recipes';
import Ingredients from './components/Ingredients/Ingredients';
import Profile from './components/Profile/Profile';
import FullRecipe from './components/FullRecipe/FullRecipe';
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<FullRecipe isAuthenticated={isAuthenticated} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollTopButton />
      </>
    </Router>
  );
}

const NotFound = () => {
  return (
    <div className='page-not-found'>
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая вами страница не существует.</p>
    </div>
  );
}

export default App;
