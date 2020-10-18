import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import Stays from './components/Stays/stays';

class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/stays" exact component={Stays}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;