import React, { useState } from 'react';
import './App.css';

function App() {

  function goToRecipes() {
    window.location.replace("/untitled/recipes");
  }

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
          <h1>KitchenMate</h1>
          <p>Интересные рецепты вы можете найти здесь</p>
          <button onClick={goToRecipes}>Посмотреть рецепты</button>
      </div>
      <div className="achievements">
          <div className="work">
              <i className="fa fa-coffee" aria-hidden="true"></i>
              <p className="work-heading">Напитки</p>
              <p className="work-text">Здесь вы сможете найти много разнообразных рецептов напитков, как горячих, так и холодных, а также поделиться своими рецептами.</p>
          </div>
          <div className="work">
              <i className="fa fa-heart" aria-hidden="true"></i>
              <p className="work-heading">Здоровая еда</p>
              <p className="work-text">Множество людей объединились в одно сообщество, чтобы делиться своими рецептами здорового образа жизни и получать новый опыт.</p>
          </div>
          <div className="work">
              <i className="fa fa-certificate" aria-hidden="true"></i>
              <p className="work-heading">Русская кухня</p>
              <p className="work-text">Русская кухня очень многогранна и разнообразна. Она складывалась на протяжении многих веков, обогащалась культой других народов. </p>
          </div>
      </div>
      <div className="about-me">
          <div className="about-me-text">
              <h2>О приложении</h2>
              <p>KitchenMate - приложение для поиска рецептов. Оно было сделано для упрощения жизни пользователя, чтобы он не думал, что ему приготовить и мог найти это в подобных приложениях.</p>
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