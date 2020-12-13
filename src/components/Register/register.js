import React, { Component } from "react";
import { AddUserRepository } from "../../repository/user";
import style from "./register.css";
import { withTranslation } from "react-i18next";

class Register extends Component {
    state = {
        form: {
            username: "",
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
        const { t } = this.props;
        AddUserRepository(this.state.form)
            .then(() => this.setState({ message: t("ACCOUNT_CREATED") }))
            .catch(() => this.setState({ message: t("ERROR") }));
    };

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/sign-in");
        }, 3000);
    };

    message = () => {
        if (this.state.message)
            return (
                <div className={style.message}>
                    {this.state.message}
                    {/* {this.redirectUser()} */}
                </div>
            );
        else return null;
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.registerComponent}>
                {this.message()}
                <form onSubmit={this.submitForm} className={style.registerForm}>
                    <input
                        type="text"
                        placeholder={t("USERNAME")}
                        value={this.state.form.username}
                        onChange={(event) => this.handleInput(event, "username")}
                    />
                    <input
                        type="text"
                        placeholder={t("EMAIL")}
                        value={this.state.form.email}
                        onChange={(event) => this.handleInput(event, "email")}
                    />
                    <input
                        type="password"
                        placeholder={t("PASSWORD")}
                        value={this.state.form.password}
                        onChange={(event) => this.handleInput(event, "password")}
                        autoComplete="off"
                    />
                    <button type="submit">{t("REGISTER")}</button>
                </form>
            </div>
        );
    }
}
export default withTranslation()(Register);
