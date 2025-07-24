'use client';
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { setCredentials } from "./redux/features/userSlice";

export function Providers ({children}:{children: React.ReactNode}){

    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem(JSON.parse('user'));
        if(token && user) {
            dispatch(setCredentials({token, user}));
        }
    }, [dispatch]);
    
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}