import React, { Component } from "react";
import FileUploader from "../widgets/FileUploader/fileUploader";
import style from "./stayForm.css";
import { GetStayByIdRepository, GetAllStayCategories, DeleteStayPhotoRepository } from "../../repository/stay";
import { withTranslation } from "react-i18next";
import { STAY } from "../../config";
import StayMap from "../widgets/StayMap/stayMap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import countrysList from "../../repository/countrysList";
import PropertiesForm from "../PropertiesForm/propertiesForm";
import { connect } from "react-redux";

class StayForm extends Component {
    state = {
        stay: STAY,
        newPhotos: [],
        categories: []
    };

    componentDidMount() {
        if (this.props.getStay) {
            GetStayByIdRepository(this.props.getStay)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        this.props.redirectUser("/my-account")
                    }
                })
                .then(data => {
                    if (this.props.user && this.props.user.username === data.username) {
                        this.setState({ stay: data })
                    }
                    else {
                        this.props.redirectUser("/my-account")
                    }

                });
        }
        else {
            // To set default values in selects
            const stay = this.state.stay
            stay.address.country = "Polska"
            stay.category = "HOTEL"
            this.setState({
                stay: stay
            })
        }

        GetAllStayCategories()
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    this.setState({ categories: data })
                }
            })
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

    stayCategoryOptions = () => {
        return this.state.categories.map((item, i) => {
            return <option key={i} value={item}>{this.props.t(item)}</option>;
        });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.stay, this.state.newPhotos, this.state.properties);
    };

    onDrop = (acceptedFiles) => {
        acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );

        this.setState({
            newPhotos: [...this.state.newPhotos, ...acceptedFiles]
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
            return this.state.newPhotos.map((file, i) => (
                <div className={style.photoContainer} key={i}>
                    <div id={file.name} className={style.deletePhoto} onClick={this.handleUndoUpload}>x</div>
                    <img
                        src={file.preview}
                        key={file.name}
                        alt={file.name}
                        onClick={this.mainPhotoSelected}
                        className={file.name === this.state.stay.mainPhoto ? style.selectedPhoto : null}
                    />
                </div>
            ));
        else return null;
    };

    handlePropertiesInput = (val) => {
        const newStay = {
            ...this.state.stay,
        };
        newStay.properties = val

        this.setState({
            stay: newStay
        });
    }

    handleDeletePhoto = (event) => {
        let newStay = {
            ...this.state.stay,
        };

        newStay.photos = newStay.photos.filter(photo => {
            return photo !== event.target.id
        });

        if (event.target.id === this.state.stay.mainPhoto) {
            newStay.mainPhoto = ""
        }

        this.setState({
            stay: newStay,
        });

        DeleteStayPhotoRepository(event.target.id)
            .catch(err => console.log(err))
    }

    handleUndoUpload = (event) => {
        let photos = this.state.newPhotos
        photos = photos.filter(photo => {
            return photo.name !== event.target.id
        });
        if (event.target.id === this.state.stay.mainPhoto) {
            let newStay = { ...this.state.stay }
            newStay.mainPhoto = ""
            this.setState({
                newPhotos: photos,
                stay: newStay
            });
        } else {
            this.setState({
                newPhotos: photos,
            });
        }

    }

    renderPhotos = () => {
        if (this.state.stay.photos) {
            return this.state.stay.photos.map((item, i) => {
                return (
                    <div className={style.photoContainer} key={i}>
                        <div id={item} className={style.deletePhoto} onClick={this.handleDeletePhoto}>x</div>
                        <div className={style.deletedPhoto}></div>
                        <img
                            src={item}
                            key={i}
                            alt={item}
                            onClick={this.mainPhotoSelected}
                            className={item === this.state.stay.mainPhoto ? style.selectedPhoto : null}
                        />
                    </div>
                )
            })
        }
    }


    render() {
        const { t } = this.props;
        return (
            <div className={style.stayEditCompoment}>
                <form onSubmit={this.handleSubmit} className={style.editForm}>
                    <label>{t("NAME")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "name")}
                        value={this.state.stay.name}
                        maxLength="100"
                        required
                    />
                    <label>{t("CATEGORY")}</label>
                    <select
                        onChange={(event) => this.handleInput(event, "category")}
                        value={this.state.stay.category}
                    >
                        {this.stayCategoryOptions()}
                    </select>
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
                        maxLength="100"
                        required
                    />
                    <label>{t("STREET")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "street")}
                        onBlur={this.mapReposition}
                        value={this.state.stay.address.street}
                        maxLength="100"
                        required
                    />
                    <label>{t("ZIP_CODE")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "zipCode")}
                        onBlur={this.mapReposition}
                        value={this.state.stay.address.zipCode}
                        placeholder="00-000"
                        maxLength="6"
                    />
                    {this.state.stay.address.latitude && (
                        <div className={style.map}>
                            <StayMap
                                position={[
                                    this.state.stay.address.latitude,
                                    this.state.stay.address.longitude,
                                ]}
                                zoom={16}
                            />
                        </div>

                    )}
                    <label>{t("MIN_PRICE")} ({t("CURRENCY_SYMBOL")})</label>
                    <input
                        onChange={(event) => this.handleInput(event, "minPrice")}
                        value={this.state.stay.minPrice}
                        placeholder={t("MIN_PRICE_INFO")}
                        type="number"
                        required
                        min="1"
                    />
                    <label>{t("PHONE_NUMBER")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "phoneNumber")}
                        value={this.state.stay.phoneNumber}
                        maxLength="15"
                    />
                    <label>{t("EMAIL")}</label>
                    <input
                        onChange={(event) => this.handleInput(event, "email")}
                        value={this.state.stay.email}
                        type="email"
                        maxLength="50"
                    />
                    <label>{t("DESCRIPTION")}</label>
                    <textarea
                        onChange={(event) => this.handleInput(event, "description")}
                        value={this.state.stay.description}
                        maxLength="10000"
                    />
                    <label>{t("PHOTOS")}</label>
                    <div className={style.photos}>{this.renderPhotos()}</div>
                    <FileUploader onDrop={this.onDrop} files={this.state.stay.photos} />
                    <div className={style.thumbs}>{this.thumbs()}</div>

                    {!this.state.stay.mainPhoto && (this.state.newPhotos.length || this.state.stay.photos.length) ? <div className={style.selectMainPhoto}>{t("SELECT_MAIN_PHOTO")}</div> : null}

                    <label>{t("PROPERTIES")}</label>
                    <div className={style.properties}>
                        <PropertiesForm handleInput={this.handlePropertiesInput} stay={true} properties={this.state.stay.properties} />
                    </div>

                    <button type="submit" className={style.submitButton}>
                        {this.props.getStay ? t("SAVE") : t("ADD_STAY")}
                    </button>

                    {this.props.handleDelete ? (
                        <button onClick={this.props.handleDelete} className={style.deleteButton}>{t("DELETE_STAY")}</button>
                    ) : null}

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps)(withTranslation()(StayForm))