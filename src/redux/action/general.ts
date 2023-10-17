import * as api from '../api'
import { start, end, error, uploadImageReducer, stripeWebhookReducer } from '../reducer/general'
import { AsyncAction } from '../store'

export const uploadImage = (image: FormData): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.uploadImage(image)
        dispatch(uploadImageReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}

export const stripeWebhook = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.stripeWebhook()
        dispatch(stripeWebhookReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}