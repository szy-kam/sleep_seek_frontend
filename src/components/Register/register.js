import React, { Component } from "react";
import { AddUserRepository } from "../../repository/user";
import style from "./register.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../redux/user/userActions";

class Register extends Component {
    state = {
        form: {
            displayName: "",
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
        e.preventDefault();
        const { t } = this.props;
        AddUserRepository(this.state.form)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ message: t("ACCOUNT_CREATED") })
                    // GetUserIdByEmail(this.state.form.email)
                    //     .then(data => {
                    //         data.json()
                    //             .then(id => {
                    //                 this.props.logInUser({ userId: id })
                    //             })
                    //     })
                }
                else {
                    this.setState({ message: t(`USER_ERROR_${response.status}`) });
                }
            })
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
                    {this.redirectUser()}
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
                        placeholder={t("DISPLAY_NAME")}
                        value={this.state.form.displayName}
                        onChange={(event) => this.handleInput(event, "displayName")}
                        required
                        autofocus
                    />
                    <input
                        type="email"
                        placeholder={t("EMAIL")}
                        value={this.state.form.username}
                        onChange={(event) => this.handleInput(event, "username")}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t("PASSWORD")}
                        value={this.state.form.password}
                        onChange={(event) => this.handleInput(event, "password")}
                        autoComplete="off"
                        required
                    />
                    <button type="submit">{t("REGISTER")}</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    logInUser: (user) => dispatch(logInUser(user)),
});

export default connect(null, mapDispatchToProps)(withTranslation()(Register));
