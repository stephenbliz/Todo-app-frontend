import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/features/todoSlice';
import todoFieldReducer from '../redux/features/todoFieldsSlice';
import userReducer from '../redux/features/userSlice';


const store = configureStore({
    reducer : {
        todo: todoReducer,
        todoFields: todoFieldReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>{
       return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch