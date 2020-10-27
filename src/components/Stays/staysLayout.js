import React, { Component } from 'react';
import StaysCard from '../widgets/StaysCards/staysCard'

class LeftColumn extends Component {

    state = {
    }

    render(){
        return(
            <StaysCard template="mini" loadMore={false}/>
        )
    }

}

export default LeftColumn ;