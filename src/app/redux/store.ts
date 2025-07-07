import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/features/todoSlice';
import cakeReducer from '../redux/features/cakeSlice';


const store = configureStore({
    reducer : {
        todo: todoReducer,
        cake: cakeReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch