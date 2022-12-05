import React from 'react';
import {NavLink} from 'react-router-dom'
import '../../styles/navbar.css';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const isAuthBool = isAuth.token === undefined
  console.log("In Navbar is Auth: "+ isAuth)
  console.log("In Navbar isAuthBool: "+ isAuthBool)

  return (
    <div className="navbar">
      <header className="container">
        <div className="navbar_header">Auth</div>
        {!isAuth &&  <div className="navbar_login">
          <NavLink to='login'>Вход</NavLink>
        </div>}
        {!isAuth &&  <div className="navbar_registration">
          <NavLink to='registration'>Регистрация</NavLink>
        </div>}
        {isAuth && <div className="navbar_logout">
          <NavLink to='logout'>Выйти</NavLink>
        </div>}
      </header>
    </div>
  );
}

export default Navbar;
