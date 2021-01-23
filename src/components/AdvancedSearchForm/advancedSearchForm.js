import React, { Component } from 'react'
import style from './advancedSearchForm.css'
import countrysList from "../../repository/countrysList";
import { withTranslation } from "react-i18next";
import PropertiesForm from '../PropertiesForm/propertiesForm'
import {  GetAllStayCategories } from "../../repository/stay";

class AdvancedSearch extends Component {
    state = {
        inputs: {
            name: "",
            country: "Polska",
            city: "",
            zipCode: "",
            minPrice: "",
            sleepersCapacity: "",
            category: "Hotel"
        },
        properties: [],
    }

    countrysOptions = () => {
        return countrysList.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    };

    stayCategoryOptions = () =>{
        const categories = GetAllStayCategories();
        return  categories.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    }

    handleInput = (event, field) => {
        const newInputs = {
            ...this.state.inputs,
        };

        newInputs[field] = event.target.value;

        this.setState({
            inputs: newInputs,
        });
    };

    handlePropertiesInput = (val) => {
        if (val !== this.state.properties)
            this.setState({
                properties: val,
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const searchParams = Object.assign({propertice: this.state.properties}, this.state.inputs)
        console.log(searchParams);
        this.props.handleSubmit(searchParams)
    }

    render() {
        const { t } = this.props;
        return (
            <div className={style.advancedSearchComponent}>
                <form onSubmit={this.handleSubmit} className={style.advancedSearchForm}>
                    <label>{t("NAME")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "name")}
                        value={this.state.inputs.name}
                    />
                     <label>{t("CATEGORY")}</label>
                    <select
                        onChange={(event) => this.handleInput(event, "category")}
                        value={this.state.inputs.category}
                    >
                        {this.stayCategoryOptions()}
                    </select>
                    <label>{t("COUNTRY")}</label>
                    <select
                        onChange={(event) => this.handleInput(event, "country")}
                        value={this.state.inputs.country}
                    >
                        {this.countrysOptions()}
                    </select>
                    <label>{t("CITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "city")}
                        value={this.state.inputs.city}
                    />
                    <label>{t("ZIP_CODE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "zipCode")}
                        value={this.state.inputs.zipCode}
                    />
                    <label>{t("MIN_PRICE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "minPrice")}
                        value={this.state.inputs.price}
                    />
                    <label>{t("SLEEPERS_CAPACITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "sleepersCapacity")}
                        value={this.state.inputs.price}
                    />

                    <label>{t("PROPERTIES")}</label>
                    <PropertiesForm handleInput={this.handlePropertiesInput} stay={true} />

                    <button type="submit">
                        {t("SEARCH")}
                    </button>
                </form>
            </div>
        )
    }
}
export default withTranslation()(AdvancedSearch)