import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || []
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userRegister: (state, action) => {
            state.users.push(action.payload);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        userDelete: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload);
            if (userIndex !== -1) {
                state.users.splice(userIndex, 1);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        userStatusUpdate: (state, action) => {
            const user = state.users.find((u) => u.id === action.payload);
            if (user) {
                user.status = !user.status;
                localStorage.setItem('users', JSON.stringify(state.users));
            }

        },
        userRoleUpdate: (state, action) => {
            const user = state.users.find((u) => u.id === action.payload.id);
            if (user) {
                user.role = action.payload.role;
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        userProfileUpdate: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id);
            if (userIndex !== -1) {
                state.users[userIndex] = { ...state.users[userIndex], ...action.payload }
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        updatePassword: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id && u.password === action.payload.currentPassword);
            if (userIndex !== -1) {
                state.users[userIndex].password = action.payload.newPassword;
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        }
    }
})

export const { userRegister, userDelete, userStatusUpdate, userRoleUpdate, userProfileUpdate, updatePassword } = userSlice.actions;
export default userSlice.reducer;