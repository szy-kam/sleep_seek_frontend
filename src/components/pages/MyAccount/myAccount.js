import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./myAccount.css";
import { withTranslation } from "react-i18next";
import { GetStaysByUsername } from "../../../repository/stays"
import StaysCard from "../../widgets/StaysCards/staysCard";
import { connect } from "react-redux";
import { GetReservationsByUsernameRepository } from "../../../repository/stay";
import { GetUsernameByTokenRepository } from '../../../repository/user'
import ReservationsForm from "../../ReservationsForm/reservationsForm";
import LoadingComponent from "../../widgets/LoadingComponent/loadingComponent";
import { logOutUser } from "../../../redux/user/userActions";

class MyAccount extends Component {
    defaultStaysQuantity = 20;
    state = {
        stays: null,
        page: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        reservations: [],
        isLoadingStays: true,
        isLoadingReservations: true
    }
    componentDidMount() {

        GetUsernameByTokenRepository(this.props.user.userToken)
            .then((response) => {
                if (!response.ok) {
                    this.props.logOutUser()
                }
            })

        GetStaysByUsername(this.props.user.username, this.state.page, this.state.pageSize)
            .then(response => {
                this.setState({ stays: response, isLoadingStays: false })
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch(err => {
                this.setState({ isLoadingStays: false })
                console.log(err);
            })

        GetReservationsByUsernameRepository(this.props.user.username)
            .then(response => response.json())
            .then(data => {
                this.setState({ reservations: data, isLoadingReservations: false })
            })
            .catch(err => {
                this.setState({ isLoadingReservations: false })
                console.log(err);
            })


    }

    renderMoreHandler = () => {
        GetStaysByUsername(this.props.user.username, this.state.page + 1, this.state.pageSize)
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
                <Link to="/add-stay" className={style.addStayButton}><button >{t("ADD_STAY")}</button></Link>
                <div>
                    <h3>{t("YOURS_RESERVATIONS")}</h3>
                    {!this.state.isLoadingReservations ? this.state.reservations.length ? <ReservationsForm reservations={this.state.reservations} template="edit" /> : t('NO_RESERVATIONS') : <LoadingComponent />}
                </div>
                <div>
                    <h3>{t("YOURS_STAYS")}</h3>
                    {!this.state.isLoadingReservations ? <StaysCard stays={this.state.stays} template="edit" loadMore={this.state.loadMore} renderMoreHandler={this.renderMoreHandler} /> : <LoadingComponent />}
                </div>

            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.user.user
})
const mapDispatchToProps = (dispatch) => ({
    logOutUser: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MyAccount));
