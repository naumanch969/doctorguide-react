 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import Cookie from 'js-cookie'

// Define the type for your state
interface UserState {
    isFetching: boolean;
    error: null | Error;
    users: User[];
    loggedUser: User | null;
}

const initialState: UserState = {
    isFetching: false,
    error: null,
    users: [],
    loggedUser: Cookie.get('askexpert_profile') ? JSON.parse(Cookie.get('askexpert_profile')) : null
};


const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<Error>) => { state.isFetching = false; state.error = action.payload; },

        registerReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        loginReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        requestResetPasswordReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        resendOTPReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        verifyOTPReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        validateTokenReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        resetPasswordReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        googleAuthReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        googleAuthCallbackReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        logoutReducer: (state) => { state.loggedUser = null },


        getUserReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        setUserCategoryReducer: (state, action: PayloadAction<string>) => { },
        updateUserReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        createCheckoutSubscriptionReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },


    }
})

export const {
    start, end, error,
    registerReducer,
    loginReducer,
    requestResetPasswordReducer,
    resendOTPReducer,
    verifyOTPReducer,
    validateTokenReducer,
    resetPasswordReducer,
    googleAuthReducer,
    googleAuthCallbackReducer,
    logoutReducer,

    getUserReducer,
    setUserCategoryReducer,
    updateUserReducer,
    createCheckoutSubscriptionReducer,
} = usersSlice.actions
export default usersSlice.reducer