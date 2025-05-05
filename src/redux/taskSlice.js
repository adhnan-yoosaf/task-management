import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []
}
const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {
        createTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action) => {
            const taskIndex = state.tasks.findIndex((t) => t.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        editTask: (state, action) => {
            const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        completeTask: (state, action) => {
            const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...action.payload }
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        }
    }
})

export const { createTask, deleteTask, editTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;