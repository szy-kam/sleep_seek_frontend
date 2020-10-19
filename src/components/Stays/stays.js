
import React, {Component} from 'react';

import {StaysCardRepository} from '../../repository/Stays'
import StaysCard from '../widgets/StaysCards/staysCard'

class Stays extends Component{

    state = {
        stays: []
    }
    

    componentDidMount() {
        StaysCardRepository().then(response => this.setState({ stays: response}))
    }



    render(){
        return (
            <div>
                Stays
                <StaysCard stays={this.state.stays} />
            </div>
        )
    }
}

export default Stays;