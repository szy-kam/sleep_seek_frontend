import React from 'react'
import style from './properties.css'
import { useTranslation } from "react-i18next";
import 'font-awesome/css/font-awesome.min.css';

const Properties = (props) => {

    const matchIco = (name) => {
        switch (name) {
            case 'PARKING': return "parking";
            case '24h': return "clock";
            case "BATH": return "bath";
            case "SHOWER": return "shower";
            case 'TV': return 'TV';
            case 'USER_PLUS': return "user-plus";
            case "COOLING": return "snowflake-o";
            case "PARKING": return "parking";
            case "GYM": return "dumbbell";
            case "POOL": return "swimmer";
            case "RESTAURANT": return "utensils";
            case "WIFI": return "wifi";
            case "RECEPTION24H": return "history";
            case "PETS_ALLOWED": return "paw";
            case "CARD_ACCEPTED": return "money-check";
            case "DISABLED_ACCESSIBLE": return "wheelchair";
            case "BAR": return "cocktail";
            default: return null
        }
    }

    const { t } = useTranslation()

    const renderProperties = () => {
        if (Array.isArray(props.properties)) {
            return props.properties.map((item, i) => (
                <div className={style.property} key={i}>
                    <i className={`fa fa-${matchIco(item)}`}></i>
                    {t(item)}
                </div>
            ))
        }
    }

    return (
        <div className={style.propertiesComponent}>
            {renderProperties()}
        </div>
    )

}
export default Properties