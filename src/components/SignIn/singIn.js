import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";

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
        this.props.userAuth(true);
        this.props.history.push("/");
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

export default withTranslation()(SignIn);
