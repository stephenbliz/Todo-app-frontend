import { createSlice } from "@reduxjs/toolkit";

type cakeInitial = {
    noOfCakes : number
}

const initialState: cakeInitial = {
    noOfCakes: 20,
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        orderCake: (state, action)=>{
            state.noOfCakes -= action.payload;
        },
        restockCake: (state, action)=>{
            state.noOfCakes += action.payload;
        }
    }
})

export default cakeSlice.reducer;
export const {orderCake, restockCake} = cakeSlice.actions