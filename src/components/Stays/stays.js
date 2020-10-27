
import React, {Component} from 'react';
import StaysCard from '../widgets/StaysCards/staysCard'

class Stays extends Component{

    render(){
        return (
            <div>
                Stays
                <StaysCard template="default"/>
            </div>
        )
    }
}

export default Stays;