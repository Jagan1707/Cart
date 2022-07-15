import {createSlice} from '@reduxjs/toolkit';


const CartSlice = createSlice({
    name : "cart",
    initialState : [ {value : {Producttype : '',Framecolor : '' ,Framesize : '',Price:0}}],
    reducers : {
        addTocart : (state , action) =>{
            state.value = action.payload
        }
    }
})

export const {addTocart} = CartSlice.actions
export default CartSlice.reducer