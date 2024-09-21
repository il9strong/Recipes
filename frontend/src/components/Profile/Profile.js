import React, { Component } from 'react';
import axios from 'axios';
import "../../blocks/profile/css/profile.css";
import "./addProduct.css";
import AddRecipe from './AddRecipe/AddRecipe';

export class Profile extends Component {
  state = {
    name: '',
    email: '',
    recipes: [],
    newProductName: '',
    newProductImg: null,
    showAddProductForm: false,
    showAddRecipeForm: false,
    editMode: false,
    productNameError: '',
  };

  componentDidMount() {
    document.body.classList.add('body-black');
    this.fetchUserData();
  }

  componentWillUnmount() {
    document.body.classList.remove('body-black');
  }

  fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:3001/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, email, recipes } = response.data;
        this.setState({ name, email, recipes });
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token found in localStorage');
    }
  };

  toggleAddRecipeForm = () => {
    this.setState((prevState) => ({ showAddRecipeForm: !prevState.showAddRecipeForm }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    this.setState({ newProductImg: e.target.files[0] });
  };

  validateProductName = (name) => {
    const regex = /^[a-zA-Zа-яА-Я\s]+$/;
    return regex.test(name);
  };

  handleAddProduct = async (e) => {
    e.preventDefault();
    const { newProductName, newProductImg } = this.state;
    const token = localStorage.getItem('token');

    if (!newProductName.trim()) {
      this.setState({ productNameError: 'Название продукта не может быть пустым' });
      return;
    } else if (!this.validateProductName(newProductName)) {
      this.setState({ productNameError: 'Название продукта может содержать только буквы и пробелы' });
      return;
    } else {
      this.setState({ productNameError: '' });
    }

    const formData = new FormData();
    formData.append('name', newProductName);
    formData.append('img', newProductImg);

    if (token) {
      try {
        const response = await axios.post('http://localhost:3001/products', formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        
        console.log('Product added:', response.data);
        this.setState({ newProductName: '', newProductImg: null, showAddProductForm: false });
      } catch (error) {
        console.error('Error adding product:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token found in localStorage');
    }
  };

  toggleAddProductForm = () => {
    this.setState((prevState) => ({ showAddProductForm: !prevState.showAddProductForm }));
  };

  toggleEditMode = () => {
    this.setState((prevState) => ({ editMode: !prevState.editMode }));
  };

  handleSaveChanges = async (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.put('http://localhost:3001/users/profile', { name, email }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Profile updated:', response.data);
        this.setState({ editMode: false });
        this.fetchUserData();
      } catch (error) {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token found in localStorage');
    }
  };

  render() {
    const { name, email, recipes, newProductName, showAddRecipeForm, showAddProductForm, editMode, productNameError } = this.state;

    return (
      <>
        <div className="profile-block__sidebar">
          <div className="profile-block__profile">
            <img src="/img/profile/profile.svg" alt="Profile"/>
            <div className="profile-block__profile-text profile-title">Профиль</div>
          </div>
          <div className="profile-block__forms">
            {editMode ? (
              <form onSubmit={this.handleSaveChanges}>
                <div className='profile-block__forms-rows'>
                  <div className="label"><label className="profile-text">Имя</label></div>
                  <input type="text" name="name" value={name} onChange={this.handleInputChange} className="profile-text" />
                </div>
                <div className='profile-block__forms-rows'>
                  <div className="label"><label className="profile-text">E-mail</label></div>
                  <input type="email" name="email" value={email} onChange={this.handleInputChange} className="profile-text" />
                </div>
                <div className='profile-block__forms-buttons'>
                  <button type="submit" className="profile-text">Сохранить</button>
                  <button type="button" onClick={this.toggleEditMode} className="profile-text">Отмена</button>
                </div>
              </form>
            ) : (
              <>
                <form>
                  <div className='profile-block__forms-rows'>
                    <div className="label"><label className="profile-text">Имя</label></div>
                    <input type="text" readOnly value={name} className="profile-text"/>
                  </div>
                </form>
                <form>
                  <div className='profile-block__forms-rows'>
                    <div className="label"><label className="profile-text">E-mail</label></div>
                    <input type="text" readOnly value={email} className="profile-text"/>
                  </div>
                </form>
                <div className="profile-block__buttons">
                  <button onClick={this.toggleEditMode} className="profile-text">Сменить данные</button>
                </div>
              </>
            )}
          </div>
          <div className="profile-block__buttons">
            <button className="profile-text" onClick={this.toggleAddRecipeForm}>Добавить рецепт</button>
            {showAddRecipeForm && <AddRecipe />}
            <button className="profile-text" onClick={this.toggleAddProductForm}>Добавить продукт</button>
          </div>

          {showAddProductForm && (
            <div className='profile-block__products'>
              <form onSubmit={this.handleAddProduct} className="profile-block__forms-for-product">
                <div><label>Название продукта:</label></div>
                <input type="text" name="newProductName" value={newProductName} onChange={this.handleInputChange} required/>
                {productNameError && <div style={{ color: 'red' }}>{productNameError}</div>}
                <div><label>Изображение продукта:</label></div>
                <input className='profile-block__forms-for-product__button' type="file" name="newProductImg" onChange={this.handleFileChange} required/>
                <button type="submit">Подтвердить</button>
              </form>
            </div>
          )}
        </div>
        <div className="profile-block">
          <div className="container container-profile">
            {recipes.length > 0 && (
              <>
                <div className="profile-block__title title">Мои рецепты</div>
                <div className="container">
                  <div className="recipes">
                    {recipes.map((recipe, index) => (
                      <a href={`/recipe/${recipe.id}`} className="recipes__column" key={index}>
                        <img src={'/img/recipes/' + recipe.img} className="picture" alt={recipe.name}/>
                        <div className="recipes__title"><p>{recipe.name}</p></div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }  
}

export default Profile;
