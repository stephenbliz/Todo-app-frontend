import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { todoInitialProp, myTodoProps } from "@/app/utils/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}
const token = localStorage.getItem('token');

const initialState: todoInitialProp = {
    loading: false,
    data: [],
    error: ''
}

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async ()=>{
    const res = await fetch(baseURL, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data as myTodoProps[];
})

export const postTodo = createAsyncThunk('todo/postTodo', async (todoObject: FormData)=>{
    const res = await fetch(baseURL, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`
        },
        body: todoObject
    });
    const data = await res.json();
    return data;

})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({id, update}:{id: string; update: FormData}) => {
    const res = await fetch(`${baseURL}${id}`, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${token}`
        },
        body: update
    });
    const data = await res.json();
    return data;
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: string) => {
    const res = await fetch(`${baseURL}${id}`,{
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
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
            state.error = action.error.message || 'Something went wrong';
        });
        builder.addCase(postTodo.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(postTodo.fulfilled, (state, action: PayloadAction<myTodoProps>) => {
            state.loading = false;
            state.data.push(action.payload);
            state.error = '';
            
        });
        builder.addCase(postTodo.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to post';
        })
        builder.addCase(updateTodo.pending, state => {
            state.loading = true;
        })
        builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<myTodoProps>) => {
            state.loading = false;
            const index = state.data.findIndex(todo => todo._id === action.payload._id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
        })
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Update failed';
        })
        builder.addCase(deleteTodo.pending, state => {
            state.loading = true;
        })
        builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<myTodoProps>) => {
            state.loading = false;
            const filtered = state.data.filter(todo => todo._id !== action.payload._id);
            state.data = filtered;
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Delete failed';
        })
    }
})

export default todoSlice.reducer;