import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../pages/ModulesPage/types";
import axios from "axios";

export interface Card {
    cards: ICard[];
}

const initialState: Card = {
    cards: []
}

export const cardsSlice  = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(get.fulfilled, (state, action)=> {
            state.cards = action.payload || [];
        })
    }

})

export default cardsSlice.reducer

export const get = createAsyncThunk('card/get', async(): Promise<ICard[]| undefined>=>{
    return (await axios.get(`http://localhost:3001/cards`)).data
})

export const getById = createAsyncThunk('card/getById', async(): Promise<ICard[]| undefined>=>{
    return (await axios.get(`http://localhost:3001/cards/1`)).data
})