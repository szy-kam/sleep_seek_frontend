import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { GetStaysRepository } from "../../../repository/stay.js";
import StaysCard from "../../widgets/StaysCards/staysCard";
import StaysMap from "../../widgets/StaysMap/staysMap";
import StaysSlider from "../../widgets/StaysSlider/staysSlider";
import style from './home.css'

const Home = () => {

    const [stays, setStays] = useState(null)

    useEffect(() => {
        GetStaysRepository(0, 5)
            .then(data => {
                if (Array.isArray(data)) {
                    setStays(data)
                }
            })
    }, [])

    return (
        <div style={style.homeComponent}>
            <StaysSlider template="default" height="500px" />
            <div>
                <StaysMap position={[52.125736, 19.080392]} zoom={6} />
                <h2>Najczęściej wybierane miasta</h2>
                <StaysCard stays={stays} template={"photo"} />
            </div>
        </div>
    );
};

export default withTranslation()(Home);
