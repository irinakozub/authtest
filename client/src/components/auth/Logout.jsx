import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../styles/auth.css';
import Input from '../../utils/Input.jsx';
import {logout} from '../../actions/user';

const Logout = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  return (
    <div className="auth">
        <div className="auth_header">Вы действительно хотите выйти?</div>
        <button className='auth_btn' onClick={()=> dispatch(logout())}>Да</button>
    </div>
  );
};

export default Logout;