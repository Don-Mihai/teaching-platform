import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "./types";
import axios from "axios";
import { ICard } from "./types";


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

export const get = createAsyncThunk('card/get', async (): Promise<ICard[] | undefined> => {
    return (await axios.get(`cards`)).data;
});

export const getById = createAsyncThunk('card/getById', async (cardID: number): Promise<ICard[] | undefined> => {
    return (await axios.get(`cards/${cardID}`)).data;
});