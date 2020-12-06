import React from "react";
import { withTranslation } from "react-i18next";
import StaysMap from "../widgets/StaysMap/staysMap";
import StaysSlider from "../widgets/StaysSlider/staysSlider";

const Home = () => {
    return (
        <div>
            <StaysSlider template="default" height="500px" />
            <StaysMap position={[52.125736, 19.080392]} zoom={6}/>
        </div>
    );
};

export default withTranslation()(Home);
