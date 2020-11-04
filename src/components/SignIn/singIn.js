import React from 'react';
//import { Link } from 'react-router-dom';

import style from './signIn.css'

const SignIn = (props) => {

        return(
                <div className={style.signInComponent}>
                        <form  className={style.signInForm}>
                                <input type="text" name="username" placeholder="Username" autoComplete="on"/>
                                <input type="password" name="password" placeholder="Password" autoComplete="on"/>
                                <button onClick={props.userAuth}>Log in</button>
                        </form>
                </div>
        )
}

export default SignIn
