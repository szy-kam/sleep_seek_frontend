import React from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
import style from "./staysSlider.css";

const StaySliderTemplates = (props) => {
    let template = null;

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        ...props.settings,
    };

    let height = props.height ? props.height : "500px";

    switch (props.template) {
        case "default":
            template = props.stays.map((item, i) => {
                return (
                    <div key={i} className={style.StaySliderT1}>
                        <div
                            className={style.image}
                            style={{
                                background: `url(https://picsum.photos/1920/55${i}.jpg)`,
                                height: height,
                            }}
                        ></div>
                        <Link to={`/stays/${item.id}`}>
                            <div className={style.name}>{item.name}</div>
                        </Link>
                    </div>
                );
            });
            break;
        default:
            template = null;
    }

    return <Slick {...settings}>{template}</Slick>;
};

export default StaySliderTemplates;
