import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//reducers
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postsReducer";

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    content: postReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;