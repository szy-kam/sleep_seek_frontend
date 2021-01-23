import React, { Component } from "react";
import { AddStayRepository } from "../../repository/stay";
import StayForm from "../widgets/StayForm/stayForm";
import style from "./stay.css";
import { withTranslation } from "react-i18next";
import AccomodationEdit from "../AccomodationEdit/accomodationEdit";

class AddStay extends Component {

    state = {
        message: ""
    }

    handleSubmit = (stay, files) => {
        const { t } = this.props;
        AddStayRepository(stay, files)
            .then((response) => {
                if (response.ok) {
                    this.setState({ message: t("STAY_ADDED") })
                }
                else {
                    console.log(response);
                    response.json().then(data => {
                        console.log(data);
                    })
                    this.setState({ message: t("ERROR") })
                }
            });
    };

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/");
        }, 2000);
    };

    message = () => {
        if (this.state.message)
            return (
                <div className={style.message}>
                    {" "}
                    {this.state.message} {this.redirectUser()}{" "}
                </div>
            );
        else return null;
    };

    render() {
        return (
            <div className={style.stayEditCompoment}>
                {this.message()}
                <StayForm
                    handleSubmit={this.handleSubmit}
                />
                <AccomodationEdit
                    stayId={this.props.match.params.id}
                    handleSubmit={this.submitAccomodationForm}
                />
            </div>
        );
    }
}
export default withTranslation()(AddStay);
