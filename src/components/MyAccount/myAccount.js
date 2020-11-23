import React from "react";
import { Link } from "react-router-dom";
import style from "./myAccount.css";
import { withTranslation } from "react-i18next";

const MyAccount = (props) => {
    const { t } = props;
    return (
        <div className={style.myAccountComponent}>
            <Link to="/add-stay">{t("ADD_STAY")}</Link>
        </div>
    );
};

export default withTranslation()(MyAccount);
