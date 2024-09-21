import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../blocks/ingredients/css/ingredients.css";

class Ingredients extends Component {
  state = {
    products: [],
    selectedIngredients: [],
    foundRecipes: [],
    isSearchClicked: false,
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      const products = response.data.requestBody || [];
      this.setState({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleCheckboxChange = (product, isChecked) => {
    this.setState((prevState) => {
      const selectedIngredients = isChecked
        ? [...prevState.selectedIngredients, { ...product, weight: 0, count: 0 }]
        : prevState.selectedIngredients.filter(ingredient => ingredient.id !== product.id);
      return { selectedIngredients };
    });
  };

  handleInputChange = (id, field, value) => {
    this.setState((prevState) => {
      const selectedIngredients = prevState.selectedIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, [field]: value !== '' ? Number(value) : null } : ingredient
      );
      return { selectedIngredients };
    });
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    this.setState({ searchQuery });
  };

  handleSearchRecipes = async () => {
    const { selectedIngredients } = this.state;
    const ingredientsQuery = selectedIngredients.map(ingredient =>
      `${encodeURIComponent(ingredient.name)}*${ingredient.weight || 'null'}*${ingredient.count || 'null'}`
    ).join(',');

    try {
      const response = await axios.get(`http://localhost:3001/recipes?ingredients=${ingredientsQuery}`);
      const foundRecipes = Array.isArray(response.data.requestBody) ? response.data.requestBody : [];
      this.setState({ foundRecipes, isSearchClicked: true });
    } catch (error) {
      console.error('Error searching recipes:', error);
      this.setState({ foundRecipes: [], isSearchClicked: true });
    }
  };

  render() {
    const { products, foundRecipes, isSearchClicked, searchQuery } = this.state;

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery)
    );

    return (
      <>
        <div className="container container-recipes">
          <div className="ingredients-block">
            <div className="ingredients-block__row1">
              <div className="ingredients-block__title title title_black">ингредиенты</div>
              <form>
                <input
                  type="search"
                  className="search-string"
                  placeholder="Поиск..."
                  onChange={this.handleSearchChange}
                  value={searchQuery}
                />
              </form>
            </div>
            <div className="ingredients-block__row2">
              <div className="ingredients">
                {filteredProducts.map(product => (
                  <label className="ingredients__column" key={product.id}>
                    <form className="ingredients__checkbox">
                      <input
                        type="checkbox"
                        onChange={e => this.handleCheckboxChange(product, e.target.checked)}
                      />
                    </form>
                    <div className="ingredients__ingredient">
                      <img src={"/img/products/" + product.img} className="ingredients__picture" alt={product.name} />
                      <div className="ingredients__title"><p>{product.name}</p></div>
                    </div>
                    <div className="ingredients__weight">
                      <form>
                        <label>Вес:</label>
                        <input
                          type="number"
                          onChange={e => this.handleInputChange(product.id, 'weight', e.target.value)}
                        />
                      </form>
                    </div>
                    <div className="ingredients__count">
                      <form>
                        <label>Количество:</label>
                        <input
                          type="number"
                          onChange={e => this.handleInputChange(product.id, 'count', e.target.value)}
                        />
                      </form>
                    </div>
                  </label>
                ))}
              </div>
              <button className="ingredients-block__button button" type="button" onClick={this.handleSearchRecipes}>Найти</button>
            </div>
          </div>
        </div>
        {isSearchClicked && (
          <div className="container">
            <div className="ingredients-block__row1" id="founded-recipes">
              <div className="ingredients-block__title title title_black">найденные рецепты</div>
            </div>
            <div>
              {foundRecipes.length > 0 ? (
                <div className="recipes">
                  {foundRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipes__column">
                      <img src={"/img/recipes/" + recipe.img} className="picture" alt={recipe.name} />
                      <div className="recipes__title"><p>{recipe.name}</p></div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-recipes">Рецепты не найдены</div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Ingredients;
