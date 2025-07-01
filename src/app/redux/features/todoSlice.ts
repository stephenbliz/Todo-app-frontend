import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { todoInitialProp, myTodoProps } from "@/app/utils/types";

const initialState: todoInitialProp = {
    loading: false,
    data: [],
    error: ''
}

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async ()=>{
    const res = await fetch('http://localhost:4000/api/todo');
    const data = await res.json();
    return data;
})

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchTodo.fulfilled, (state, action: PayloadAction<myTodoProps[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(fetchTodo.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export default todoSlice.reducer;