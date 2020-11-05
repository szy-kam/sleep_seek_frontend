import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import style from './header.css'


class Nav extends Component{

    items = [
        {
            text: 'Home',
            link: '/',
            loggedIn: true,
            loggedOut: true
        },
        {
            text: 'Stays',
            link: '/stays',
            loggedIn: true,
            loggedOut: true
        },
        {
            text: 'My account',
            link: '/my-account',
            loggedIn: true,
            loggedOut: false
        },
        {
            text: 'Sign in',
            link: '/sign-in',
            loggedIn: false,
            loggedOut: true
        },
        {
            text: 'Sign out',
            link: '/',
            loggedIn: true,
            loggedOut: false
        }, 
        {
            text: 'Register',
            link: '/register',
            loggedIn: false,
            loggedOut: true
        }
    ]

    logOutUser = () => {
        console.log("wylogowuje")
        this.props.userAuth(null);
    }

    showItems = () => {
        return this.items.map( (item,i) =>{
            if((this.props.user === null && item.loggedOut) || (this.props.user !== null && item.loggedIn) )
                return (
                    <div key={i} className={style.navlink}>
                        <NavLink to={item.link} onClick={item.text === 'Sign out' ? this.logOutUser : null}>
                            {item.text}
                        </NavLink>
                    </div>
                )
            else {
                return null
            }

        } )
    }

    render(){
        return (
            <nav>
                {this.showItems()}
            </nav>
        )
    }

}
export default Nav;
