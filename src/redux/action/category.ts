import * as api from '../api'
import {
    start, end, error,
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
} from '../reducer/category'

import { AsyncAction } from '../../redux/store'

export const getAllBookCategories = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getAllBookCategories()
        dispatch(getAllBookCategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getBookCategory = (categoryId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getBookCategory(categoryId)
        dispatch(getBookCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createBookCategory = (categoryName:string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.createBookCategory(categoryName);
        dispatch(createBookCategoryReducer(data));
        dispatch(end());
    } catch (err: any) {
        dispatch(error(err.message));
    }
};

export const udpateBookCategory = (categoryId: string, categoryName: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.udpateBookCategory(categoryId, categoryName)
        dispatch(udpateBookCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteBookCategory = (categoryId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        await api.deleteBookCategory(categoryId)
        dispatch(deleteBookCategoryReducer(categoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}

export const getAllToolCategories = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getAllToolCategories()
        dispatch(getAllToolCategoriesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getToolCategory = (categoryId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getToolCategory(categoryId)
        dispatch(getToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createToolCategory = (categoryName:string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createToolCategory(categoryName)
        dispatch(createToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateToolCategory = (categoryId: string, categoryName:string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateToolCategory(categoryId, categoryName)
        dispatch(updateToolCategoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteToolCategory = (categoryId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
         await api.deleteToolCategory(categoryId)
        dispatch(deleteToolCategoryReducer(categoryId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}