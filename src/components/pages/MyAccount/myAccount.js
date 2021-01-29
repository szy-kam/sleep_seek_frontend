import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./myAccount.css";
import { withTranslation } from "react-i18next";
import { GetStaysByUserId } from "../../../repository/stays"
import StaysCard from "../../widgets/StaysCards/staysCard";
import { connect } from "react-redux";
import { GetReservationsByUsernameRepository } from "../../../repository/stay";
import ReservationsForm from "../../ReservationsForm/reservationsForm";


class MyAccount extends Component {
    defaultStaysQuantity = 10;
    state = {
        stays: null,
        page: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        reservations: []
    }
    componentDidMount() {
        GetStaysByUserId(this.props.user.userId, this.state.page, this.state.pageSize)
            .then(response => {
                this.setState({ stays: response })
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch(err => {
                console.log(err);
            })

        GetReservationsByUsernameRepository(this.props.user.userId)
            .then(response => response.json())
            .then(data => {
                this.setState({ reservations: data })
            })
            .catch(err => {
                console.log(err);
            })


    }

    renderMoreHandler = () => {
        GetStaysByUserId(this.props.user.userId, this.state.page + 1, this.state.pageSize)
            .then((response) => {
                this.setState({ stays: [...this.state.stays, ...response], page: this.state.page + 1 });
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            });
    };


    render() {
        const { t } = this.props;
        return (
            <div className={style.myAccountComponent}>
                <h1>{t("MY_ACCOUNT")}</h1>
                <button className={style.addStayButton}><Link to="/add-stay">{t("ADD_STAY")}</Link></button>
                <div>
                    <h3>{t("YOURS_RESERVATIONS")}</h3>
                    {this.state.reservations.length ? <ReservationsForm reservations={this.state.reservations} template="edit" /> : t('NO_RESERVATIONS')}
                </div>
                <div>
                    <h3>{t("YOURS_STAYS")}</h3>
                    <StaysCard stays={this.state.stays} template="edit" loadMore={this.state.loadMore} renderMoreHandler={this.renderMoreHandler} />
                </div>

            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.user.user
})
export default connect(mapStateToProps)(withTranslation()(MyAccount));
