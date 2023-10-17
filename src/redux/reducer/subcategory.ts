import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Subcategory } from "../../interfaces";


// Define the type for your state
interface SubcategoriesState {
    isFetching: boolean;
    error: null | Error;
    bookSubcategories: Subcategory[];
    toolSubcategories: Subcategory[];
    currentSubcategory: Subcategory;
}

const initialState: SubcategoriesState = {
    isFetching: false,
    error: null,
    bookSubcategories: [],
    toolSubcategories: [],
    currentSubcategory: { name: '', _id: '', bookCategory: { name: '', id: '' }, toolCategory: { name: '', id: '' } },
};

const categorysSlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {
        start: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        end: (state) => {
            state.isFetching = false;
        },
        error: (state, action: PayloadAction<Error>) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        getAllBookSubcategoriesReducer: (state, action: PayloadAction<Subcategory[]>) => {
            state.bookSubcategories = action.payload;
        },
        getBookSubcategoriesReducer: (state, action: PayloadAction<Subcategory[]>) => {
            state.bookSubcategories = action.payload;
        },
        getBookSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.currentSubcategory = action.payload;
        },
        createBookSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.bookSubcategories = [...state.bookSubcategories, action.payload];
        },
        updateBookSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.bookSubcategories = state.bookSubcategories.map(subcategory => subcategory = subcategory._id == action.payload._id ? action.payload : subcategory);
        },
        deleteBookSubcategoryReducer: (state, action: PayloadAction<string>) => {
            state.bookSubcategories = state.bookSubcategories.filter((subcategory: Subcategory) => subcategory._id != action.payload);
        },




        getAllToolSubcategoriesReducer: (state, action: PayloadAction<Subcategory[]>) => {
            state.toolSubcategories = action.payload;
        },
        getToolSubcategoriesReducer: (state, action: PayloadAction<Subcategory[]>) => {
            state.toolSubcategories = action.payload;
        },
        getToolSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.currentSubcategory = action.payload;
        },
        createToolSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.toolSubcategories = [...state.toolSubcategories, action.payload]
        },
        updateToolSubcategoryReducer: (state, action: PayloadAction<Subcategory>) => {
            state.toolSubcategories = state.toolSubcategories.map((subcategory: Subcategory) => subcategory = subcategory._id == action.payload._id ? action.payload : subcategory);
        },
        deleteToolSubcategoryReducer: (state, action: PayloadAction<string>) => {
            state.toolSubcategories = state.toolSubcategories.filter((subcategory: Subcategory) => subcategory._id != action.payload);
        },

    },
});

export const {
    start,
    end,
    error,

    getAllBookSubcategoriesReducer,
    getBookSubcategoriesReducer,
    getBookSubcategoryReducer,
    createBookSubcategoryReducer,
    updateBookSubcategoryReducer,
    deleteBookSubcategoryReducer,

    getAllToolSubcategoriesReducer,
    getToolSubcategoriesReducer,
    getToolSubcategoryReducer,
    createToolSubcategoryReducer,
    updateToolSubcategoryReducer,
    deleteToolSubcategoryReducer,

} = categorysSlice.actions;

export default categorysSlice.reducer;
