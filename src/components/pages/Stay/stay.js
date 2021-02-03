import React, { Component } from "react";
import { GetStayByIdRepository } from "../../../repository/stay";
import { withTranslation } from "react-i18next";
import style from "./stay.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { STAY } from "../../../config";
import { connect } from "react-redux";
import { dateRangeChange } from "../../../redux/stay/stayActions";
import StayMap from '../../widgets/StayMap/stayMap'
import Reviews from "../../Reviews/reviews";
import Accommodation from "../../Accommodation/accommodation";
import Properties from '../../Properties/properties'
import DatePicker from '../../widgets/DatePicker/datePicker'

class Stay extends Component {
    state = {
        stay: STAY,
        images: [],
        photoIndex: 0,
        isOpen: false,
    };

    getStay = () => {
        GetStayByIdRepository(this.props.match.params.id)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                else {
                    console.log(resp);
                    this.props.history.push("/404");
                }
            })
            .then((stay) => {
                if (stay.name) { this.setState({ stay: stay }); }
                else {
                    this.props.history.push("/404");
                }
            })
            .catch(err => {
                console.log(err)
                this.props.history.push("/404");
            })
    }

    componentDidMount() {
        this.getStay();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getStay()
        }
    }

    imageGrid() {
        if (this.state.stay.photos)
            return this.state.stay.photos.map((item, i) => (
                <img
                    src={item}
                    key={i}
                    alt={item}
                    onClick={() => this.setState({ isOpen: true, photoIndex: i })}
                ></img>
            ));
        else return null;
    }

    lightbox() {
        const { photoIndex, isOpen } = this.state;
        const { photos: images } = this.state.stay;
        return (
            isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                        })
                    }
                />
            )
        );
    }

    handleDateSelect = (date) => {
        if (date.from !== this.props.dateRange.from || date.to !== this.props.dateRange.to) {
            this.props.dateRangeChange(date)
        }
    }

    renderContent = () => {
        const { t } = this.props;
        if (this.state.stay.name) {
            const position = [this.state.stay.address.latitude, this.state.stay.address.longitude];
            return <div className={style.stayContent}>
                <div className={style.stayInfo}>
                    {this.state.stay.photos.length > 1 && <div className={style.imageGrid}>{this.imageGrid()}</div>}
                    {this.state.stay.photos.length === 1 && <div className={style.singleImage}>{this.imageGrid()}</div>}
                    <div className={style.nameAndAddress}>
                        <div className={style.name}>
                            {this.state.stay.name}
                        </div>
                        <div className={style.address}>
                            {this.state.stay.address.street}{" "}{this.state.stay.address.city},{" "}
                            {this.state.stay.address.zipCode}{" "}{this.state.stay.address.country}
                        </div>
                    </div>
                    <div className={style.contact}>
                        <div className={style.contacUs}>{t('CONTACT_US')}!</div>
                        <div><span className={style.contactDetail}>{t('PHONE')}: </span>{this.state.stay.phoneNumber}</div>
                        <div><span className={style.contactDetail}>{t('EMAIL')}: </span>{this.state.stay.email}</div>
                    </div>
                    <div className={style.description}>{this.state.stay.description}</div>

                </div>

                {this.state.stay.properties.length > 0 && <h3 className={style.title}>{t('PROPERTIES')}:</h3>}
                <Properties properties={this.state.stay.properties} />
                <h3 className={style.title}>{t('ACCOMMODATIONS')}:</h3>
                <div className={style.datePickerContainer}>
                    <span>Aby wyświetlić dostępnośc pokoi, wybierz datę pobytu</span>
                    <DatePicker handleDateSelect={this.handleDateSelect} />
                </div>
                <Accommodation stayId={this.props.match.params.id} dateRange={this.props.dateRange} />
                {this.state.stay.address.longitude && <h3 className={style.title}>{t('FIND_US_ON_MAP')}:</h3>}
                <StayMap position={position} zoom={14} />
                <h3 className={style.title}>{t('REVIEWS')}:</h3>
                <Reviews stayId={this.props.match.params.id} />
                {this.lightbox()}
            </div>
        }

    }

    render() {
        console.log(this.state);
        return (
            <div className={style.stayComponent}>
                {this.renderContent()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dateRangeChange: (dateRange) => dispatch(dateRangeChange(dateRange)),
})

const mapStateToProps = state => ({
    dateRange: state.stay.dateRange
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Stay));
