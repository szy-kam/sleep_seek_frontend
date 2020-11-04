import React from 'react';
import style from './layout.css'

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = (props) => {

        return(
            <div className={style.mainContainer}>
                <Header user={props.user} userAuth={props.userAuth} />
                {props.children}
                <Footer/>
            </div>
        )

}

export default Layout;