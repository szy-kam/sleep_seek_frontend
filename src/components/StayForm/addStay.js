import React, { Component } from "react";
import { AddStayRepository } from "../../repository/stay";
import StayForm from "./stayForm";
import style from "./stay.css";
import { withTranslation } from "react-i18next";

class AddStay extends Component {

    state = {
        message: ""
    }

    handleSubmit = (stay, files) => {
        const { t } = this.props;
        AddStayRepository(stay, files)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            const editUrl = `/stays/editAccommodations/${data}`
                            this.redirectUser(editUrl)
                            this.setState({ message: t("STAY_ADDED") })
                        })
                }
                else {
                    response.json().then(data => {
                        console.log(data);
                    })
                    this.setState({ message: t(`ERROR_${response.status}`) })
                }
            });
    };

    redirectUser = (url = "/") => {
        setTimeout(() => {
            this.props.history.push(url);
        }, 2000);
    };

    message = () => {
        if (this.state.message)
            return (
                <div className={style.message}>
                    {this.state.message}
                </div>
            );
        else return null;
    };

    render() {
        return (
            <div className={style.addStayCompoment}>
                {this.message()}
                <StayForm
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
export default withTranslation()(AddStay);
