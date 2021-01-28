import React, { Component } from "react";

import style from "./footer.css";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className={style.copyright}>Copyright © SleepSeek </div>
            </footer>
        );
    }
}

export default Footer;
