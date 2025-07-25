'use client';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { setCredentials } from "../redux/features/userSlice";

export default function AppInitializer(){
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(token && user) {
            dispatch(setCredentials({user, token}));
        }
    }, [dispatch]);
    return null;
}