import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logOutUser} from "../../redux/user/userActions";

const Nav = (props) => {
    const items = [
        {
            text: props.t("NAV_HOME"),
            link: "/",
            loggedIn: true,
            loggedOut: true,
        },
        {
            text: props.t("NAV_STAYS"),
            link: "/stays",
            loggedIn: true,
            loggedOut: true,
        },
        {
            text: props.t("NAV_MY_ACCOUNT"),
            link: "/my-account",
            loggedIn: true,
            loggedOut: false,
        },
        {
            text: props.t("NAV_SIGN_IN"),
            link: "/sign-in",
            loggedIn: false,
            loggedOut: true,
        },
        {
            text: props.t("NAV_SIGN_OUT"),
            link: "/",
            loggedIn: true,
            loggedOut: false,
            signOut: true,
        },
        {
            text: props.t("NAV_REGISTER"),
            link: "/register",
            loggedIn: false,
            loggedOut: true,
        },
    ];

    const logOutUser = () => {
        props.logOutUser()
    };

    const showItems = () => {
        return items.map((item, i) => {
            if (
                (props.user === null && item.loggedOut) ||
                (props.user !== null && item.loggedIn)
            )
                return (
                    <div key={i} className={style.navlink}>
                        <NavLink to={item.link} onClick={item.signOut ? logOutUser : null}>
                            {item.text}
                        </NavLink>
                    </div>
                );
            else {
                return null;
            }
        });
    };

    
    return <nav>{showItems()}</nav>;
    
}

const mapDispatchToProps = (dispatch)=> ({
    logOutUser: () => dispatch(logOutUser())
})
const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Nav));
