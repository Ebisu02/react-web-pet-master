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

  const [users, setUsers] = useState([]);
  const getApiData = async() => {
    const response = await fetch(
      "/untitled/profile", {method:'POST', crossDomain:true}
    ).then((response) => response.json());
    setUsers(response);
  };
  useEffect(() => {
    getApiData();
  }, []);

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
      <div class="login">
        <header class="login__header">
          <h2>
            <svg class="icon">
              <use xlinHref="#icon-lock" />
            </svg>
            KitchenMate
          </h2>
        </header>
        {users.map((user) => (
        <div class="login__form">
          <div>
            <label class="uName">Имя пользователя: {user.name}</label>
          </div>
          <div>
            <label class="uMail">Почта: {user.mail}</label>
          </div>
          <div>
            <label class="uAboutLabel">О себе: <br></br>
              <div class="aboutContainer">
                <textarea name="about" class="uAbout" cols="45" rows="10">{user.about}</textarea>
                <button class="submitAbout">Подтвердить</button>
              </div>
            </label>
          </div>
          <div>
            <br></br>
            <input class="changePwd" type="button" value="Сменить пароль"></input>
            <br></br>
            <input class="signOut" type="button" value="Выйти из аккаунта"></input>
          </div>
        </div>))}
      </div>
    </main>
    <footer class="footer">
      <div class="copy">&copy; 2024 Ososov S.A.</div>
      <div className="about-me">
          <div className="about-me-text">
              <h2>О приложении</h2>
              <p>KitchenMate - приложение для поиска рецептов. Оно было сделано для упрощения жизни пользователя, чтобы он не думал, что ему приготовить и мог найти это в подобных приложениях.</p>
          </div>
      </div>
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