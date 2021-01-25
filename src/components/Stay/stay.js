import React, { Component } from "react";
import { GetStayByIdRepository } from "../../repository/stay";
import { withTranslation } from "react-i18next";
import style from "./stay.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { STAY } from "../../config";
import { connect } from "react-redux";
import StayMap from '../widgets/StayMap/stayMap'
import Reviews from "../widgets/Reviews/reviews";
import Accommodation from "../Accommodation/accommodation";
import Properties from '../Properties/properties'

class Stay extends Component {
    state = {
        stay: STAY,
        images: [],
        photoIndex: 0,
        isOpen: false,
    };

    getStay = () => {
        GetStayByIdRepository(this.props.match.params.id)
            .then(resp => resp.json())
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

    renderContent = () => {
        const { t } = this.props;
        if (this.state.stay.name) {
            const position = [this.state.stay.address.latitude, this.state.stay.address.longitude];
            return <div className={style.stayContent}>
                <div className={style.stayInfo}>
                    <div className={style.name}>
                        {this.state.stay.name}
                    </div>
                    <div
                        className={style.image}
                        style={{ backgroundImage: `url(${this.state.stay.mainPhoto})` }}
                    >
                    </div>
                    <div className={style.imageGrid}>{this.imageGrid()}</div>
                    <div className={style.address}>
                        {t("ADDRESS")}: {this.state.stay.address.street}{" "}{this.state.stay.address.city},{" "}
                        {this.state.stay.address.zipCode}{" "}{this.state.stay.address.country}
                    </div>
                    <div className={style.price}>
                        {this.state.stay.minPrice} {t("CURRENCY_SYMBOL")}
                    </div>
                    <div className={style.contact}>
                        <div>{this.state.stay.phoneNumber}</div>
                        <div>{this.state.stay.email}</div>

                    </div>
                    <div className={style.description}>{this.state.stay.description}</div>
                </div>
                <StayMap position={position} zoom={14} />
                <Properties stayId={this.props.match.params.id} />
                <Accommodation stayId={this.props.match.params.id} />
                <Reviews stayId={this.props.match.params.id} />
                {this.lightbox()}
            </div>
        }

    }

    render() {


        return (
            <div className={style.stayComponent}>
                {this.renderContent()}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(withTranslation()(Stay));
