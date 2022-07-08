import {createSelector} from "@reduxjs/toolkit";

const indicator = state => state.mainPage.visitorCountIndicator
export const selectVisitorCountIndicator = createSelector(indicator, (state) => ({
    day: state.day,
    month: state.month,
    visitors: state.graph.map(item => item?.amount)
}))