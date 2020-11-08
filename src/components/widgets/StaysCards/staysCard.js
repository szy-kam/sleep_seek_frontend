import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StaysCardRepository } from "../../../repository/stays";
import style from "./staysCard.css";

class StaysCard extends Component {
    state = {
        stays: [],
        page: 0,
        size: 3,
        end: false,
    };

    componentDidMount() {
        StaysCardRepository(this.state.page, this.state.size).then((response) =>
            this.setState({ stays: response })
        );
    }

    renderMoreHandler = () => {
        StaysCardRepository(this.state.page, this.state.size).then((response) => {
            this.setState({ stays: [...this.state.stays, ...response], page: this.state.page + 1 });
            if (response.length < this.state.size) this.setState({ end: true });
        });
    };

    renderMore() {
        return (
            <button className={style.showMoreButton} onClick={this.renderMoreHandler}>
                Show more
            </button>
        );
    }

    renderCards(template, stays) {
        switch (template) {
            case "default":
                return (
                    <div className={style.staysContainerT1}>
                        {stays.map((item, i) => (
                            <div key={i} className={style.staysCardT1}>
                                <div className={style.left}>
                                    <div className={style.image}>
                                        <Link to={`/stays/${item.id}`}>
                                            <img
                                                src={`https://picsum.photos/15${i}.jpg`}
                                                alt=""
                                            ></img>
                                        </Link>
                                    </div>
                                </div>
                                <div className={style.right}>
                                    <div className={style.name}>
                                        <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                    </div>
                                    <div className={style.address}>
                                        Address: {item.address.city}, {item.address.street}
                                    </div>
                                    <div className={style.price}>{item.price} zł</div>
                                    <Link to={`/stays/${item.id}`}>
                                        <button className={style.itemButton}>View more</button>
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
                                        <img src={`https://picsum.photos/15${i}.jpg`} alt=""></img>
                                    </Link>
                                </div>
                                <div className={style.name}>
                                    <Link to={`/stays/${item.id}`}>{item.name}</Link>
                                </div>
                                <div className={style.price}>{item.price} zł</div>
                                <Link to={`/stays/${item.id}`}>
                                    <button className={style.itemButton}>View more</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <p>No card template choosen.</p>;
        }
    }

    render() {
        return (
            <div className={style.staysCardComponent}>
                {this.renderCards(this.props.template, this.state.stays)}
                {this.props.loadMore && !this.state.end ? this.renderMore() : null}
            </div>
        );
    }
}

export default StaysCard;
