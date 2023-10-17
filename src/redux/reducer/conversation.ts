import { ConversationMessage } from "../../interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ConversationState {
    isFetching: boolean;
    error: null | Error;
    conversations: object;
    currentConversation: ConversationMessage[];
    initialMessage: { conversationId: string, initialMessage: string, suggestedQuestions: string[] | [] };
}

const initialState: ConversationState = {
    isFetching: false,
    error: null,
    conversations: [],
    currentConversation: [],
    initialMessage: {
        conversationId: '',
        initialMessage: '',
        suggestedQuestions: []
    }
};


const conversationsSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<Error>) => {
            state.isFetching = false; state.error = action.payload;
        },


        getBookDetailsAndStartConversationReducer: (state, action: PayloadAction<{ conversationId: string, initialMessage: string, suggestedQuestions: string[] | [] }>) => {
            state.initialMessage = action.payload
            state.currentConversation = [{ role: 'AI', text: action.payload.initialMessage, sourceDocuments: [], questions: action.payload.suggestedQuestions }]
        },
        queryBookReducer: (state, action: PayloadAction<ConversationMessage>) => {
            console.log('action.payload', action.payload.questions)
            state.currentConversation = [...state.currentConversation, action.payload]
        },
        getConversationMessagesReducer: (state, action: PayloadAction<ConversationMessage>) => {
            state.conversations = action.payload
        },
        getUserConversationHistoryReducer: (state, action: PayloadAction<ConversationMessage>) => {
            state.conversations = action.payload
        },
        getConversationIdsReducer: (state, action: PayloadAction<ConversationMessage>) => {
            state.conversations = action.payload
        },


    }
})

export const {
    start, end, error,
    getBookDetailsAndStartConversationReducer,
    queryBookReducer,
    getConversationMessagesReducer,
    getUserConversationHistoryReducer,
    getConversationIdsReducer,
} = conversationsSlice.actions
export default conversationsSlice.reducer