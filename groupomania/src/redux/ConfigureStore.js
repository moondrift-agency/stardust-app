import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//reducers
import userReducer from "./reducers/userReducer";
import { contentReducer } from "./reducers/contentReducer";

const ConfigureStore = () => {
    let intialState = {};

    try {
        intialState = sessionStorage.getItem("datas") ? JSON.parse(sessionStorage.getItem("datas")) : {};
    } catch (error) {
        console.log('getError', error)
    }

    const saver = (store) => next => action => {
        let stateToSave = store.getState();
        sessionStorage.setItem("datas", JSON.stringify({ ...stateToSave }))
        return next(action);
    }

    const rootReducer = combineReducers({
        user: userReducer,
        content: contentReducer
    });

    return createStore(rootReducer,intialState,composeWithDevTools(applyMiddleware(thunk,saver)));
}

export default ConfigureStore;