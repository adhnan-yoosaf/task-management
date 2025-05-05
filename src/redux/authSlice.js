import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
        },
        userLogout: (state) => {
            state.user = {};
            state.isAuthenticated = false;

            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
        },
        userAuthUpdate: (state, action) => {
            state.user = { ...state.user, ...action.payload }
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
})

export const { userLogin, userLogout, userAuthUpdate } = authSlice.actions;
export default authSlice.reducer;