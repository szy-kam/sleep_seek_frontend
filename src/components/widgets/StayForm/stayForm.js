import React, { Component } from "react";
import FileUploader from "../FileUploader/fileUploader";
import style from "./stayForm.css";
import { GetStayByIdRepository } from "../../../repository/stay";
import { withTranslation } from "react-i18next";
import { STAY } from "../../../config";
import StayMap from "../StayMap/stayMap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import countrysList from "../../../repository/countrysList";

class StayForm extends Component {
    state = {
        stay: STAY,
    };

    componentDidMount() {
        if (this.props.getStay)
            GetStayByIdRepository(this.props.getStay).then((response) =>
                this.setState({ stay: response })
            );
    }

    handleInput = (event, field) => {
        const newStay = {
            ...this.state.stay,
        };

        if (["city", "street", "zipCode", "country"].indexOf(field) >= 0)
            newStay.address[field] = event.target.value;
        else newStay[field] = event.target.value;

        this.setState({
            stay: newStay,
        });
    };

    mapReposition = () => {
        const address =
            this.state.stay.address.street +
            " " +
            this.state.stay.address.city +
            " " +
            this.state.stay.address.zipCode +
            " " +
            this.state.stay.address.country;

        if (address.length > 5) {
            const provider = new OpenStreetMapProvider();
            provider.search({ query: address }).then((result) => {
                if (result.length >= 1) {
                    const newStay = {
                        ...this.state.stay,
                    };
                    newStay.address.longitude = result[0].x;
                    newStay.address.latitude = result[0].y;
                    this.setState({
                        stay: newStay,
                    });
                } else {
                    const newStay = {
                        ...this.state.stay,
                    };
                    newStay.address.longitude = null;
                    newStay.address.latitude = null;
                    this.setState({
                        stay: newStay,
                    });
                }
            });
        }
    };

    countrysOptions = () => {
        return countrysList.map((item, i) => {
            return <option key={i}>{item}</option>;
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.stay, this.state.newPhotos);
    };

    onDrop = (acceptedFiles) => {

        acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );

        this.setState({
            newPhotos: acceptedFiles,
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
        if (this.state.newPhotos && this.state.newPhotos.length > 0)
            return this.state.newPhotos.map((file) => (
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
        const { t } = this.props;

        return (
            <div className={style.stayEditCompoment}>
                <form onSubmit={this.handleSubmit} className={style.editForm}>
                    <label>{t("NAME")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "name")}
                        value={this.state.stay.name}
                    />
                    <label>{t("COUNTRY")}</label>
                    <select
                        onChange={(event) => this.handleInput(event, "country")}
                        value={this.state.stay.address.country}
                    >
                        {this.countrysOptions()}
                    </select>
                    <label>{t("CITY")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "city")}
                        onBlur={this.mapReposition}
                        value={this.state.stay.address.city}
                    />
                    <label>{t("STREET")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "street")}
                        onBlur={this.mapReposition}
                        value={this.state.stay.address.street}
                    />
                    <label>{t("ZIP_CODE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "zipCode")}
                        onBlur={this.mapReposition}
                        value={this.state.stay.address.zipCode}
                    />
                    {this.state.stay.address.latitude && (
                        <StayMap
                            position={[
                                this.state.stay.address.latitude,
                                this.state.stay.address.longitude,
                            ]}
                            zoom={16}
                        />
                    )}
                    <label>{t("MIN_PRICE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "minPrice")}
                        value={this.state.stay.price}
                    />
                    <label>{t("PHONE_NUMBER")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "phoneNumber")}
                        value={this.state.stay.contactInfo}
                    />
                    <label>{t("EMAIL")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "email")}
                        value={this.state.stay.contactInfo}
                    />
                    <label>{t("DESCRIPTION")}</label>
                    <textarea
                        onChange={(event) => this.handleInput(event, "description")}
                        value={this.state.stay.description}
                    />
                    <label>{t("PHOTOS")}</label>
                    <FileUploader onDrop={this.onDrop} files={this.state.stay.photos} />
                    <div className={style.thumbs}>{this.thumbs()}</div>

                    {!this.state.stay.mainPhoto ? t("SELECT_MAIN_PHOTO") : null}

                    <button type="submit">
                        {this.props.getStay ? t("EDIT_STAY") : t("ADD_STAY")}
                    </button>

                    {this.props.handleDelete ? (
                        <button onClick={this.props.handleDelete}>{t("DELETE_STAY")}</button>
                    ) : null}
                    
                </form>
            </div>
        );
    }
}
export default withTranslation()(StayForm);
