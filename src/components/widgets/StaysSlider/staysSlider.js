import React, { Component } from "react";
// import { GetStaysWithParamsRepository } from "../../../repository/stays";
import StaySliderTemplates from "./staySliderTemplates";
import style from './staysSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class StaysSlider extends Component {
    // state = {
    //     stays: this.props.stays || [],
    // };

    // componentDidMount() {
    //     GetStaysWithParamsRepository(0, 3, { orderBy: "createdAt", order: "ASC" })
    //     .then(response => response.json())
    //     .then((data) => this.setState({ stays: data }));
    // }

    render() {
        return (
            <div className={style.staySliderComponent}>
                <StaySliderTemplates
                    stays={this.props.stays}
                    template={this.props.template}
                    settings={this.props.settings}
                    height={this.props.height}
                />
            </div>
        );
    }
}

export default StaysSlider;
