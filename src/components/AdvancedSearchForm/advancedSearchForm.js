import React, { useState } from 'react'
import style from './advancedSearchForm.css'
import countrysList from "../../repository/countrysList";
import { withTranslation } from "react-i18next";
import PropertiesForm from '../PropertiesForm/propertiesForm'
import { GetAllStayCategories } from "../../repository/stay";
import DataPicker, { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { myCustomLocale } from '../Reservation/reservation'

const AdvancedSearch = (props) => {

    const inputsInit = {
        name: "",
        country: "Polska",
        city: "",
        category: "Hotel",
        priceFrom: "10",
        priceTo: "1000",
    }
    const [inputs, setInputs] = useState(inputsInit);
    const [properties, setProperties] = useState([]);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    const countrysOptions = () => {
        return countrysList.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    };

    const stayCategoryOptions = () => {
        const categories = GetAllStayCategories();
        return categories.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    }

    const handleInput = (event, field) => {
        const newInputs = {
            ...inputs
        };

        newInputs[field] = event.target.value;

        setInputs(newInputs);
    };

    const handlePropertiesInput = (val) => {
        if (val !== properties)
            setProperties(val);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchParams = Object.assign({ propertice: properties }, inputs)
        if(selectedDayRange.from && selectedDayRange.to){
            searchParams.dateFrom = myCustomLocale.toNativeDate(selectedDayRange.from)
            searchParams.dateTo = myCustomLocale.toNativeDate(selectedDayRange.to)
        }
        props.handleSubmit(searchParams)
    }


    const { t } = props;
    return (
        <div className={style.advancedSearchComponent}>
            <form onSubmit={handleSubmit} className={style.advancedSearchForm}>
                <label>{t("NAME")}</label>
                <input
                    onChange={(event) => handleInput(event, "name")}
                    value={inputs.name}
                    type="text"
                />
                <label>{t("CATEGORY")}</label>
                <select
                    onChange={(event) => handleInput(event, "category")}
                    value={inputs.category}
                >
                    {stayCategoryOptions()}
                </select>
                <label>{t("DATE_RANGE")}</label>
                <DataPicker
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                    minimumDate={utils().getToday()}
                    locale={myCustomLocale}
                    inputPlaceholder={t('CLICK_HERE')}
                    calendarClassName={"style.calendar"}
                />
                <label>{t("COUNTRY")}</label>
                <select
                    onChange={(event) => handleInput(event, "country")}
                    value={inputs.country}
                >
                    {countrysOptions()}
                </select>
                <label>{t("CITY")}</label>
                <input
                    onChange={(event) => handleInput(event, "city")}
                    value={inputs.city}
                    type="text"
                />
                <label>{t("PRICE_FROM")}</label>
                <div>{inputs.priceFrom}</div>
                <input
                    onChange={(event) => handleInput(event, "priceFrom")}
                    value={inputs.priceFrom}
                    type="range" step="10" min="10" max="1000"
                />
                <label>{t("PRICE_TO")}</label>
                <div>{inputs.priceTo}</div>
                <input
                    onChange={(event) => handleInput(event, "priceTo")}
                    value={inputs.priceTo}
                    type="range" step="10" min="10" max="1000"
                />

                <label>{t("PROPERTIES")}</label>
                <PropertiesForm handleInput={handlePropertiesInput} stay={true} />

                <button type="submit">
                    {t("SEARCH")}
                </button>
            </form>
        </div>
    )
}
export default withTranslation()(AdvancedSearch)