import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import auth from "./hoc/auth";
import Layout from "./hoc/Layout/layout";
import Home from "./components/Home/home";
import Stays from "./components/Stays/stays";
import Stay from "./components/Stay/stay";
import EditStay from "./components/Stay/editStay";
import SignIn from "./components/SignIn/singIn";
import Register from "./components/Register/register";
import MyAccount from "./components/MyAccount/myAccount";
import AddStay from "./components/Stay/addStay";
import Reservation from "./components/Reservation/reservation"
import Component404 from "./components/Component404/component404";

class Routes extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={auth(Home, 0)}
                    />
                    <Route
                        path="/stays"
                        exact
                        component={auth(Stays, 0)}
                    />
                    <Route
                        path="/stays/:id"
                        exact
                        component={auth(Stay, 0)}
                    />
                    <Route
                        path="/stays/edit/:id"
                        exact
                        component={auth(EditStay, 0)}
                    />
                    <Route
                        path="/add-stay"
                        exact
                        component={auth(AddStay, 0)}
                    />
                    <Route
                        path="/sign-in"
                        exact
                        component={auth(SignIn, 0)}
                    />
                    <Route
                        path="/register"
                        exact
                        component={auth(Register, 0)}
                    />
                    <Route
                        path="/my-account"
                        exact
                        component={auth(MyAccount, 1)}
                    />
                    <Route
                        path="/reservation/:stayId/:accomodationId"
                        exact
                        component={auth(Reservation, 1)}
                    />
                    <Route
                        path="/404"
                        exact
                        component={auth(Component404, 0)}
                    />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;
