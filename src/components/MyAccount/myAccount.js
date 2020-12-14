import React from "react";
import { Link } from "react-router-dom";
import style from "./myAccount.css";
import { withTranslation } from "react-i18next";
import { GetStaysByUserId } from "../../repository/stays"
import StaysCard from "../widgets/StaysCards/staysCard";
import { connect } from "react-redux";

const MyAccount = (props) => {
    const { t } = props;
    let stays
    let userId = props.user.userId

    GetStaysByUserId(userId, 0, 5)
        .then(response => {
            stays = response.data
        })
        .catch((err) => {
            console.log(err);
        })

    return (
        <div className={style.myAccountComponent}>
            <Link to="/add-stay">{t("ADD_STAY")}</Link>
            <StaysCard stays={stays} template="edit" loadMore={true}/>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
})
export default connect(mapStateToProps)(withTranslation()(MyAccount));
