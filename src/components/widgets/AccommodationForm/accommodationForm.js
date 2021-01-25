import React, { Component } from "react";
import style from "./accommodationForm.css";
import { withTranslation } from "react-i18next";
import PropertiesForm from '../../PropertiesForm/propertiesForm'

class AccommodationForm extends Component {
    state = {
        accommodation: {
            id: this.props.accommodation.id,
            stayId: this.props.accommodation.stayId || this.props.stayId,
            sleepersCapacity: this.props.accommodation.sleepersCapacity || "",
            quantity: this.props.accommodation.quantity || "",
            price: this.props.accommodation.price || ""
        },
        properties: []
    };

    handleInput = (event, field) => {
        const newAccommodation = {
            ...this.state.accommodation,
        };

        newAccommodation[field] = event.target.value;
        newAccommodation["stayId"] = this.props.stayId

        this.setState({
            accommodation: newAccommodation,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.accommodation);
    };

    handleDelete = () => {
        this.props.handleDelete(this.props.accommodation.id);
    };

    handlePropertiesInput = (val) => {
        if (val !== this.state.properties)
            this.setState({
                properties: val,
            });
    }

    render() {
        const { t } = this.props;
        return (
            <div className={style.accommodationFormCompoment}>
                <form onSubmit={this.handleSubmit} className={style.accommodationForm}>
                    <label>{t("SLEEPERS_CAPACITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "sleepersCapacity")}
                        value={this.state.accommodation.sleepersCapacity}
                        type="number"
                    />
                    <label>{t("PRICE")} ({t("CURRENCY_SYMBOL")})</label>
                    <input
                        onChange={(event) => this.handleInput(event, "price")}
                        value={this.state.accommodation.price}
                        type="number"
                    />
                    <label>{t("QUANTITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "quantity")}
                        value={this.state.accommodation.quantity}
                        type="number"
                    />
                    <PropertiesForm accommodation={true} accommodationId={this.props.accommodation.id} handleInput={this.handlePropertiesInput} />
                    <button onClick={this.handleDelete} type="button">
                        {t("DELETE")}
                    </button>
                    <button type="submit">
                        {t("SAVE_ACCOMMODATION")}
                    </button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(AccommodationForm);
