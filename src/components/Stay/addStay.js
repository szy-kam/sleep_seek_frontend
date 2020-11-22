import React, { Component } from "react";
import { AddStayRepository } from "../../repository/stay";
import StayForm from "../widgets/StayForm/stayForm";
import style from "./stay.css";

class AddStay extends Component {

    state={
        message: ""
    }

    handleSubmit = (stay) => {
        console.log(stay);
        AddStayRepository(stay).then(() => this.setState({ message: "Added" }));
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
                {this.message}
                <StayForm
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
export default AddStay;
