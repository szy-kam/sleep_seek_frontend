import React, { Component } from "react";
import style from "./accommodationForm.css";
import { withTranslation } from "react-i18next";
import PropertiesForm from '../PropertiesForm/propertiesForm'

class AccommodationForm extends Component {
    state = {
        accommodation: {
            id: this.props.accommodation.id,
            stayId: this.props.accommodation.stayId || this.props.stayId,
            sleepersCapacity: this.props.accommodation.sleepersCapacity || "",
            quantity: this.props.accommodation.quantity || "",
            price: this.props.accommodation.price || "",
            properties: this.props.accommodation.properties || []
        }
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
        const newAccommdation = {
            ...this.state.accommodation,
        };
        newAccommdation.properties = val

        this.setState({
            accommodation: newAccommdation
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
                        required
                        min="1"
                    />

                    <label>{t("PRICE")} ({t("CURRENCY_SYMBOL")})</label>
                    <input
                        onChange={(event) => this.handleInput(event, "price")}
                        value={this.state.accommodation.price}
                        type="number"
                        required
                        min="1"
                    />

                    <label>{t("ACCOMMODATION_QUANTITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "quantity")}
                        value={this.state.accommodation.quantity}
                        type="number"
                        required
                        min="1"
                    />
                    <PropertiesForm accommodation={true} properties={this.state.accommodation.properties} handleInput={this.handlePropertiesInput} />

                    {this.state.accommodation.id &&
                        <button onClick={this.handleDelete} type="button" className={style.deleteAccommodationButton}>
                            {t("DELETE")}
                        </button>
                    }

                    <button type="submit" className={style.addAccommodationButton}>
                        {t("SAVE_ACCOMMODATION")}
                    </button>
                </form>
            </div>
        );
    }
}

export default withTranslation()(AccommodationForm);
