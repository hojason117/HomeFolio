import { createStore } from "redux";
import rootReducer from "../reducers/main";
import { initialState } from '../reducers/main';

const store = createStore(rootReducer, initialState);

export default store;