import React, {useEffect} from 'react';
import Main from './Main';
import Navbar from './navbar/Navbar';
import Registration from './auth/Registration';
import Logout from './auth/Logout';
import Login from './auth/Authorization';
import '../styles/app.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from "react-redux";
import {auth} from '../actions/user'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth())
  }, [])
  console.log("In App is Auth: "+ isAuth)
  const isAuthBool = isAuth.token === undefined
  console.log("In App is Auth Bool: "+ isAuthBool)
  return (
    <BrowserRouter>
      <div className="app">
        <Helmet>
          <meta charSet = "utf-8"/>
          <title>Auth Test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Helmet>
        <div className="app_navbar">
          <Navbar/>
        </div>  
        <div className="wrap">
          {!isAuth ?
            <Routes>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
            :
            <Routes>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/registration" element={<Main/>}/>
              <Route path="/login" element={<Main/>}/>
              <Route path="/main" element={<Main/>}/>
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
