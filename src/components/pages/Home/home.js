import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { GetStaysRepository } from "../../../repository/stays.js";
import StaysCard from "../../widgets/StaysCards/staysCard";
import StaysMap from "../../widgets/StaysMap/staysMap";
import StaysSlider from "../../widgets/StaysSlider/staysSlider";
import style from './home.css'

const Home = () => {

    const [stays, setStays] = useState([])

    useEffect(() => {
        GetStaysRepository(0, 5)
            .then(data => {
                if (Array.isArray(data)) {
                    setStays(data)
                }
            })
    }, [])

    const smartQuote = () => {

        return (
            <div className={style.smartQuote}>
                <div className={style.innerSmartQuote}> 
                <h2>Podążaj za swoimi marzeniami. One znają drogę.</h2>

                </div>
            </div>
        )
    }


    return (
        <div style={style.homeComponent}>
            <StaysSlider template="default" height="500px" />
            {smartQuote()}
            <StaysMap position={[52.125736, 19.080392]} zoom={6} />
            <h2>Najczęściej wybierane miasta</h2>
            <StaysCard stays={stays.slice(0, 4)} template={"photo"} />

        </div>
    );
};

export default withTranslation()(Home);
