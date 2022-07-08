import {configureStore} from "@reduxjs/toolkit";
import {userSlice, mainPageSlice} from "./slices"
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        mainPage: mainPageSlice.reducer
    }
})