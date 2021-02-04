import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./i18n";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Suspense fallback="loading">
                        <PersistGate persistor={persistor}>
                            <Routes />
                        </PersistGate>
                    </Suspense>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//</React.StrictMode>serviceWorker.unregister();
