import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import Nav from './nav'
import style from './header.css'

class Header extends Component{

    state = {
        searchInput: null
    }

    searchSubmit = (event) => {
        event.preventDefault();
        this.props.history.push("/search?q=" + encodeURI(this.state.searchInput));

    }

    searchOnChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    render(){
        return(
            <header>
                <div className={style.logo}>
                    <Link to='/'><img src="/images/logo.png" alt="logo"></img></Link>
                </div>
                <div className={style.search}>
                    <form className={style.seachInput}>
                        <input type="text" name="q" placeholder="Search" onChange={this.searchOnChange} />
                        <button type="submit" onClick={this.searchSubmit} > <img src="http://www.kurshtml.edu.pl/pliki/cse/search_box_icon.png" alt="Search ico"/></button>
                    </form>
                </div>
                <Nav user={this.props.user} userAuth={this.props.userAuth} />               
            </header>
        )
    }
}

export default withRouter(Header);
