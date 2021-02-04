import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import stayReducer from "./stay/stayReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "stay"],
};

const rootReducer = combineReducers({
    user: userReducer,
    stay: stayReducer,
});

export default persistReducer(persistConfig, rootReducer);
