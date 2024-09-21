import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../blocks/recipes/css/recipes.css";

class Recipes extends Component {
  state = {
    recipes: [],
    categories: [],
    selectedCategory: '',
    sortMethod: 'dateAdded',
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchRecipes();
    this.fetchCategories();
    window.scrollTo(0, 0);
  }

  fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      if (response.data.successful) {
        this.setState({ recipes: response.data.requestBody });
      } else {
        throw new Error('Не удалось получить рецепты');
      }
    } catch (error) {
      console.error('Ошибка при получении рецептов:', error);
    }
  };
  
  fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      if (response.data.successful) {
        this.setState({ categories: response.data.requestBody });
      } else {
        throw new Error('Не удалось получить категории');
      }
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
    }
  };

  handleCategoryChange = (event) => {
    const selectedCategory = parseInt(event.target.value, 10);
    this.setState({ selectedCategory });
  };

  handleSortMethodChange = (event) => {
    const sortMethod = event.target.value;
    this.setState({ sortMethod });
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    this.setState({ searchQuery });
  };

  render() {
    const { recipes, categories, selectedCategory, sortMethod, searchQuery } = this.state;
    const categoriesToRender = Array.isArray(categories) ? categories : [];
    const filteredRecipesByCategory = selectedCategory 
      ? recipes.filter(recipe => parseInt(recipe.category_id) === parseInt(selectedCategory))
      : recipes;
    const filteredRecipesBySearch = searchQuery
      ? filteredRecipesByCategory.filter(recipe => recipe.name.toLowerCase().includes(searchQuery))
      : filteredRecipesByCategory;
    let sortedRecipes = [...filteredRecipesBySearch];
    if (sortMethod === 'dateAdded') {
      sortedRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortMethod === 'alphabetical') {
      sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
    }
    const recipesToRender = Array.isArray(sortedRecipes) ? sortedRecipes : [];

    return (
      <div className="container-rec container-recipes">
        <div className="recipes-block">
          <div className="recipes-block__row1">
            <div className="recipes-block__title title title_black">Каталог рецептов</div>
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
          <div className="recipes-block__row2">
            <form>
              <select
                name=""
                id=""
                className="recipes-block__select1 select"
                onChange={this.handleCategoryChange}
              >
                <option value="">Выбрать категорию</option>
                {categoriesToRender.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </form>
          </div>
          <div className="recipes-block__row3">
            <div className="recipes-block__sorting-by">Сортировать по:</div>
            <form>
              <select
                name=""
                id=""
                className="recipes-block__select2 select"
                onChange={this.handleSortMethodChange}
                value={sortMethod}
              >
                <option value="dateAdded">дате добавления</option>
                <option value="alphabetical">алфавиту</option>
              </select>
            </form>
          </div>
          <div className="container-rec">
            <div className="recipes">
              {recipesToRender.map(recipe => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipes__column">
                  <img src={"/img/recipes/" + recipe.img} className="picture" alt={recipe.name} />
                  <div className="recipes__title"><p>{recipe.name}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
