import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// authLevel == 0 -> dla wszystkich
// authLevel == 1 -> dla zalogowanych
export default function (ComponentToRender, authLevel, user, userAuth) {
    class AuthHandler extends Component {
        state = {};

        render() {
            if (authLevel === 0 || (authLevel === 1 && user !== null)) {
                return <ComponentToRender {...this.props} user={user} userAuth={userAuth} />;
            } else {
                return <Redirect to="/sign-in" />;
            }
        }
    }
    return AuthHandler;
}
