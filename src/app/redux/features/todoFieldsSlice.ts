import { todoFieldsInitialProp } from "@/app/utils/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: todoFieldsInitialProp= {
    title: '',
    priority: '',
    status: '',
    description: '',
    editingId: null,
    imageFile: null
}

const todoFieldsSlice = createSlice({
    name: 'todoFields',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setPriority: (state, action) => {
            state.priority = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setImageFile: (state, action) => {
            state.imageFile = action.payload;
        },
        setEditingId: (state, action) => {
            state.editingId = action.payload || null;
        }
    }
})

export default todoFieldsSlice.reducer;
export const {
    setTitle, 
    setPriority, 
    setStatus, 
    setDescription, 
    setImageFile,
    setEditingId
} = todoFieldsSlice.actions;