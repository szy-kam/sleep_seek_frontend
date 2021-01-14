import React, { Component } from "react";
import style from "./signIn.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../redux/user/userActions";
import { GetUsernameByTokenRepository, SignInUserRepository } from "../../repository/user";

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
            // .then((response) => {
            //     if (response.status === 200) {
            //         this.setState({ message: t("LOGGED") });
            //         console.log(response.json());
            //         // console.log('My JWT:', response.headers.get('authorization'));
            //         // this.props.logInUser({ userId: 1, role: "admin" }); //TODO tokeny
            //         //this.props.history.push("/");
            //     } else {
            //         this.setState({ message: t(`USER_ERROR_${response.status}`) });
            //     }
            // })
            .then(response => response.text())
            .then(token => {
                GetUsernameByTokenRepository(token)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
            })
            .catch(() => this.setState({ message: t("USER_ERROR_LOGIN") }));
        }


    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/my-account");
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
            <div className={style.signInComponent}>
                {this.message()}
                <form className={style.signInForm} onSubmit={this.submitForm}>
                    <input
                        type="text"
                        placeholder={t("EMAIL")}
                        value={this.state.form.email}
                        onChange={(event) => this.handleInput(event, "username")}
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
