import React, { useState } from 'react';
import './App.css';

function App() {
  const [loginFailed, setLoginFailed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let url = "/untitled/login";
    const data = new FormData(event.target);
    const base64encodedData = btoa(data.get("uname") + ":" + data.get("pwd"));
    fetch(url, {method:'POST', crossDomain:true,
      headers: {'Content-Type':'application/json','Authorization': 'Basic ' + base64encodedData}})
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.replace("/untitled");
        } else {
          setLoginFailed(true);
        }
      }).catch(function(err) {  
        if (err.message === 'Network Error') {
          alert("Ошибка соединения");
        }
      });
  }

  return (
  <div>
  <header class="login__header">
      <h2>
          <svg class="icon">
              <use xlinkHref="#icon-lock" />
          </svg>
          <a class="alogo" href="/untitled">KitchenMate</a>
      </h2>
  </header>
  <form onSubmit={handleSubmit} class="login__form" method="POST">
      <div>
          <label for="uname">Имя пользователя</label>
          <input type="text" id="uname" name="uname" placeholder="Имя пользователя"></input>
      </div>
      <div>
          {loginFailed && (<label htmlFor="pwd" id="warning" style={{color: "red"}}>Неверное имя пользователя или пароль!</label>)}
          {!loginFailed && (<label htmlFor="pwd">Пароль</label>)}
          <input type="password" id="pwd" name="pwd" placeholder="Пароль"></input>
      </div>
      <div>
          <input class="button" type="submit" value="Войти"></input>
          <p><a href="/untitled/signup">Зарегистрироваться</a></p>
      </div>
  </form>
  </div>
  );
}

export default App;