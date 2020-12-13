import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StaysCardRepository } from "../../../repository/stays";
import { withTranslation } from "react-i18next";
import style from "./staysCard.css";

class StaysCard extends Component {
    defaultStaysQuantity = 4;

    state = {
        stays: [],
        page: 0,
        size: this.defaultStaysQuantity,
        endLoading: false,
    };

    componentDidMount() {
        if (!this.props.stays) {
            StaysCardRepository(this.state.page, this.state.size)
                .then((response) => {
                    this.setState({ stays: response })
                    if (response.length < this.state.size) this.setState({ endLoading: true });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            this.setState({stays: this.props.stays})
        }
    }

    renderMoreHandler = () => {
        StaysCardRepository(this.state.page + 1, this.state.size).then((response) => {
            this.setState({ stays: [...this.state.stays, ...response], page: this.state.page + 1 });
            if (response.length < this.state.size) this.setState({ endLoading: true });
        });
    };

    renderMore() {
        const { t } = this.props;
        return (
            <button className={style.showMoreButton} onClick={this.renderMoreHandler}>
                {t("SHOW_MORE")}
            </button>
        );
    }

    renderCards(template, stays) {
        const { t } = this.props;
        switch (template) {
            case "default":
                return (
                    <div className={style.staysContainerT1}>
                        {stays.map((item, i) => (
                            <div key={i} className={style.staysCardT1}>
                                <div className={style.left}>
                                    <div className={style.image}>
                                        <Link to={`/stays/${item.id}`}>
                                            <img src={item.mainPhoto} alt={item.name}></img>
                                        </Link>
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
                                        {item.price} {t("CURRENCY_SYMBOL")}
                                    </div>
                                    <Link to={`/stays/${item.id}`}>
                                        <button className={style.itemButton}>
                                            {t("VIEW_MORE")}
                                        </button>
                                    </Link>
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
                                    <Link to={`/stays/${item.id}`}>
                                        <img src={item.mainPhoto} alt={item.name}></img>
                                    </Link>
                                </div>
                                <div className={style.name}>
                                    <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                </div>
                                <div className={style.price}>
                                    {item.price} {t("CURRENCY_SYMBOL")}
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
                                        <Link to={`/stays/${item.id}`}>
                                            <img src={item.mainPhoto} alt={item.name}></img>
                                        </Link>
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
                                        {item.price} {t("CURRENCY_SYMBOL")}
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

    render() {
        return (
            <div className={style.staysCardComponent}>
                {this.renderCards(this.props.template, this.state.stays)}
                {this.props.loadMore && !this.state.endLoading ? this.renderMore() : null}
            </div>
        );
    }
}

export default withTranslation()(StaysCard);
