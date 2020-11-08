import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import auth from './hoc/auth'
import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import Stays from './components/Stays/stays';
import Stay from './components/Stay/stay';
import EditStayRepo from './components/Stay/editStay';
import SignIn from './components/SignIn/singIn'
import Register from './components/Register/register'
import MyAccount from './components/MyAccount/myAccount'
import AddStay from './components/Stay/addStay';



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
                    <Route path="/" exact component={auth(Home, 0, this.state.user, this.userAuth)}/>
                    <Route path="/stays" exact component={auth(Stays, 0, this.state.user, this.userAuth)}/>
                    <Route path="/stays/:id" exact component={auth(Stay, 0, this.state.user, this.userAuth)}/>
                    <Route path="/stays/edit/:id" exact component={auth(EditStayRepo, 0, this.state.user, this.userAuth)}/>
                    <Route path="/add-stay" exact component={auth(AddStay, 0, this.state.user, this.userAuth)}/>
                    <Route path="/sign-in" exact component={auth(SignIn, 0, this.state.user, this.userAuth)} />
                    <Route path="/register" exact component={auth(Register, 0, this.state.user, this.userAuth)}/>
                    <Route path="/my-account" exact component={auth(MyAccount, 1, this.state.user, this.userAuth)}/>
                </Switch>
            </Layout>
           
        )
    }
}

export default Routes;