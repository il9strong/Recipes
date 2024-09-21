import React, { useState, useEffect } from 'react';
import "../../blocks/registration/css/registration.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-black');
    return () => {
      document.body.classList.remove('body-black');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'login') setLogin(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'email') setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await axios.post('http://localhost:3001/auth/register', { name, login, password, email });
      navigate('/auth');
    } catch (error) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <div className="reg-block">
      <div className="container-reg">
        <div className="reg-block__title title">Регистрация</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <label className="form__column1">Имя:</label>
            <input type="text" name="name" className="form__column2" onChange={handleInputChange} />
          </div>
          <div className="form__row">
            <label className="form__column1">Логин:</label>
            <input type="text" name="login" className="form__column2" onChange={handleInputChange} />
          </div>
          <div className="form__row">
            <label className="form__column1">Пароль:</label>
            <input type="password" name="password" className="form__column2" onChange={handleInputChange} />
          </div>
          <div className="form__row">
            <label className="form__column1">Подтверждение пароля:</label>
            <input type="password" name="confirmPassword" className="form__column2" onChange={handleInputChange} />
          </div>
          <div className="form__row">
            <label className="form__column1">E-mail:</label>
            <input type="text" name="email" className="form__column2" onChange={handleInputChange} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="row"><button className="reg-block__button button" type="submit">Подтвердить</button></div>
        </form>
      </div>
    </div>
  );
};

export default Registration;