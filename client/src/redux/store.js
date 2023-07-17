import { configureStore } from "@reduxjs/toolkit";
import user from "./slice";
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const config={
    key:'root',
    storage
}
const reducer=persistReducer(config,user)

export const store=configureStore({
    reducer:reducer,
})

export const persist=persistStore(store)