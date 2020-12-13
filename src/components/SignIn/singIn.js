import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../redux/user/userActions";
import { SignInUserRepository } from "../../repository/user";

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
        const { t } = this.props;
        e.preventDefault();
        SignInUserRepository(this.state.form)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ message: t("LOGGED") });
                    this.props.logInUser({ userId: 1, role: "admin" }); //TODO tokeny
                    //this.props.history.push("/");
                } else {
                    this.setState({ message: t(`ERROR ${response.status}`) });
                }
            })
            .catch(() => this.setState({ message: t("ERROR PROMISE") }));
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
