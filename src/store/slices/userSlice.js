import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action){
            state.email = action.playoad.email;
            state.token = action.playoad.token;
            state.id = action.playoad.id;

        },
        removeUser(state){},
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer