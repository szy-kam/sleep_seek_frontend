import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftColumn from "../Stays/staysLayout";
import { GetStayByIdRepository } from "../../repository/stay";
import { withTranslation } from "react-i18next";
import style from "./stay.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { STAY } from "../../config";
import { connect } from "react-redux";
import StayMap from '../widgets/StayMap/stayMap'
import Reviews from "../widgets/Reviews/reviews";


class Stay extends Component {
    state = {
        stay: STAY,
        images: [],
        photoIndex: 0,
        isOpen: false,
    };

    componentDidMount() {
        GetStayByIdRepository(this.props.match.params.id).then((response) => {
            this.setState({ stay: response });
        });
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

    editLink() {
        const { t } = this.props;
        return this.props.user ? (
            <Link to={`/stays/edit/${this.state.stay.id}`}>{t("EDIT_STAY")}</Link>
        ) : null;
    }

    render() {
        const { t } = this.props;
        const position = [this.state.stay.address.latitude, this.state.stay.address.longitude]; //TODO
        // const position = [50.06210034570054, 19.936973861659844]; //TODO
        return (
            <div className={style.stayComponent}>
                <LeftColumn />
                <div className={style.stayContent}>
                    <div className={style.name}>
                        {this.state.stay.name} {this.editLink()}{" "}
                    </div>
                    <div
                        className={style.image}
                        style={{ backgroundImage: `url(${this.state.stay.mainPhoto})` }}
                    ></div>
                    <div className={style.imageGrid}>{this.imageGrid()}</div>
                    <div className={style.address}>
                        {t("ADDRESS")}: {this.state.stay.address.city},{" "}
                        {this.state.stay.address.street}
                    </div>
                    <div className={style.price}>
                        {this.state.stay.price} {t("CURRENCY_SYMBOL")}
                    </div>
                    <div className={style.description}>{this.state.stay.description}</div>
                    <StayMap position={position} zoom={14}/>
                    <Reviews />
                </div>

                

                {this.lightbox()}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(withTranslation()(Stay));
