import React, { Component } from "react";
import StaysCard from "../widgets/StaysCards/staysCard";
import LeftColumn from "./staysLayout";
import style from "./stays.css";

class Stays extends Component {
    render() {
        return (
            <div className={style.staysComponent}>
                <div className={style.leftColumn}>
                    <LeftColumn />
                </div>

                <StaysCard template="default" loadMore={true} />
            </div>
        );
    }
}

export default Stays;
