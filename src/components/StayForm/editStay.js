import React, { Component } from "react";
import {
    EditStayRepository,
    DeleteStayByIdRepository,
} from "../../repository/stay";
import StayForm from "./stayForm";
import style from "./stay.css";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingComponent from "../widgets/LoadingComponent/loadingComponent";
import PopupComponent from "../widgets/PopupComponent/popupComponent";

class EditStay extends Component {
    state = {
        message: "",
        showPopup: false
    };

    handleSubmit = (stay, files) => {
        this.setState({ showPopup: true, message: "SAVING_STAY" })
        const { t } = this.props;
        EditStayRepository(stay, files)
            .then((response) => {
                if (response.ok) {
                    this.redirectUser()
                }
                else {
                    console.log(response);
                    this.setState({ message: t(`ERROR_${response.status}`) })
                }
            })
    };

    handleDelete = (e) => {
        e.preventDefault();
        DeleteStayByIdRepository(this.props.match.params.id)
            .then(() =>
                this.redirectUser()
            );
    };

    redirectUser = (url = "/my-account") => {
        this.props.history.push(url);
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.editStayCompoment}>
                {this.state.showPopup && <PopupComponent >
                    <h3>{t(this.state.message)}</h3>
                    <LoadingComponent />
                </PopupComponent>}
                <StayForm
                    handleInput={this.handleInput}
                    stay={this.state.stay}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                    getStay={this.props.match.params.id}
                    redirectUser={this.redirectUser}
                />
                <Link to={`/stays/editAccommodations/${this.props.match.params.id}`}><button>{t('EDIT_ACCOMMODATIONS')}</button></Link>
            </div>
        );
    }
}
export default withTranslation()(EditStay);
