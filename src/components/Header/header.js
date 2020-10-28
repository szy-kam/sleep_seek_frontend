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
                <div className={style.search}>
                    <form action="/search" method="get" className="search">
                        <input type="text" name="q" placeholder="Search"/>
                        <button type="submit"> <img src="http://www.kurshtml.edu.pl/pliki/cse/search_box_icon.png" /></button>
                    </form>
                </div>
                <Nav />
            </header>
        )
    }

}

export default Header;
