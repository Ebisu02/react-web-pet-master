import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const nameForTest = "123";
  const name = "isAuthorized";
  function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Проверяем, что куки начинается с нужного имени
        if (cookie.indexOf(name + '=') == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
  }
  const i = getCookie(name);
  function isAuthorized(cookie) {
    const str = atob(cookie);
    return str.startsWith("true:") ? true : false;
  }

  const [pageCounter, setPageCounter] = useState(0);
  const [recips, setRecipes] = useState([]);
  const getApiData = async() => {
    const response = await fetch(
      `http://localhost:8080/untitled/recipes?page=${pageCounter + 1}`, {mode:'cors', method:'POST', crossDomain:true}
    ).then((response) => response.json());
    setRecipes(response);
  };

  useEffect(() => {
    getApiData();
  }, [pageCounter]);

  const handleNextPage = () => {
    setPageCounter(pageCounter + 1);
  };

  const handlePreviousPage = () => {
    if (pageCounter > 0) {
      setPageCounter(pageCounter - 1);
    }
  };

  const recipes = [
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      howToCook: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Chicken Curry',
      howToCook: 'A spicy and flavorful dish.',
      ingredients: 'Powder, Coconut Milk, Onion, Garlic'
    }
    // Добавьте больше рецептов по необходимости
  ];

  return (
  <div>
    <header class="header">
      <a href="#" class="logo">KitchenMate</a>
      {isAuthorized(i) && (<nav class="nav-items">
          <a href="/untitled/home">Главная</a>
          <a href="/untitled/recipes">Рецепты</a>
          <a href="/untitled/profile">Личный кабинет</a>
      </nav>)}
      {!isAuthorized(i) &&  (<nav class="nav-items">
          <a href="/untitled/home">Главная</a>
          <a href="/untitled/recipes">Рецепты</a>
          <a href="/untitled/signup">Регистрация</a>
          <a href="/untitled/login">Вход</a>
      </nav>)}
    </header>
    <main>
      <div className="intro">
          <ul className='recipe'>
            {recips.map((recipe, index) => (
              <li key={index}>
                <div className="recipeItem">
                  <div className='recipeCard'>
                    <img clasName="recipeImg"
                    width={250} height={200}
                    alt="recipe"
                    src={`jsp/recipes/images/${recipe.imgPath}`}
                    onError={(e) => e.target.src=`jsp/recipes/images/404.png`}>
                    </img>
                    <div className='recipeTitle'>
                      <h3>{recipe.name}</h3>
                    </div>
                  </div>
                  <div className='recipeIngr'>
                    <h3>Инригриденты:</h3>
                    <ul>
                      {recipe.ingredients.split(', ').map((ingredient, index1) => (
                        <li key={index1}>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='recipeHowto'>
                    <h3>Как готовить:</h3>
                    <div>
                      {recipe.howToCook}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='pagination'>
            {pageCounter > 0 && (
              <button onClick={handlePreviousPage} className='nextButton'>Предыдущая</button>
            )}
            {recips.length > 0 && (
              <button onClick={handleNextPage} className='prevButton'>Следующая</button>
            )}
          </div>
      </div>
    </main>
    <footer class="footer">
      <div class="copy">&copy; 2024 Ososov S.A.</div>
      <div class="bottom-links">
          <div class="links">
              <span>Контакты</span>
              <a href="#">helloimclinker@gmail.com</a>
          </div>
      </div>
    </footer>
  </div>
  );
}

export default App;