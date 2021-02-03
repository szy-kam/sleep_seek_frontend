import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

// const middlerwares = [logger];
const middlerwares = [];

export const store = createStore(rootReducer, applyMiddleware(...middlerwares));
export const persistor = persistStore(store);
