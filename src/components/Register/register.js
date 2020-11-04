import React from 'react';
//import { Link } from 'react-router-dom';

import style from './register.css'

const Register = (props) => {
        return(
                <div className={style.registerComponent}>
                        <form acton="/register" method="post" className={style.registerForm}>
                                <input type="text" name="username" placeholder="Username"/>
                                <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                                <button type="submit">Register</button>
                        </form>
                </div>
        )
}

export default Register
