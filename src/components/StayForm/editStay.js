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

    submitForm = (stay, files) => {
        this.setState({ showPopup: true, message: "SAVING_STAY" })
        const { t } = this.props;
        EditStayRepository(stay, files)
            .then((response) => {
                if (response.ok) {
                    this.setState({ message: t("STAY_EDITED") })
                    this.redirectUser()
                }
                else {
                    console.log(response);
                    this.setState({ message: t(`ERROR_${response.status}`) })
                }
            });
    };

    handleDelete = (e) => {
        const { t } = this.props;
        e.preventDefault();
        DeleteStayByIdRepository(this.props.match.params.id)
            .then(() =>
                this.setState({ message: t("STAY_DELETED") })
            );
    };

    redirectUser = () => {
        this.props.history.push("/my-account");
    };

    submitAccomodationForm = (accomodationForm) => {
        console.log(accomodationForm);
    }


    scrollToBottom = () => {
        const { messageList } = this.refs;
        messageList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

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
                    handleSubmit={this.submitForm}
                    handleDelete={this.handleDelete}
                    getStay={this.props.match.params.id}
                />
                <Link to={`/stays/editAccommodations/${this.props.match.params.id}`}><button>{t('EDIT_ACCOMMODATIONS')}</button></Link>
            </div>
        );
    }
}
export default withTranslation()(EditStay);
