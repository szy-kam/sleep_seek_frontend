import React from 'react';
import style from './signIn.css'

const SignIn = (props) => {

        const logInUser = (event) => {
                event.preventDefault()
                props.userAuth(true);
                props.history.push('/')
            }
        

        return(
                
                <div className={style.signInComponent}>
                        <form  className={style.signInForm} >
                                <input type="text" name="username" placeholder="Username" autoComplete="on"/>
                                <input type="password" name="password" placeholder="Password" autoComplete="on"/>
                                <button onClick={logInUser}>Log in</button>
                        </form>
                
                </div>
        )
}

export default SignIn
