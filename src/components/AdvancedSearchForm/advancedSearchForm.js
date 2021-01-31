import React, { useState, useEffect } from 'react'
import style from './advancedSearchForm.css'
import countrysList from "../../repository/countrysList";
import { withTranslation } from "react-i18next";
import PropertiesForm from '../PropertiesForm/propertiesForm'
import { GetAllStayCategories } from "../../repository/stay";
import DataPicker, { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { myCustomLocale } from '../pages/Reservation/reservation'

const AdvancedSearch = (props) => {

    const inputsInit = {
        orderBy: "",
        name: "",
        country: "Polska",
        city: "",
        category: "Hotel",
        priceFrom: "10",
        priceTo: "1000",
        maxDistance: "5",
        numberOfPeople: ""
    }
    const [inputs, setInputs] = useState(inputsInit);
    const [properties, setProperties] = useState([]);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        GetAllStayCategories()
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data)
                }
            })
    }, [])

    const countrysOptions = () => {
        return countrysList.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    };

    const stayCategoryOptions = () => {
        return categories.map((item, i) => {
            return <option key={i} value={item}>{props.t(item)}</option>;
        });
    }

    const orderByOptions = () => {
        const options = [
            { id: "name ASC", name: "Nazwa rosnąco" },
            { id: "name DESC", name: "Nazwa malejąco" },
            { id: "price ASC", name: "Cena rosnąco" },
            { id: "price DESC", name: "Cena malejąco" },
            { id: "avgRate ASC", name: "Ocena rosnąco" },
            { id: "avgRate DESC", name: "Ocena malejąco" },
        ]
        //temporarily
        return options.map((item, i) => {
            return <option key={i} value={item.id}>{item.name}</option>;
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
        let searchParams = Object.assign({ propertice: properties }, inputs)
        if (selectedDayRange.from && selectedDayRange.to) {
            searchParams.dateFrom = myCustomLocale.toNativeDate(selectedDayRange.from)
            searchParams.dateTo = myCustomLocale.toNativeDate(selectedDayRange.to)
        }
        const order = searchParams.orderBy.split(' ')
        searchParams.orderBy = order[0] || ""
        searchParams.order = order[1] || ""

        console.log(searchParams);
        props.handleSubmit(searchParams)
    }

    const { t } = props;
    return (
        <div className={style.advancedSearchComponent}>
            <form onSubmit={handleSubmit} className={style.advancedSearchForm}>
                <label>{t("ORDER_BY")}</label>
                <select
                    onChange={(event) => handleInput(event, "orderBy")}
                    value={inputs.orderBy}
                >
                    {orderByOptions()}
                </select>
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
                    colorPrimary="#278abb"
                    colorPrimaryLight="rgb(23 151 211 / 42%)"
                    calendarPopperPosition="bottom"
                    renderFooter={() => (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDayRange({
                                        from: null,
                                        to: null
                                    })
                                }}
                                style={{
                                    padding: '10px 28px',
                                }}
                            >
                                {t('RESET_VALUE')}
                            </button>
                        </div>
                    )}
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
                <label>{t("NUMBER_OF_PEOPLE")}</label>
                <input
                    onChange={(event) => handleInput(event, "numberOfPeople")}
                    value={inputs.numberOfPeople}
                    type="number"
                    min="1"
                    max="200"
                />
                <label>{t("MAX_DISTANCE")}</label>
                <div className={style.priceContainer}>
                    <input
                        onChange={(event) => handleInput(event, "maxDistance")}
                        value={inputs.maxDistance}
                        type="number" step="1" min="1" max="100"
                        className={style.priceInput}
                    />
                    <span>{t("DISTANCE_SYMBOL")}</span>
                </div>
                <input
                    onChange={(event) => handleInput(event, "maxDistance")}
                    value={inputs.maxDistance}
                    type="range" step="1" min="1" max="100"
                />
                <label>{t("PRICE_FROM")}</label>
                <div className={style.priceContainer}>
                    <input
                        onChange={(event) => handleInput(event, "priceFrom")}
                        value={inputs.priceFrom}
                        type="number" min="10" max="1000"
                        className={style.priceInput}
                    />
                    <span>{t("CURRENCY_SYMBOL")}</span>
                </div>
                <input
                    onChange={(event) => handleInput(event, "priceFrom")}
                    value={inputs.priceFrom}
                    type="range" step="10" min="10" max="1000"
                />
                <label>{t("PRICE_TO")}</label>
                <div className={style.priceContainer}>
                    <input
                        onChange={(event) => handleInput(event, "priceTo")}
                        value={inputs.priceTo}
                        type="number" min="10" max="1000"
                        className={style.priceInput}
                    />
                    <span>{t("CURRENCY_SYMBOL")}</span>
                </div>
                <input
                    onChange={(event) => handleInput(event, "priceTo")}
                    value={inputs.priceTo}
                    type="range" step="10" min="10" max="1000"
                />

                <label>{t("PROPERTIES")}</label>
                <PropertiesForm handleInput={handlePropertiesInput} stay={true} />

                <button type="submit" className={style.submitButton}>
                    {t("SEARCH")}
                </button>
            </form>
        </div>
    )
}
export default withTranslation()(AdvancedSearch)