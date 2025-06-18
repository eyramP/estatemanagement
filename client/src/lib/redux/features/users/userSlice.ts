import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playball } from "next/font/google";

const initialState = {
    searchTerm: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        }
    }
})

export const {setSearchTerm} = userSlice.actions;
export default userSlice.reducer;