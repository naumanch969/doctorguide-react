import * as api from '../api'

import {
    start, end, error,
    getBookDetailsAndStartConversationReducer,
    getConversationMessagesReducer,
    getUserConversationHistoryReducer,
    getConversationIdsReducer,
    queryBookReducer,
} from '../reducer/conversation'
import { AsyncAction } from '../store'
// import { parseAndReturnLastObject } from '../../utils/functions';


export const getBookDetailsAndStartConversation = (bookId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getBookDetailsAndStartConversation(bookId)
        dispatch(getBookDetailsAndStartConversationReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}




interface SourceDocument { pageContent: string, metadata: { fileId: string } };
function extractLastObject(jsonString: string): { text: string, sourceDocuments: SourceDocument[], questions: string[] | [] } | null {
    // Split the string into individual JSON objects
    const jsonObjects = jsonString.trim().split('}{');

    // Ensure that each object has the correct format by adding curly braces
    const correctedJsonString = jsonObjects.map((obj, index) => {
        if (index === 0) {
            return `{${obj}}`;
        } else if (index === jsonObjects.length - 1) {
            // Handle the last object, which is not separated by '}{'
            return `{${obj}`;
        } else {
            return `{${obj}}`;
        }
    });

    // Parse the JSON objects
    const parsedObjects = correctedJsonString.map((json) => {
        try {
            return JSON.parse(json);
        } catch (error) {
            return null; // Handle parsing errors as needed
        }
    });

    // Filter out any parsing errors (null values) and return the last parsed object
    const lastObject = parsedObjects.filter((obj) => obj !== null).pop();

    return lastObject;
}
export const queryBook = (query: { query: string, conversationId: string }, setSources: any): AsyncAction => async (dispatch) => {
    try {
        dispatch(start());

        dispatch(queryBookReducer({ role: 'HUMAN', text: query.query, sourceDocuments: [], questions: [] }));
        let { data } = await api.queryBook(query);
        
        const response: { text: string, sourceDocuments: SourceDocument[] | [], questions: string[] | [] } | null = extractLastObject(data);
        setSources(response?.sourceDocuments);
        response && dispatch(queryBookReducer({ ...response, role: 'AI' }));

        dispatch(end());
    } catch (err: any) {
        console.log('error', err);
        dispatch(error(err.message));
    }
}

export const getConversationMessages = (conversationId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getConversationMessages(conversationId)
        dispatch(getConversationMessagesReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getUserConversationHistory = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUserConversationHistory()
        dispatch(getUserConversationHistoryReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getConversationIds = (bookId: string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getConversationIds(bookId)
        dispatch(getConversationIdsReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}