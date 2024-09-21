import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../blocks/recipe/css/recipe.css";
import ReactStars from "react-rating-stars-component";

function FullRecipe({ isAuthenticated }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [usersMap, setUsersMap] = useState({});
  const [ratingError, setRatingError] = useState("");

  useEffect(() => {
    fetchRecipeData();
    fetchReviews();
    fetchUsers();
  }, [id]);

  const fetchRecipeData = async () => {
    try {
      const recipeId = id;

      const recipeResponse = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
      const recipeData = recipeResponse.data.requestBody;
      setRecipe(recipeData);

      const ingredientsResponse = await axios.get(`http://localhost:3001/ingredients/recipe/${recipeId}`);
      const ingredientsData = ingredientsResponse.data.requestBody;

      if (Array.isArray(ingredientsData)) {
        setIngredients(ingredientsData);
      } else {
        console.error('Данные об ингредиентах не являются массивом:', ingredientsData);
        setIngredients([]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setIngredients([]);
    }
  };

  const fetchReviews = async () => {
    try {
      const recipeId = id;
      const reviewsResponse = await axios.get(`http://localhost:3001/reviews/recipe/${recipeId}`);
      const { reviews, averageRating } = reviewsResponse.data.requestBody;
      setReviews(reviews);
      setAverageRating(averageRating);
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get('http://localhost:3001/users');
      const users = usersResponse.data;
      const usersMap = {};
      users.forEach(user => {
        usersMap[user.id] = user.name;
      });
      setUsersMap(usersMap);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
		e.preventDefault();
		if (newRating === 0) {
			setRatingError("Пожалуйста, поставьте оценку");
			return;
		}
		try {
			const recipeId = id;
			const token = localStorage.getItem('token');
			
			if (!token) {
				console.error('Пользователь не аутентифицирован');
				return;
			}
			
			const userResponse = await axios.get('http://localhost:3001/users/info', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			
			const authenticatedUserId = userResponse.data.id;
			console.log(authenticatedUserId)
			
			const reviewData = { text: newReview, rating: newRating, recipe_id: recipeId, user_id: authenticatedUserId };
			await axios.post('http://localhost:3001/reviews', reviewData);
			setNewReview("");
			setNewRating(1);
			setRatingError("");
			fetchReviews();
		} catch (error) {
			console.error('Ошибка при отправке отзыва:', error);
		}
	};
	
	

  if (!recipe) {
    return <div className='page-not-found'>
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая вами страница не существует.</p>
    </div>;
  }

  return (
    <div className="container-recipes">
      <div className="recipe-block">
        <div className="recipe-block__item1">
          <div className="recipe-block__description">
            <img src={"/img/recipes/" + recipe.img} align="left" className="recipe-block__picture" alt={recipe.name} />
            <div className="recipe-block__title title title_black">{recipe.name}</div>
            <p>{recipe.description}</p>
						<p>Средняя оценка: 
              <ReactStars
                count={5}
                value={averageRating}
                edit={false}
                size={24}
                activeColor="#ffd700"
                key={averageRating}
              /> 
              ({averageRating.toFixed(1)} / 5)
            </p>
          </div>
        </div>
        <div className="recipe-block__item2">
          <table className="recipe-block__table">
            <thead>
              <tr>
                <th className="col1">Ингредиент</th>
                <th className="col2">Вес</th>
                <th className="col3">Количество</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(ingredients) && ingredients.length > 0 ? (
                ingredients.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <td className="info">{ingredient.name}</td>
                    <td className="info">{ingredient.weight} г.</td>
                    <td>{ingredient.count} шт.</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="info">Нет ингредиентов для этого рецепта</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="reviews-section">
          <h3>Отзывы</h3>
          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Оставьте ваш отзыв"
                required
              />
              <label>
                Оценка:
                <ReactStars
                  count={5}
                  onChange={(newRating) => setNewRating(newRating)}
                  size={24}
                  activeColor="#ffd700"
                />
              </label>
              {ratingError && <p className="error">{ratingError}</p>}
              <button type="submit" className='button'>Отправить</button>
            </form>
          ) : (
            <p className='no-entry'>Пожалуйста, войдите в систему, чтобы оставить отзыв</p>
          )}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <h4>{usersMap[review.user_id]}</h4>
                <p>{review.text}</p>
                <p>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  /> 
                </p>
                <small>{new Date(review.date).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className='no-reviews'>Нет отзывов для этого рецепта</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FullRecipe;
