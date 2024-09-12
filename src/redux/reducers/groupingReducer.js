import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name: "GroupBy",
    initialState: { groupBy:{} },
    reducers: {
        groupByRequest(state,action){
            state.groupbyLoading = true;
        },
        groupBySuccess(state,action){
            state.loading = false;
            state.groupBy = action.payload.groupBy;
            state.orderBy = action.payload.orderBy;
            state.groups = action.payload.groups;
        },
        groupByFail(state,action){
            state.groupbyLoading = true;
            state.groupByError = action.payload
        },
        clearGroupByError(state,action){
            state.groupByerror = null;
        },
        clearGroupByMessage(state,action){
            state.groupBymessage = null;
        }
    }
})

export default groupSlice.reducer;

export const { 
    groupByRequest,
    groupBySuccess,
    groupByFail,
    clearGroupByError,
    clearGroupByMessage,
} = groupSlice.actions;
