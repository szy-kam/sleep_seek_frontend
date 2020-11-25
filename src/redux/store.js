import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const middlerwares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlerwares));

export default store;
