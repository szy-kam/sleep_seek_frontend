import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../../redux/user/userActions";
import { SignInUserRepository } from "../../../repository/user";
import { Link } from "react-router-dom";

class SignIn extends Component {
    state = {
        form: {
            username: "",
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
        const { t } = this.props;
        e.preventDefault();
        SignInUserRepository(this.state.form)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                else {
                    this.setState({ message: t(`USER_ERROR_${response.status}`) });
                }
            })
            .then(token => {
                if (token) {
                    this.props.logInUser({ userToken: token, userId: this.state.form.username })
                    this.setState({ message: t("LOGGED") });
                }
            })
            .catch(err => console.log(err))
    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/my-account");
        }, 1500);
    };

    message = () => {
        if (this.state.message)
            return (
                <div className={style.message}>
                    {this.state.message}
                    {this.redirectUser()}
                </div>
            );
        else return null;
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.signInComponent}>
                <h1>{t('SIGN_IN')}</h1>
                {this.message()}
                <form className={style.signInForm} onSubmit={this.submitForm}>
                    <input
                        type="text"
                        placeholder={t("EMAIL")}
                        value={this.state.form.email}
                        onChange={(event) => this.handleInput(event, "username")}
                        autoComplete="on"
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder={t("PASSWORD")}
                        value={this.state.form.password}
                        onChange={(event) => this.handleInput(event, "password")}
                        autoComplete="on"
                        required
                    />
                    <div><Link to="/forget-password">{t("FORGOT_PASSWORD")}</Link></div>
                    <button type="submit">{t("LOG_IN")}</button>
                </form>
                <div>
                    <div><Link to="/register"><button>{t("CREATE_ACCOUNT")}</button></Link></div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logInUser: (user) => dispatch(logInUser(user)),
});

export default connect(null, mapDispatchToProps)(withTranslation()(SignIn));
