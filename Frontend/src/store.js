import {
    legacy_createStore as createStore, 
    combineReducers, 
    applyMiddleware, 
    compose
} from "redux"
import thunk from "redux-thunk"
import { restaurantReducer } from "./reducers/restaurantReducer";
import { menuReducer } from "./reducers/menuReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    restaurants: restaurantReducer,
    menus: menuReducer,
    cart: cartReducer,
});
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")): [],
        deliveryInfo: localStorage.getItem("deliveryInfo")
        ? JSON.parse(localStorage.getItem("deliveryInfo")): [],
    },
};

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
    reducer, 
    initialState, 
    composeEnhanchers(applyMiddleware(...middleware))
);

export default store;