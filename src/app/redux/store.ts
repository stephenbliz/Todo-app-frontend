import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/features/todoSlice';
import todoFieldReducer from '../redux/features/todoFieldsSlice';


const store = configureStore({
    reducer : {
        todo: todoReducer,
        todoFields: todoFieldReducer
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