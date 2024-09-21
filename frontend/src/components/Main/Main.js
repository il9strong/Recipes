import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../css/main.css";

class Main extends Component {
  state = {
    recentRecipes: [],
  };

  newsRef = React.createRef();

  handleScrollToNews = () => {
    if (this.newsRef.current) {
      this.newsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  componentDidMount() {
    document.body.classList.add('body-white');
    this.fetchRecentRecipes();
  }

  componentWillUnmount() {
    document.body.classList.remove('body-white');
  }

  fetchRecentRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      if (response.data.successful) {
        this.setState({ recentRecipes: response.data.requestBody });
      } else {
        throw new Error('Не удалось получить последние рецепты');
      }
    } catch (error) {
      console.error('Ошибка при получении последних рецептов:', error);
    }
  };

  render() {
    const { recentRecipes } = this.state;

    return (
      <>
        <div className="main-start">
          <div className="container">
            <div className="main-start__title title">
              Готовьте любые блюда из представленных на нашем сайте рецептов
            </div>
            <span className="main-start__button" onClick={this.handleScrollToNews}>
              <div className="main-start__button-text button-text">
                Приступить
              </div>
              <div className="main-start__button-icon button-icon">
                <img src="/img/arrows1.svg" alt="arrow" />
              </div>
            </span>
          </div>
        </div>
        <div className="main-news" ref={this.newsRef} id="news">
          <div className="main-news__title title">Новые рецепты</div>
          <div className="container">
            <div className="recipes">
              {recentRecipes.map(recipe => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipes__column">
                  <img src={`/img/recipes/${recipe.img}`} className="picture" alt="recipe" />
                  <div className="recipes__title"><p>{recipe.name}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="main-recipes">
          <div className="container">
            <div className="main-recipes__title title">
              Просмотрите весь каталог рецептов
            </div>
            <Link to="/recipes" className="main-recipes__button">
              <div className="main-recipes__button-text button-text">
                Рецепты
              </div>
              <div className="main-recipes__button-icon button-icon">
                <img src="/img/arrows2.svg" alt="arrow" />
              </div>
            </Link>
          </div>
        </div>
        <div className="line"></div>
        <div className="main-ingredients">
          <div className="container">
            <div className="main-ingredients__title title">
              Найдите рецепты по выбранным вами ингредиентам
            </div>
            <Link to="/ingredients" className="main-ingredients__button">
              <div className="main-ingredients__button-icon button-icon">
                <img src="/img/arrows3.svg" alt="arrow" />
              </div>
              <div className="main-ingredients__button-text button-text">
                Ингредиенты
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
