import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./i18n";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback="loading">
                    <Routes />
                </Suspense>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//</React.StrictMode>serviceWorker.unregister();
