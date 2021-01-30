import React, { Component } from "react";
import { AddUserRepository } from "../../../repository/user";
import style from "./register.css";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logInUser } from "../../../redux/user/userActions";
import PopupComponent from "../../widgets/PopupComponent/popupComponent";

class Register extends Component {
    state = {
        form: {
            displayName: "",
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
        e.preventDefault();
        const { t } = this.props;
        AddUserRepository(this.state.form)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ message: t("ACCOUNT_CREATED") })
                    this.redirectUser()
                    // GetUsernameByEmail(this.state.form.email)
                    //     .then(data => {
                    //         data.json()
                    //             .then(id => {
                    //                 this.props.logInUser({ username: id })
                    //             })
                    //     })
                }
                else {
                    this.setState({ message: t(`USER_ERROR_${response.status}`), showPopup: true });
                    this.quickMessage()
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ message: t("ERROR"), showPopup: true })
                this.quickMessage()
            });
    };

    redirectUser = () => {
        this.props.history.push("/sign-in");
    };

    quickMessage = (time = 1500) => {
        setTimeout(() => {
            this.setState({ showPopup: false });
        }, time);
    };

    render() {
        const { t } = this.props;
        return (
            <div className={style.registerComponent}>
                <h1>{t('REGISTER')}</h1>
                <form onSubmit={this.submitForm} className={style.registerForm}>
                    <input
                        type="text"
                        placeholder={t("DISPLAY_NAME")}
                        value={this.state.form.displayName}
                        onChange={(event) => this.handleInput(event, "displayName")}
                        required
                        autoFocus
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
                        autoComplete="on"
                        required
                    />
                    <button type="submit">{t("REGISTER")}</button>
                </form>
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

export default connect(null, mapDispatchToProps)(withTranslation()(Register));
