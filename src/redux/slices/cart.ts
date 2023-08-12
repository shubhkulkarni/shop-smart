import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../types/types'


export interface ICartState{
    cart : IProduct[],
    quantities: {[key:string]: number},
}
const initialState: ICartState = {
    cart : [],
    quantities: {}
}

const cartReducers = {
    addToCart: (state,action: PayloadAction<IProduct>) => {
        state.cart.push(action.payload)
        state.quantities[action.payload.id] = 1
    },
    clearCart: state => {state.cart = []},
    deleteItem: (state,action: PayloadAction<string|number>) => {
        state.cart = state.cart.filter(i=>i.id!==action.payload)
        state.quantities[action.payload] = 0;
    },
    addQuantity: (state,action: PayloadAction<string|number>) => {
        state.quantities[action.payload] = state.quantities[action.payload] + 1
    },
    reduceQuantity: (state,action: PayloadAction<string|number>) => {
        state.quantities[action.payload] = state.quantities[action.payload] > 0 ? state.quantities[action.payload] - 1 : 0
    }
}

export const cartSlice = createSlice({
    initialState,
    name:'cart',
    reducers: cartReducers
})

export const {addToCart, clearCart,deleteItem,addQuantity,reduceQuantity} = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer