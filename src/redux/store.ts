 

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import conversationReducer from './reducer/conversation';
import userReducer from './reducer/user';
import categoryReducer from './reducer/category';
import subcategoryReducer from './reducer/subcategory';
import toolReducer from './reducer/tool';
import bookReducer from './reducer/book';
import messageReducer from './reducer/message';
import planReducer from './reducer/plan';


const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    tool: toolReducer,
    book: bookReducer,
    message: messageReducer,
    conversation: conversationReducer,
    plan: planReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


// Define the async action creator type
export type AsyncAction = ThunkAction<void, RootState, null, AnyAction>;
