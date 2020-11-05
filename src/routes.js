import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import Stays from './components/Stays/stays';
import SignIn from './components/SignIn/singIn'
import Register from './components/Register/register'
import MyAccount from './components/MyAccount/myAccount'

class Routes extends Component {

    state = {
        user: null
    }

    userAuth = (v=true) => {
        this.setState({
            user: v
        })
    }

    render(){
        return(
            <Layout user={this.state.user} userAuth={this.userAuth}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/stays" exact component={Stays}/>
                    {/* <Route path="/sign-in" exact component={SignIn} /> */}
                    <Route path="/sign-in" exact render={(props) => (
                        <SignIn {...props} userAuth={this.userAuth} />
                    )} />

                    <Route path="/register" exact component={Register}/>
                    <Route path="/my-account" exact component={MyAccount}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;