import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./header.css";
import { withTranslation } from "react-i18next";

class Nav extends Component {

    items = [
        {
            text: this.props.t("NAV_HOME"),
            link: "/",
            loggedIn: true,
            loggedOut: true,
        },
        {
            text: this.props.t("NAV_STAYS"),
            link: "/stays",
            loggedIn: true,
            loggedOut: true,
        },
        {
            text: this.props.t("NAV_MY_ACCOUNT"),
            link: "/my-account",
            loggedIn: true,
            loggedOut: false,
        },
        {
            text: this.props.t("NAV_SIGN_IN"),
            link: "/sign-in",
            loggedIn: false,
            loggedOut: true,
        },
        {
            text: this.props.t("NAV_SIGN_OUT"),
            link: "/",
            loggedIn: true,
            loggedOut: false,
            signOut: true
        },
        {
            text: this.props.t("NAV_REGISTER"),
            link: "/register",
            loggedIn: false,
            loggedOut: true,
        },
    ];

    logOutUser = () => {
        this.props.userAuth(null);
    };

    showItems = () => {
        return this.items.map((item, i) => {
            if (
                (this.props.user === null && item.loggedOut) ||
                (this.props.user !== null && item.loggedIn)
            )
                return (
                    <div key={i} className={style.navlink}>
                        <NavLink
                            to={item.link}
                            onClick={item.signOut? this.logOutUser : null}
                        >
                            {item.text}
                        </NavLink>
                    </div>
                );
            else {
                return null;
            }
        });
    };

    render() {
        return <nav>{this.showItems()}</nav>;
    }
}
export default withTranslation()(Nav);
