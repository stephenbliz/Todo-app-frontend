import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { credentialsProps, userInitialProps } from "@/app/utils/types";

const initialState: userInitialProps = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null
}

export const register = createAsyncThunk('user/register', async (credentials: any)=>{
    const res = await fetch('http://localhost:4000/api/register',{
        method: 'POST',
        body: credentials
    })
    const data = await res.json();
    return data;
})

export const logIn = createAsyncThunk('user/logIn', async (credentials: credentialsProps)=>{
    const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    const data = await res.json();
    if(data){
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
    }
    return data;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.message = 'User logged out';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.message = null;
            state.error = action.error.message || 'Registration failed';
        });
        builder.addCase(logIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = action.error.message || 'LogIn failed';
        })
    }
})

export default userSlice.reducer;
export const {logOut} = userSlice.actions;