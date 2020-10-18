import React, { Component } from 'react';
//import style from './layout.css'

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

class Layout extends Component {

    state = {
    }

    render(){
        return(
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }

}

export default Layout;