import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../redux/user/userActions";

class SignIn extends Component {
    state = {
        form: {
            email: "",
            password: "",
        },
        message: null,
    };

    handleInput = (event, field) => {
        const newForm = {
            ...this.state.form,
        };
        newForm[field] = event.target.value;

        this.setState({
            form: newForm,
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        // TODO validation
        this.props.logInUser({userId: 1, role: "admin"})
        // this.props.history.push("/");
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.signInComponent}>
                <form className={style.signInForm} onSubmit={this.submitForm}>
                    <input
                        type="text"
                        placeholder={t("EMAIL")}
                        value={this.state.form.email}
                        onChange={(event) => this.handleInput(event, "email")}
                        autoComplete="on"
                    />
                    <input
                        type="password"
                        placeholder={t("PASSWORD")}
                        value={this.state.form.password}
                        onChange={(event) => this.handleInput(event, "password")}
                        autoComplete="on"
                    />
                    <button type="submit">{t("LOG_IN")}</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logInUser: (user) => dispatch(logInUser(user)),
});


export default connect(null, mapDispatchToProps)(withTranslation()(SignIn));
