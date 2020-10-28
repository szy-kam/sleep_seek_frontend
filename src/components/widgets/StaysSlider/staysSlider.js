import React, {Component} from 'react';
import {StaysCardRepository} from '../../../repository/Stays'
import StaySliderTemplates from './staySliderTemplates';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class StaysSlider extends Component {

    state = {
        stays: []
    }


    componentDidMount() {
        StaysCardRepository().then(response => this.setState({ stays: response}))
    }
    

    
    render(){
        return (
            <StaySliderTemplates stays={this.state.stays} template={this.props.template} settings={this.props.settings} height={this.props.height}/>
        )
    }
    
}

export default StaysSlider ;