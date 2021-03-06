import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import style from "./staysCard.css";

const StaysCard = (props) => {

    const renderMore = () => {
        const { t } = props;
        return (
            <button className={style.showMoreButton} onClick={props.renderMoreHandler}>
                {t("SHOW_MORE")}
            </button>
        );
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
                                    <div className={style.image}>
                                        {item.mainPhoto ? <Link to={`/stays/${item.id}`}>
                                            <img src={item.mainPhoto} alt={item.name}></img>
                                        </Link>: <Link to={`/stays/${item.id}`}>
                                            <img src={"/images/placeholder1.png"} alt={"item placeholder sleepseek"}></img>
                                        </Link>}
                                    </div>
                                    <div className={style.cardBody}>
                                        <div className={style.left}>
                                            <div className={style.name}>
                                                <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                            </div>
                                            <div className={style.address}>
                                                {item.address.city}
                                            </div>
                                            <div className={style.avgRate}>
                                                {item.avgRate && item.avgRate !== "0" && <div className={style.avgRateIco}>
                                                    {item.avgRate}
                                                </div>}
                                            </div>
                                        </div>
                                        <div className={style.right}>
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
                case "photo":
                    return (
                        <div className={style.staysContainerPhoto}>
                            {stays.map((item) => (
                                <Link to={`/stays/${item.id}`} key={item.id}>
                                    <div className={style.staysCardPhoto}>
                                        <div className={style.image} style={{ backgroundImage: `url(${item.mainPhoto})` }}>
                                        </div>
                                        {item.address.city ? <div className={style.city}>
                                            {item.address.city}
                                        </div> : null}
                                    </div>
                                </Link>
                            ))
                            }
                        </div >
                    );
                case "edit":
                    return (
                        <div className={style.staysContainerT1}>
                            {stays.map((item, i) => (
                                <div key={i} className={style.staysCardT1}>
                                    <div className={style.image}>
                                        {item.mainPhoto && <Link to={`/stays/${item.id}`}>
                                            <img src={item.mainPhoto} alt={item.name}></img>
                                        </Link>}
                                    </div>
                                    <div className={style.cardBody}>
                                        <div className={style.left}>
                                            <div className={style.name}>
                                                <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                            </div>
                                            <div className={style.address}>
                                                {item.address.city}
                                            </div>
                                            <div className={style.avgRate}>
                                                {item.avgRate && item.avgRate !== "0" && <div className={style.avgRateIco}>
                                                    {item.avgRate}
                                                </div>}
                                            </div>
                                        </div>
                                        <div className={style.right}>
                                            <div className={style.itemButton}>
                                                <Link to={`/stays/edit/${item.id}`}>
                                                    <button>
                                                        {t("EDIT_STAY")}
                                                    </button>
                                                </Link>
                                                <Link to={`/stays/editAccommodations/${item.id}`}>
                                                    <button >
                                                        {t("EDIT_ACCOMMODATIONS")}
                                                    </button>
                                                </Link>
                                                <Link to={`/reservationsEdit/${item.id}`}>
                                                    <button >
                                                        {t("SHOW_RESERVATIONS")}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
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
