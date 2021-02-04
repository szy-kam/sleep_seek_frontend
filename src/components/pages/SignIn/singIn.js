import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../../redux/user/userActions";
import { SignInUserRepository } from "../../../repository/user";
import { Link } from "react-router-dom";
import PopupComponent from "../../widgets/PopupComponent/popupComponent";

class SignIn extends Component {
    state = {
        form: {
            username: "",
            password: "",
        },
        message: "",
        showPopup: false
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
                    this.setState({ message: t(`USER_ERROR_${response.status}`), showPopup: true });
                    this.quickMessage()
                }
            })
            .then(token => {
                if (token) {
                    this.props.logInUser({ userToken: token, username: this.state.form.username })
                    this.setState({ message: t("LOGGING"), showPopup: true });
                    this.redirectUser()
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({ message: t(`ERROR`), showPopup: true });
                this.quickMessage()
            })
    }

    redirectUser = () => {
        this.props.history.push("/my-account");
    };

    quickMessage = (time = 1500) => {
        setTimeout(() => {
            this.setState({ showPopup: false });
        }, time);
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.signInComponent}>
                <h1>{t('SIGN_IN')}</h1>
                <form className={style.signInForm} onSubmit={this.submitForm}>
                    <input
                        type="email"
                        placeholder={t("EMAIL")}
                        value={this.state.form.email}
                        onChange={(event) => this.handleInput(event, "username")}
                        autoComplete="on"
                        minLength="5"
                        maxLength="64"
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder={t("PASSWORD")}
                        value={this.state.form.password}
                        onChange={(event) => this.handleInput(event, "password")}
                        autoComplete="on"
                        minLength="1"
                        maxLength="32"
                        required
                    />
                    {/* <div className={style.forgerPassword}><Link to="/forget-password">{t("FORGOT_PASSWORD")}</Link></div> */}
                    <button type="submit">{t("LOG_IN")}</button>
                </form>
                <div>
                    <div><Link to="/register"><button>{t("CREATE_ACCOUNT")}</button></Link></div>
                </div>
                {this.state.showPopup && <PopupComponent >
                    <h3>{t(this.state.message)}</h3>
                </PopupComponent>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logInUser: (user) => dispatch(logInUser(user)),
});

export default connect(null, mapDispatchToProps)(withTranslation()(SignIn));
