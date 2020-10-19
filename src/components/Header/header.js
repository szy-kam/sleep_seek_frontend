import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Nav from './nav'
import style from './header.css'

class Header extends Component {
    state = {

    }

    render(){
        return(
            <header>
                <div className={style.logo}>
                    <Link to='/'><img src="/images/logo.png" alt="logo"></img></Link>
                </div>
                <Nav />
            </header>
        )
    }

}

export default Header;
