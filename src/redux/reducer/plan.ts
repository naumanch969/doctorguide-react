import { Plan } from "../../interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlansState {
    isFetching: boolean;
    error: null | Error;
    plans: Plan[];
    currentPlan: Plan;
}

const initialState: PlansState = {
    isFetching: false,
    error: null,
    plans: [],
    currentPlan: {
        _id: '',
        name: '',
        billing: '',
        price: '',
        messagesPerMonth: 0,
        priceId: '',
        features: []
    }
};


const plansSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        createPlanReducer: (state, action: PayloadAction<Plan>) => {
            state.plans = [...state.plans, action.payload]
        },
        getPlansReducer: (state, action: PayloadAction<Plan[]>) => {
            state.plans = action.payload
        },
        getPlanReducer: (state, action: PayloadAction<Plan[]>) => {
            state.plans = action.payload
        },
        updatePlanReducer: (state, action: PayloadAction<Plan>) => {
            state.plans = state.plans.map(plan => plan = plan._id == action.payload._id ? action.payload : plan);
        },
        deletePlanReducer: (state, action: PayloadAction<string>) => {
            state.plans = state.plans.filter((plan: Plan) => plan._id != action.payload);
        }
        ,

    }
})

export const {
    start, end, error,
    createPlanReducer,
    updatePlanReducer,
    getPlansReducer,
    getPlanReducer,
    deletePlanReducer,
} = plansSlice.actions
export default plansSlice.reducer