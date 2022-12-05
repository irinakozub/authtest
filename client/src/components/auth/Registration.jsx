import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../styles/auth.css';
import Input from '../../utils/Input.jsx';
import {registration} from '../../actions/user'

const Registration = () => {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  return (
    <div className="auth">
        <div className="auth_header">Регистрация</div>
        <label className="authorizationauth_label">ФИО</label>
        <Input value={username} setValue={setUsername} type="text" placeholder="ФИО"/>
        <label className="authorizationauth_label">Роль</label>
        <Input value={role} setValue={setRole} type="text" placeholder="only admin" style="color:#000000"/>
        <label className="authorizationauth_label">Email</label>
        <Input value={email} setValue={setEmail} type="email" placeholder="Email"/>
        <label className="authorizationauth_label">Пароль</label>
        <Input value={password} setValue={setPassword} type="password" placeholder="Пароль"/>
        <button className='auth_btn' 
          onClick={()=> dispatch(registration(username, role, email, password))}>
          Зарегистрироваться</button>
    </div>
  );
};

export default Registration;
