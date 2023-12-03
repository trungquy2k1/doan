//import thu vien
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

//import component
import './Login.css';
import config from '../../../configRoute';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="logincontainer">
            <h1>Đăng nhập</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Tên người dùng:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div>
                    <NavLink to={config.routes.home}>
                        <button className="btnlogin">Login</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
