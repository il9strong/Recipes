import React, { Component } from 'react';
import axios from 'axios';
import './addRecipe.css'

class AddRecipe extends Component {
  state = {
    name: '',
    category_id: '',
    ingredients: [{ product_id: '', name: '', count: '', weight: '' }],
    img: null,
    description: '',
    categories: [],
    products: [],
    recipeNameError: '',
    ingredientErrors: [],
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      this.setState({ categories: response.data.requestBody });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      this.setState({ products: response.data.requestBody });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === 'name') {
      this.setState({ recipeNameError: '' });
    }
  };

  handleFileChange = (e) => {
    this.setState({ img: e.target.files[0] });
  };

  validateRecipeName = (name) => {
    const regex = /^[a-zA-Zа-яА-Я\s]+$/;
    return regex.test(name);
  };

  validateIngredient = (index) => {
    const { ingredients } = this.state;
    const errors = [...this.state.ingredientErrors];
    const ingredient = ingredients[index];

    let hasError = false;

    if (ingredient.count !== '' && (!Number.isInteger(parseFloat(ingredient.count)) || parseInt(ingredient.count) <= 0)) {
      errors[index] = { ...errors[index], count: 'Количество должно быть положительным числом' };
      hasError = true;
    } else {
      errors[index] = { ...errors[index], count: '' };
    }

    if (ingredient.weight !== '' && (!Number.isInteger(parseFloat(ingredient.weight)) || parseInt(ingredient.weight) <= 0)) {
      errors[index] = { ...errors[index], weight: 'Вес должен быть положительным числом' };
      hasError = true;
    } else {
      errors[index] = { ...errors[index], weight: '' };
    }

    this.setState({ ingredientErrors: errors });
    return !hasError;
  };

  handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...this.state.ingredients];

    if (name === 'product_id') {
      const selectedProduct = this.state.products.find(product => parseInt(product.id) === parseInt(value));
      ingredients[index] = {
        ...ingredients[index],
        product_id: value,
        name: selectedProduct ? selectedProduct.name : ''
      };
    } else {
      ingredients[index][name] = value;
    }

    this.setState({ ingredients }, () => {
      this.validateIngredient(index);
    });
  };

  addIngredient = () => {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, { product_id: '', name: '', count: '', weight: '' }],
      ingredientErrors: [...prevState.ingredientErrors, {}],
    }));
  };

  removeIngredient = (index) => {
    this.setState(prevState => {
      const ingredients = [...prevState.ingredients];
      const errors = [...prevState.ingredientErrors];
      if (ingredients.length > 1) {
        ingredients.splice(index, 1);
        errors.splice(index, 1);
      }
      return { ingredients, ingredientErrors: errors };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category_id, ingredients, img, description } = this.state;
    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (!this.validateRecipeName(name)) {
      this.setState({ recipeNameError: 'Название рецепта должно содержать только буквы и пробелы' });
      return;
    }

    formData.append('name', name);
    formData.append('category_id', category_id);
    formData.append('description', description);
    formData.append('img', img);

    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][product_id]`, ingredient.product_id);
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][count]`, ingredient.count);
      formData.append(`ingredients[${index}][weight]`, ingredient.weight);
    });

    try {
      const response = await axios.post('http://localhost:3001/recipes/profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      console.log('Recipe added:', response.data);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  render() {
    const { name, category_id, ingredients, description, categories, products, recipeNameError, ingredientErrors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className='add-recipe'>
        <div>
          <label>Название рецепта:</label>
          <input className='input' type="text" name="name" value={name} onChange={this.handleInputChange} required />
          {recipeNameError && <p style={{ color: 'red' }}>{recipeNameError}</p>}
        </div>
        <div>
          <label>Категория:</label>
          <select name="category_id" value={category_id} onChange={this.handleInputChange} required>
            <option value="">Выберите категорию</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='add-recipe__ingredients'>
          <label>Ингредиенты:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <select name="product_id" value={ingredient.product_id} onChange={(e) => this.handleIngredientChange(index, e)} required>
                <option value="">Выберите продукт</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <input className='input' type="number" name="count" value={ingredient.count} onChange={(e) => this.handleIngredientChange(index, e)} placeholder="Количество" />
              {ingredientErrors[index] && ingredientErrors[index].count && (
                <p style={{ color: 'red' }}>{ingredientErrors[index].count}</p>
              )}
              <input className='input' type="number" name="weight" value={ingredient.weight} onChange={(e) => this.handleIngredientChange(index, e)} placeholder="Вес" />
              {ingredientErrors[index] && ingredientErrors[index].weight && (
                <p style={{ color: 'red' }}>{ingredientErrors[index].weight}</p>
              )}
              {ingredients.length > 1 && (
                <button type="button" onClick={() => this.removeIngredient(index)}>Удалить</button>
              )}
            </div>
          ))}

          <button type="button" onClick={this.addIngredient}>Добавить ингредиент</button>
        </div>
        <div>
          <label>Описание:</label>
          <textarea name="description" value={description} onChange={this.handleInputChange} required></textarea>
        </div>
        <div>
          <label>Изображение:</label>
          <input type="file" name="img" className='file-img' onChange={this.handleFileChange} required />
        </div>
        <button type="submit" className='add-recipe__button'>Подтвердить</button>
      </form>
    );
  }
}

export default AddRecipe;
