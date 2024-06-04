import React, { useState } from 'react';
import './App.css';

function App() {
  const [pwdNotEquals, setPwdNotEquals] = useState(false);
  const [notUniqueEmail, setNotUniqueEmail] = useState(false);
  const [notUniqueUsername, setNotUniqueUsername] = useState(false); 
  function handleSubmit(event) {
    event.preventDefault();
    let url = "/untitled/signup";
    const data = new FormData(event.target);
    if (data.get("pwd") !== data.get("pwdCheck")) {
      console.log(data.get("pwd") + ":" + data.get("pwdCheck"));
      setPwdNotEquals(true);
      // ###
      setNotUniqueEmail(false);
      setNotUniqueUsername(false);
    } else {
      const base64encodedPwdandLogin = btoa(data.get("uname") + ":" + data.get("pwd"));
      const base64encodedEmailandAbout = btoa(data.get("email") + ":" + data.get("about"));
      fetch(url, {method:'POST', crossDomain:true,
        headers: {'Content-Type':'application/json','Registration': 'Basic ' + base64encodedPwdandLogin + ' Other ' + base64encodedEmailandAbout}})
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.replace("/untitled/login");
          } else if (data.status === "nonUniqueEmail") {
            setNotUniqueEmail(true);
            // ###
            setNotUniqueUsername(false);
            setPwdNotEquals(false);
          } else if (data.status === "nonUniqueName") {
            setNotUniqueUsername(true);
            // ###
            setNotUniqueEmail(false);
            setPwdNotEquals(false);
          }
        }).catch(function(err) {  
          if (err.message === 'Network Error') {
            alert("Ошибка соединения");
          }
        });
    }
  }

  return (
    <div>
      <header className="login__header">
          <h2>
              <svg className="icon">
                  <use xlinkHref="#icon-lock" />
              </svg>
              KitchenMate
          </h2>
      </header>
      <form onSubmit={handleSubmit} className="login__form" method="POST">
          <div>
              {notUniqueUsername && (<label htmlFor="uname" id="warning" style={{color: "red"}}>Данное имя пользователя уже существует!</label>)}
              {!notUniqueUsername && (<label htmlFor="uname">Имя пользователя</label>)}
              <input type="text" id="uname" name="uname" placeholder="Имя пользователя"></input>
          </div>
          <div>
              <label htmlFor="pwd">Пароль</label>
              <input type="password" id="pwd" name="pwd" placeholder="Пароль"></input>
          </div>
          <div>
              {pwdNotEquals && (<label htmlFor="pwdCheck" id="warning" style={{color: "red"}}>Пароли не совпадают!</label>)}
              {!pwdNotEquals && (<label htmlFor="pwdCheck">Подтверждение пароля</label>)}
              <input type="password" id="pwdCheck" name="pwdCheck" placeholder="Подтвердите пароль"></input>
          </div>
          <div>
              {notUniqueEmail && (<label htmlFor="email" id="warning" style={{color: "red"}}>Почта занята!</label>)}
              {!notUniqueEmail && (<label htmlFor="email">Почта</label>)}
              <input type="email" id="email" name="email" placeholder="Введите e-mail"></input>
          </div>
          <div>
              <label htmlFor="about">О себе</label>
              <textarea rows="4" className="bigInput" name="about" id="about" cols="25" placeholder="Расскажите немного о себе"></textarea>
          </div>
          <div>
              <input className="button" type="submit" value="Зарегистрироваться"></input>
          </div>
      </form>
    </div> );
}

export default App;