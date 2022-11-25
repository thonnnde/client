import { createSlice } from "@reduxjs/toolkit";

const defaultOptions = {
    mapId:'45b41d76d6b60f19',
}

const mapOptionSlice = createSlice({
    name:"mapOption",
    initialState: defaultOptions,
    reducers:{
        getMapId(state){
            return state;
        }
    }
})
export const { getMapId } = mapOptionSlice.actions; 

export default mapOptionSlice.reducer;