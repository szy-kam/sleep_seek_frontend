import React from "react";
import { Link } from "react-router-dom";
import style from "./myAccount.css";
import { withTranslation } from "react-i18next";
import { GetStaysByUserId } from "../../repository/stays"
import StaysCard from "../widgets/StaysCards/staysCard";

const MyAccount = (props) => {
    const { t } = props;
    let stays

    GetStaysByUserId(4, 0, 5)
        .then(response => {
            console.log(response);
            stays = response.data
        })
        .catch((err) => {
            console.log(err);
        })

    return (
        <div className={style.myAccountComponent}>
            <Link to="/add-stay">{t("ADD_STAY")}</Link>
            <StaysCard stays={stays} template="edit" />

        </div>
    );
};

export default withTranslation()(MyAccount);
