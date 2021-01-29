import React, { Component } from "react";
import { GetStaysRepository } from "../../../repository/stays";
import StaySliderTemplates from "./staySliderTemplates";
import style from './staysSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class StaysSlider extends Component {
    state = {
        stays: [],
    };

    componentDidMount() {
        GetStaysRepository(0, 3).then((response) => this.setState({ stays: response }));
    }

    render() {
        return (
        <div className={style.staySliderComponent}>
            <StaySliderTemplates
                stays={this.state.stays}
                template={this.props.template}
                settings={this.props.settings}
                height={this.props.height}
            />
        </div>
        );
    }
}

export default StaysSlider;
