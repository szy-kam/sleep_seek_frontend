import React, { Component } from "react";
import { AddStayRepository } from "../../repository/stay";
import StayForm from "./stayForm";
import style from "./stay.css";
import { withTranslation } from "react-i18next";
import PopupComponent from "../widgets/PopupComponent/popupComponent";
import LoadingComponent from "../widgets/LoadingComponent/loadingComponent";

class AddStay extends Component {

    state = {
        message: "",
        showPopup: false,
    }

    handleSubmit = (stay, files) => {
        this.setState({ showPopup: true, message: "ADDING_STAY" })
        const { t } = this.props;
        AddStayRepository(stay, files)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            this.setState({ message: t("STAY_ADDED"), showPopup: true })
                            const editUrl = `/stays/editAccommodations/${data}`
                            this.redirectUser(editUrl)
                        })
                }
                else {
                    response.json().then(err => {
                        console.log(err);
                    })
                    this.setState({ message: t(`ERROR_${response.status}`) })
                    this.quickMessage()
                }
            });
    };

    redirectUser = (url = "/my-account") => {
        this.props.history.push(url);
    }

    quickMessage = (time = 1500) => {
        setTimeout(() => {
            this.setState({ showPopup: false });
        }, time);
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.addStayCompoment}>
                {this.state.showPopup && <PopupComponent >
                    <h3>{t(this.state.message)}</h3>
                    <LoadingComponent />
                </PopupComponent>}
                <StayForm
                    handleSubmit={this.handleSubmit}
                    redirectUser={this.redirectUser}
                />
            </div>
        );
    }
}
export default withTranslation()(AddStay);
