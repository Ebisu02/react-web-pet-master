import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const nameForTest = "123";
  const name = "isAuthorized";

  function signout() {
    document.cookie="isAuthorized=; Max-Age=-1;";
    window.location.replace("/untitled");
  }

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

  const [users, setUsers] = useState({});
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
    <header className="header">
      <a href="#" className="logo">KitchenMate</a>
      {isAuthorized(i) && (<nav className="nav-items">
          <a href="/untitled/home">Главная</a>
          <a href="/untitled/recipes">Рецепты</a>
          <a href="/untitled/profile">Личный кабинет</a>
      </nav>)}
      {!isAuthorized(i) && (<nav className="nav-items">
          <a href="/untitled/home">Главная</a>
          <a href="/untitled/recipes">Рецепты</a>
          <a href="/untitled/signup">Регистрация</a>
          <a href="/untitled/login">Вход</a>
      </nav>)}
    </header>
    <main>
      <div className="login">
        <header className="login__header">
          <h2>
            <svg className="icon">
              <use xlinkHref="#icon-lock" />
            </svg>
            KitchenMate
          </h2>
        </header>
      
        <div class="login__form">
          <div>
            <label className="uName">Имя пользователя: {users.name ? users.name : "null"}</label>
          </div>
          <div>
            <label className="uMail">Почта: {users.mail ? users.mail : "null"}</label>
          </div>
          <div>
            <label className="uAboutLabel">О себе: <br></br>
              <div className="aboutContainer">
                <textarea name="about" readOnly="true" disabled="true" className="uAbout" cols="45" rows="10" value={users.i || "null"}></textarea>
              </div>
            </label>
          </div>
          <div>
            <br></br>
            <input className="signOut" type="button" onClick={signout} value="Выйти из аккаунта"></input>
          </div>
        </div>
      </div>
    </main>
    <footer className="footer">
      <div className="copy">&copy; 2024 Ososov S.A.</div>
      <div className="about-me">
          <div className="about-me-text">
              <h2>О приложении</h2>
              <p>KitchenMate - приложение для поиска рецептов. Оно было сделано для упрощения жизни пользователя, чтобы он не думал, что ему приготовить и мог найти это в подобных приложениях.</p>
          </div>
      </div>
      <div className="bottom-links">
          <div className="links">
              <span>Контакты</span>
              <a href="#">helloimclinker@gmail.com</a>
          </div>
      </div>
    </footer>
  </div>
  );
}

export default App;