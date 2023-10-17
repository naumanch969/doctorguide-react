import * as api from '../api'
import {
    start, end, error,
    sendMessageReducer,
    getMessagesReducer,
    getMessageReducer,
    replyMessageReducer,
    sendBulkEmailsReducer,
    sendEmailsToEveryoneReducer,
    sendEmailsToSubscribersReducer,
} from '../reducer/message'
import { AsyncAction } from '../store'

export const sendMessage = (message: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.sendMessage(message)
        dispatch(sendMessageReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getMessages = (): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getMessages()
        dispatch(getMessagesReducer(data.messages))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getMessage = (messageId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getMessage(messageId)
        dispatch(getMessageReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const replyMessage = (messageId: string, reply: { subject: string, reply: string, html: string, sendTo: string, emailUsername: string, }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.replyMessage(messageId, reply)
        dispatch(replyMessageReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const sendBulkEmails = (mailData: { subject: string, message: string, html: string, emailUsername: string, emails: string[] }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.sendBulkEmails(mailData)
        dispatch(sendBulkEmailsReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const sendEmailsToEveryone = (mailData: { subject: string, message: string, html: string, emailUsername: string }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.sendEmailsToEveryone(mailData)
        dispatch(sendEmailsToEveryoneReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const sendEmailsToSubscribers = (mailData: {
    subject: string, message: string, html: string, emailUsername: string, billing: string, planName: string
}): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.sendEmailsToSubscribers(mailData)
        dispatch(sendEmailsToSubscribersReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}