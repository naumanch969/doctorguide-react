import * as api from '../api'
import {
    start, end, error,
    getToolReducer,
    getToolsReducer,
    queryToolReducer,
    createToolReducer,
    updateToolReducer,
    deleteToolReducer,
} from '../reducer/tool'
import { AsyncAction } from '../store'
import { Tool } from '../../interfaces';
import { parseAndReturnLastObject } from '../../utils/functions';


export const getTools = (query: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getTools(query)
        dispatch(getToolsReducer(data.results))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getTool = (toolId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getTool(toolId)
        dispatch(getToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const queryTool = (toolId: string, inputs: { [key: string]: any }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.queryTool(toolId, inputs)
        const response: { text: string } = parseAndReturnLastObject(data)
        console.log('response', response)
        dispatch(queryToolReducer({ inputs, response: response.text }))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createTool = (toolData: Tool): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createTool(toolData)
        dispatch(createToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateTool = (toolId: string, toolData: Tool): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateTool(toolId, toolData)
        dispatch(updateToolReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteTool = (toolId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteTool(toolId)
        dispatch(deleteToolReducer(toolId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}