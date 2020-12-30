import React, { Component } from "react";
import style from "./accomodationForm.css";
import { GetAccomodationById } from "../../../repository/stay";
import { withTranslation } from "react-i18next";

class AccomodationForm extends Component {
    state = {
        accomodation: {
            id: null,
            stayId: null,
            sleepersCapacity: "",
            quantity: "",
            price: ""
        }
    };

    componentDidMount() {
        if (this.props.stayId)
            GetAccomodationById(this.props.getAccomodation).then((response) =>
                this.setState({ accomodation: response })
            );
    }

    handleInput = (event, field) => {
        const newAccomodation = {
            ...this.state.accomodation,
        };

        newAccomodation[field] = event.target.value;
        newAccomodation["stayId"] = this.props.stayId


        this.setState({
            accomodation: newAccomodation,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.accomodation);
    };


    render() {
        const { t } = this.props;

        return (
            <div className={style.accomodationFormCompoment}>
                <form onSubmit={this.handleSubmit} className={style.accomodationForm}>
                    <label>{t("SLEEPERS_CAPACITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "sleepersCapacity")}
                        value={this.state.accomodation.sleepersCapacity}
                    />
                    <label>{t("PRICE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "price")}
                        value={this.state.accomodation.price}
                    />
                    <label>{t("QUANTITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "quantity")}
                        value={this.state.accomodation.quantity}
                    />
                    <button type="submit">
                        {this.props.stayId ? t("EDIT_ACCOMODATION") : t("ADD_ACCOMODATION")}
                    </button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(AccomodationForm);
