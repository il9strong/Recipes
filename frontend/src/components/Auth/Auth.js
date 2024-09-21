import React, { useState, useEffect } from 'react';
import "../../blocks/authorization/css/authorization.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    error: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-black');
    return () => {
      document.body.classList.remove('body-black');
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { login, password } = formData;

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { login, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/profile');
    } catch (error) {
      setFormData({ ...formData, error: 'Неправильный логин или пароль' });
    }
  };

  return (
    <div className="auth-block">
      <div className="container-auth">
        <div className="auth-block__title title">Авторизация</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <label className="form__column1">Логин:</label>
            <input type="text" name="login" className="form__column2" onChange={handleInputChange} />
          </div>
          <div className="form__row">
            <label className="form__column1">Пароль:</label>
            <input type="password" name="password" className="form__column2" onChange={handleInputChange} />
          </div>
          {formData.error && <p style={{ color: 'red' }}>{formData.error}</p>}
          <div><button className="auth-block__button button" type="submit">Войти</button></div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
