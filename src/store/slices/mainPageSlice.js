import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {apiController} from "../../api";


const initialState = {
    visitorCountIndicator: {
        day: {},
        month: {},
        graph: []
    },
    loading: "idle"
}

export const getVisitorCountIndicator = createAsyncThunk("mainPage/visitorCountIndicator", async (_, thunkAPI) => {
    const [month,day,graph] = await Promise.all([
        apiController.getVisitorsCountIndicatorMounth(),
        apiController.getVisitorCountIndicatorToday(),
        apiController.getStatisticUsersGraphMonth()
    ])
    return {
        month: month.data,
        day: day.data,
        graph: graph.data
    }
})

export const mainPageSlice = createSlice({
    name: "mainPage",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getVisitorCountIndicator.pending, (state) => {
            state.loading = "pending"
        }).addCase(getVisitorCountIndicator.fulfilled,(state,action) =>{
            state.visitorCountIndicator = action.payload
            state.loading = "fulfilled"
        }).addCase(getVisitorCountIndicator.rejected, (state) => {
            state.loading = "rejected"
        })
    }
})

export const {} = mainPageSlice.actions

