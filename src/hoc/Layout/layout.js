import React from "react";
import style from "./layout.css";

import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import './custom.css'

const Layout = (props) => {
    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.innerContainer}>{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
