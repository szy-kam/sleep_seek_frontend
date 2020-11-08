import React, { Component } from "react";
import { GetStayByIdRepository, EditStayRepository, DeleteStayByIdRepository } from "../../repository/stay";
import style from "./stay.css";

class EditStay extends Component {
    state = {
        stay: {
            id: this.props.match.params.id,
            name: "",
            address: {
                city: "",
                street: "",
                zipCode: "",
            },
            mainPhoto: "",
            description: "",
            price: "",
            contactInfo: "",
        },
        images: [],
        message: null,
    };

    componentDidMount() {
        GetStayByIdRepository(this.state.stay.id).then((response) => this.setState({ stay: response }));
    }

    handleInput = (event, field) => {
        const newStay = {
            ...this.state.stay,
        };

        if (["city", "street", "zipCode"].indexOf(field) >= 0)
            newStay.address[field] = event.target.value;
        else newStay[field] = event.target.value;

        this.setState({
            stay: newStay,
        });
    };

    handleUpload() {
        //TODO
    }

    submitForm = (event) => {
        event.preventDefault();
        EditStayRepository(this.state.stay).then(() => this.setState({ message: "Edited" }));
    };

    deleteHandle = () => {
        DeleteStayByIdRepository(this.state.stay.id).then(() => this.setState({ message: "Deleted" }));
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
                <form onSubmit={this.submitForm} className={style.editForm}>
                    <label>Name</label>
                    <input
                        onChange={(event) => this.handleInput(event, "name")}
                        value={this.state.stay.name}
                    />
                    <label>City</label>
                    <input
                        onChange={(event) => this.handleInput(event, "city")}
                        value={this.state.stay.address.city}
                    />
                    <label>Street</label>
                    <input
                        onChange={(event) => this.handleInput(event, "street")}
                        value={this.state.stay.address.street}
                    />
                    <label>Zip Code</label>
                    <input
                        onChange={(event) => this.handleInput(event, "zipCode")}
                        value={this.state.stay.address.zipCode}
                    />
                    <label>Price</label>
                    <input
                        onChange={(event) => this.handleInput(event, "price")}
                        value={this.state.stay.price}
                    />
                    <label>Contact Info</label>
                    <input
                        onChange={(event) => this.handleInput(event, "contactInfo")}
                        value={this.state.stay.contactInfo}
                    />
                    <label>Description</label>
                    <textarea
                        onChange={(event) => this.handleInput(event, "description")}
                        value={this.state.stay.description}
                    />
                    <label>Main Photo LINK</label>
                    <input
                        onChange={(event) => this.handleInput(event, "mainPhoto")}
                        value={this.state.stay.mainPhoto}
                    />
                    <button type="submit">Submit</button>
                </form>
                <button className={style.deleteButton} onClick={this.deleteHandle}>
                    Delete stay
                </button>
            </div>
        );
    }
}
export default EditStay;
