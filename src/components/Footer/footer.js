import React, { Component } from "react";
import { Link } from "react-router-dom";

import style from "./footer.css";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className={style.container}>
                    <div className={style.col}>
                        <img src="/images/logo.png" alt="logo" className={style.logo} />
                        <div className={style.info}>
                            <span>Firma Kszak</span>
                            <span>ul. Polna 33</span>
                            <span>61-028 Pewel Wielka</span>
                            <span>+48 801 801 801 </span>
                        </div>
                    </div>
                    <div className={style.col}>
                        <h3>Dokumenty</h3>
                        <span>Regulamin</span>
                        <span>Polityka prywatności</span>
                    </div>
                    <div className={style.col}>
                        <h3>Dla właścicieli</h3>
                        <span><Link to="/add-stay">Dodaj obiekt</Link></span>
                        <span>Współpraca</span>
                    </div>
                    <div className={style.col}>
                        <h3>Zobacz również</h3>
                        <span>Aplikacja na Android</span>
                        <span>Aplikacja na iOS</span>
                    </div>
                </div>
                <div className={style.copyright}>Copyright © SleepSeek </div>
            </footer >
        );
    }
}

export default Footer;
