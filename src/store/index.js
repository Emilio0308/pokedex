import { configureStore } from "@reduxjs/toolkit";
import nametrainer from "./slices/nametrainer.slice";

export default configureStore({
    reducer:{
        nametrainer,
    }
})