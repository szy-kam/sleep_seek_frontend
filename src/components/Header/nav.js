import React from 'react'
import { NavLink } from 'react-router-dom';
import style from './header.css'

const Nav = () => {

    const items = [
        {
            text: 'Home',
            link: '/'
        },
        {
            text: 'Stays',
            link: '/stays'
        }
    ]

    const showItems = () => {
        return items.map( (item,i) =>{
            return (
                <div key={i} className={style.navlink}>
                    <NavLink to={item.link}>
                        {item.text}
                    </NavLink>
                </div>
            )
        } )
    }

    return (
        <nav>
            {showItems()}
        </nav>
    )
}
export default Nav;
