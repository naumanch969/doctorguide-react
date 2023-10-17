import { createSlice } from "@reduxjs/toolkit";
 
const uploadsSlice = createSlice({
    name: 'upload',
    initialState: {
        isFetching: false,
        error: null,
        uploads: [],
      },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
 
        uploadImageReducer:(state,action) =>{state.uploads = action.payload},
        stripeWebhookReducer:(state,action) =>{state.uploads = action.payload}

     

    }
})

export const { 
    start, end, error, 
    uploadImageReducer,
    stripeWebhookReducer
} = uploadsSlice.actions
export default uploadsSlice.reducer