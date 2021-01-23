import React, { Component } from "react";
import {
    GetStayByIdRepository,
    EditStayRepository,
    DeleteStayByIdRepository,
} from "../../repository/stay";
import StayForm from "../widgets/StayForm/stayForm";
import style from "./stay.css";
import { withTranslation } from "react-i18next";
import AccomodationEdit from "../AccomodationEdit/accomodationEdit";

class EditStay extends Component {
    state = {
        message: "",
        stay: null,
    };

    componentDidMount() {
        GetStayByIdRepository(this.props.match.params.id).then((response) =>
            this.setState({ stay: response })
        );
    }

    submitForm = (stay) => {
        const { t } = this.props;
        EditStayRepository(stay)
            .then((response) => {
                if (response.ok) {
                    this.setState({ message: t("STAY_EDITED") })
                }
                else {
                    console.log(response);
                    this.setState({ message: t("ERROR_") })
                }
            });
    };

    handleDelete = (e) => {
        const { t } = this.props;
        e.preventDefault();
        DeleteStayByIdRepository(this.state.stay.id).then(() =>
            this.setState({ message: t("STAY_DELETED") })
        );
    };

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/");
        }, 2000);
    };

    submitAccomodationForm = (accomodationForm) => {
        console.log(accomodationForm);
    }

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
                    handleInput={this.handleInput}
                    stay={this.state.stay}
                    handleSubmit={this.submitForm}
                    handleDelete={this.handleDelete}
                    getStay={this.props.match.params.id}
                />
                <AccomodationEdit
                    stayId={this.props.match.params.id}
                    handleSubmit={this.submitAccomodationForm}
                />
            </div>
        );
    }
}
export default withTranslation()(EditStay);
