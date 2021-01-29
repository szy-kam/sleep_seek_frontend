import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import auth from "./hoc/auth";
import Layout from "./hoc/Layout/layout";
import Home from "./components/pages/Home/home";
import Stays from "./components/pages/Stays/stays";
import Stay from "./components/pages/Stay/stay";
import EditStay from "./components/StayForm/editStay";
import AddStay from "./components/StayForm/addStay";
import SignIn from "./components/pages/SignIn/singIn";
import Register from "./components/pages/Register/register";
import MyAccount from "./components/pages/MyAccount/myAccount";
import Reservation from "./components/pages/Reservation/reservation"
import Component404 from "./components/Component404/component404";
import AccomodationEdit from "./components/AccomodationEdit/accomodationEdit";
import ReservationsEdit from "./components/ReservationsEdit/reservationsEdit";

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
                        component={auth(EditStay, 1)}
                    />
                    <Route
                        path="/stays/editAccommodations/:id"
                        exact
                        component={auth(AccomodationEdit, 1)}
                    />
                    <Route
                        path="/add-stay"
                        exact
                        component={auth(AddStay, 1)}
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
                        path="/reservation/:stayId/:accommodationId"
                        exact
                        component={auth(Reservation, 1)}
                    />
                    <Route
                        path="/reservationsEdit/:stayId"
                        exact
                        component={auth(ReservationsEdit, 1)}
                    />
                    <Route
                        component={auth(Component404, 0)}
                    />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;
