import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../styles/auth.css';
import Input from '../../utils/Input.jsx';
import {login} from '../../actions/user';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  return (
    <div className="auth">
        <div className="auth_header">Вход</div>

        <label className="auth_label">Email</label>
        <Input value={email} setValue={setEmail} type="email" placeholder="Email"/>
        <label className="auth_label">Пароль</label>
        <Input value={password} setValue={setPassword} type="password" placeholder="Пароль"/>

        <button className='auth_btn' 
          onClick={()=> dispatch(login(email, password))}>
          Войти</button>
    </div>
  );
};

export default Login;
