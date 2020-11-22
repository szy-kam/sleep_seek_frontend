import React, { Component } from "react";
import FileUploader from "../FileUploader/fileUploader";
import style from "./stayForm.css";
import { GetStayByIdRepository } from "../../../repository/stay";

class StayForm extends Component {
    state = {
        stay: {
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
            photos: [],
            newPhotos: [],
        },
    };

    componentDidMount() {
        if (this.props.getStay)
            GetStayByIdRepository(this.props.getStay).then((response) =>
                this.setState({ stay: response }, console.log(response))
            );
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.stay);
    };

    onDrop = (acceptedFiles) => {
        const newStay = {
            ...this.state.stay,
        };
        acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        newStay.newPhotos = acceptedFiles;

        this.setState({
            stay: newStay,
        });
    };

    mainPhotoSelected = (e) => {
        const newStay = {
            ...this.state.stay,
        };
        newStay.mainPhoto = e.target.alt;
        this.setState({
            stay: newStay,
        });
    };

    thumbs = () => {
        if (this.state.stay.newPhotos && this.state.stay.newPhotos.length > 0)
            return this.state.stay.newPhotos.map((file) => (
                <img
                    src={file.preview}
                    key={file.name}
                    alt={file.name}
                    onClick={this.mainPhotoSelected}
                    className={file.name === this.state.stay.mainPhoto ? style.selectedPhoto : null}
                />
            ));
        else return null;
    };

    render() {
        return (
            <div className={style.stayEditCompoment}>
                <form onSubmit={this.handleSubmit} className={style.editForm}>
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
                    <label>Photos</label>
                    <FileUploader onDrop={this.onDrop} files={this.state.stay.photos} />
                    <div className={style.thumbs}>{this.thumbs()}</div>
                    {!this.state.stay.mainPhoto && "Select main photo"}
                    <button type="submit">Add stay</button>
                    {/* {this.props.handleDelete ? (
                        <button onClick={this.props.handleDelete}>Delete stay</button>
                    ) : null} */}
                </form>
            </div>
        );
    }
}
export default StayForm;
