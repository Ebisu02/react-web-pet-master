import React, { useState } from 'react';
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

  const recipes = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti'
    },
    {
      name: 'Chicken Curry',
      description: 'A spicy and flavorful dish.',
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
        <div>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <div className="recipeItem">
                  <img clasName="recipeImg"
                  width={250} height={200}
                  src="https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)">
                  </img>
                  <div className='recipeTitle'>
                    <h3>{recipe.name}</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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