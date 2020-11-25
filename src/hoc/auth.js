import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'

// authLevel == 0 -> dla wszystkich
// authLevel == 1 -> dla zalogowanych
export default function (ComponentToRender, authLevel) {
    class AuthHandler extends Component {
        state = {};

        render() {
            if (authLevel === 0 || (authLevel === 1 && this.props.user !== null)) {
                return <ComponentToRender {...this.props} />;
            } else {
                return <Redirect to="/sign-in" />;
            }
        }
    }

    const mapStateToProps = state => ({
        user: state.user.user
    })
    
    return connect(mapStateToProps)(AuthHandler);
}
