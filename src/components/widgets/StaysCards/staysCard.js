import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import style from "./staysCard.css";
import { GetStayAverageRatingById } from "../../../repository/stay";

const StaysCard = (props) => {

    const renderMore = () => {
        const { t } = props;
        return (
            <button className={style.showMoreButton} onClick={props.renderMoreHandler}>
                {t("SHOW_MORE")}
            </button>
        );
    }

    const getAverageRating = (id) => {
        GetStayAverageRatingById(id)
            .then(response => { console.log(response); return response })
    }

    const renderCards = (template, stays) => {
        const { t } = props;
        if (stays) {
            switch (template) {
                case "default":
                    return (
                        <div className={style.staysContainerT1}>
                            {stays.map((item, i) => (
                                <div key={i} className={style.staysCardT1}>
                                    <div className={style.left}>
                                        <div className={style.image}>
                                            {item.mainPhoto && <Link to={`/stays/${item.id}`}>
                                                <img src={item.mainPhoto} alt={item.name}></img>
                                            </Link>}
                                        </div>
                                    </div>
                                    <div className={style.right}>
                                        <div className={style.name}>
                                            <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                        </div>
                                        <div className={style.address}>
                                            {item.address.city}
                                        </div>
                                        <div className={style.averageRating}>
                                            {getAverageRating(item.id)}
                                        </div>
                                        <div className={style.price}>
                                            {t("FROM")} <span className={style.priceAmount}>{item.minPrice}</span> {t("CURRENCY_SYMBOL")}
                                        </div>
                                        <div className={style.itemButton}>
                                            <Link to={`/stays/${item.id}`}>
                                                <button >
                                                    {t("VIEW_MORE")}
                                                </button>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                case "mini":
                    return (
                        <div className={style.staysContainerT2}>
                            {stays.map((item, i) => (
                                <div key={i} className={style.staysCardT2}>
                                    <div className={style.image}>
                                        {item.mainPhoto && <Link to={`/stays/${item.id}`}>
                                            <img src={item.mainPhoto} alt={item.name}></img>
                                        </Link>}
                                    </div>
                                    <div className={style.name}>
                                        <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                    </div>
                                    <div className={style.price}>
                                        {item.minPrice} {t("CURRENCY_SYMBOL")}
                                    </div>
                                    <Link to={`/stays/${item.id}`}>
                                        <button className={style.itemButton}>{t("VIEW_MORE")}</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    );
                case "edit":
                    return (
                        <div className={style.staysContainerT1}>
                            {stays.map((item, i) => (
                                <div key={i} className={style.staysCardT1}>
                                    <div className={style.left}>
                                        <div className={style.image}>
                                            {item.mainPhoto && <Link to={`/stays/${item.id}`}>
                                                <img src={item.mainPhoto} alt={item.name}></img>
                                            </Link>}
                                        </div>
                                    </div>
                                    <div className={style.right}>
                                        <div className={style.name}>
                                            <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                        </div>
                                        <div className={style.address}>
                                            {t("ADDRESS")}: {item.address.city}, {item.address.street}
                                        </div>
                                        <div className={style.price}>
                                            {item.minPrice} {t("CURRENCY_SYMBOL")}
                                        </div>
                                        <Link to={`/stays/edit/${item.id}`}>
                                            <button className={style.itemButton}>
                                                {t("EDIT_STAY")}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                default:
                    return <p>No template choosen.</p>;
            }
        }
    }

    return (
        <div className={style.staysCardComponent}>
            {renderCards(props.template, props.stays)}
            {props.loadMore ? renderMore() : null}
        </div>
    );
}

export default withTranslation()(StaysCard);
