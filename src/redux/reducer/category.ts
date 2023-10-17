import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../interfaces";


interface CategoriesState {
    isFetching: boolean;
    error: null | Error;
    toolCategories: Category[];
    bookCategories: Category[];
    currentCategory: Category;
    currentToolCategory: Category;
    currentBookCategory: Category;
}

const initialState: CategoriesState = {
    isFetching: false,
    error: null,
    bookCategories: [],
    toolCategories: [],
    currentCategory: { name: '', _id: '', subcategories: [] },
    currentToolCategory: { name: '', _id: '', subcategories: [] },
    currentBookCategory: { name: '', _id: '', subcategories: [] },
};

const categorysSlice = createSlice({
    name: 'category',
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
        getAllBookCategoriesReducer: (state, action: PayloadAction<Category[]>) => {
            state.bookCategories = action.payload;
        },
        getBookCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload;
            state.currentBookCategory = action.payload;
        },
        createBookCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.bookCategories = [...state.bookCategories, action.payload];
        },
        udpateBookCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.bookCategories = state.bookCategories.map(category => category = category._id == action.payload._id ? action.payload : category);
        },
        deleteBookCategoryReducer: (state, action: PayloadAction<string>) => {
            state.bookCategories = state.bookCategories.filter((category: Category) => category._id != action.payload);
        },
        getAllToolCategoriesReducer: (state, action: PayloadAction<Category[]>) => {
            state.toolCategories = action.payload;
        },
        getToolCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload;
            state.currentToolCategory = action.payload;
        },
        createToolCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.toolCategories = [...state.toolCategories, action.payload]
        },
        updateToolCategoryReducer: (state, action: PayloadAction<Category>) => {
            state.toolCategories = state.toolCategories.map((category: Category) => category = category._id == action.payload._id ? action.payload : category);
        },
        deleteToolCategoryReducer: (state, action: PayloadAction<string>) => {
            state.toolCategories = state.toolCategories.filter((category: Category) => category._id != action.payload);
        },
    },
});

export const {
    start,
    end,
    error,
    getAllBookCategoriesReducer,
    getBookCategoryReducer,
    createBookCategoryReducer,
    deleteBookCategoryReducer,
    udpateBookCategoryReducer,
    getAllToolCategoriesReducer,
    getToolCategoryReducer,
    createToolCategoryReducer,
    updateToolCategoryReducer,
    deleteToolCategoryReducer,
} = categorysSlice.actions;

export default categorysSlice.reducer;
