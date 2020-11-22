import React, { Component } from "react";
import {
    GetStayByIdRepository,
    EditStayRepository,
    DeleteStayByIdRepository,
} from "../../repository/stay";
import StayForm from "../widgets/StayForm/stayForm";
import style from "./stay.css";

class EditStay extends Component {
    state = {
        message: "",
        stay: null,
    };

    componentDidMount() {
        GetStayByIdRepository(this.props.match.params.id).then((response) =>
            this.setState({ stay: response }, console.log(response))
        );
    }

    submitForm = (stay) => {
        EditStayRepository(stay).then(() => this.setState({ message: "Edited" }));
    };

    handleDelete = () => {
        DeleteStayByIdRepository(this.state.stay.id).then(() =>
            this.setState({ message: "Deleted" })
        );
    };

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push("/");
        }, 2000);
    };

    message = () => {
        if (this.state.message)
            return (
                <div className={style.message}>
                    {" "}
                    {this.state.message} {this.redirectUser()}{" "}
                </div>
            );
        else return null;
    };

    render() {
        return (
            <div className={style.stayEditCompoment}>
                {this.message()}
                <StayForm
                    handleInput={this.handleInput}
                    stay={this.state.stay}
                    handleSubmit={this.submitForm}
                    handleDelete={this.handleDelete}
                    getStay={this.props.match.params.id}
                />
                <button className={style.deleteButton} onClick={this.handleDelete}>
                    Delete stay
                </button>
            </div>
        );
    }
}
export default EditStay;
