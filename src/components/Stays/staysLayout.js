import React, { Component } from "react";
import AdvancedSearch from "../AdvancedSearch/advancedSearch";
import StaysCard from "../widgets/StaysCards/staysCard";
import style from "./stays.css";

class LeftColumn extends Component {
    state = {};

    render() {
        return (
            <div className={style.leftColumn}>
                <AdvancedSearch />
                <StaysCard template="mini" loadMore={false} />
            </div>
        );
    }
}

export default LeftColumn;
