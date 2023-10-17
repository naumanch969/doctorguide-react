 

import { useNavigate } from 'react-router-dom'
import * as api from '../api'
import { start, end, error, getUserReducer, updateUserReducer, setUserCategoryReducer } from '../reducer/user'
import { AsyncAction } from '../store'
import Cookie from 'js-cookie'
import { User } from '../../interfaces'

export const getUser = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data }: { data: User } = await api.getUser()
        const { name, category, imageUrl, verified } = data
        Cookie.set('askexpert_profile', JSON.stringify({ name, category, imageUrl, verified }))
        dispatch(getUserReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const setUserCategory = (category: string, navigate: ReturnType<typeof useNavigate>): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        await api.setUserCategory(category)
        const stringifiedUser = Cookie.get('askexpert_profile')
        Cookie.set('askexpert_profile', JSON.stringify({ ...JSON.parse(stringifiedUser), category }))

        navigate("/dashboard");
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const updateUser = (userData: { name: string, imageUrl: string, oldPassword: string, newPassword: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userData)

        const loggedUser = Cookie.get('askexpert_profile')
        Cookie.set('askexpert_profile', JSON.stringify({ ...JSON.parse(loggedUser), name: userData.name, imageUrl: userData.imageUrl }))

        dispatch(updateUserReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
} 