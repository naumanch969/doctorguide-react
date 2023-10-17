import axios from 'axios'
import { baseURL } from '../../constants'
import { Book, Category, Message, Plan, Subcategory, Tool } from '../../interfaces';

axios.defaults.withCredentials = true;

const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {

    return req;
})

// AUTH
export const register = (userData: { name: string, email: string, password: string }) => API.post(`/auth/register`, userData)
export const login = (userData: { email: string, password: string }) => API.post(`/auth/login`, userData)
export const requestResetPassword = (userData: any) => API.post(`/auth/request-reset-password`, userData)
export const resendOTP = () => API.get(`/auth/resend-otp`)
export const verifyOTP = (otp: string) => API.post(`/auth/verify-otp`, { otp })
export const validateToken = (userData: any) => API.post(`/auth/validate-token`, userData)
export const resetPassword = (userData: any) => API.post(`/auth/reset-password`, userData)
export const googleAuth = (passwordData: any) => API.put(`/auth/google`, passwordData)
export const googleAuthCallback = (passwordData: any) => API.put(`/auth/google/callback`, passwordData)
export const logout = () => API.get(`/auth/logout`)

// PLANS
export const createPlan = (planData: Plan) => API.post(`/plans/create`, planData)
export const updatePlan = (planId: string, planData: Plan) => API.put(`/plans/${planId}/update`, planData)
export const getPlans = () => API.get(`/plans`)
export const getPlan = (planId: string) => API.get(`/plans/${planId}`)
export const deletePlan = (planId: string) => API.delete(`/plans/${planId}`)

// USER
export const getUser = () => API.get(`/user`)
export const setUserCategory = (categoryId: string) => API.put(`/user/category/${categoryId}`)
export const updateUser = (userData: { name: string, imageUrl: string, oldPassword: string, newPassword: string }) => API.put(`/user/update`, userData)
export const checkoutSubscription = (data: { planName: string, billing: string }) => API.post(`/subscription/checkout`, data)
export const redirectToSubscriptionPortal = () => API.get(`/subscription/portal`)

// IMAGE
export const uploadImage = (image: FormData) => API.post(`/image/upload`, image)

// STRIPE
export const stripeWebhook = () => API.put(`/stripe/webhook`)

// BOOK CATEGORY
export const getAllBookCategories = () => API.get(`/books/category`)
export const getBookCategory = (categoryId: string) => API.get(`/books/category/${categoryId}`)
export const createBookCategory = (name: string) => API.post(`/books/category`, { name })
export const udpateBookCategory = (categoryId: string, name: string) => API.put(`/books/category/${categoryId}`, { name })
export const deleteBookCategory = (categoryId: string) => API.delete(`/books/category/${categoryId}`)

// TOOL CATEGORY
export const getAllToolCategories = () => API.get(`/tools/category`)
export const getToolCategory = (categoryId: string) => API.get(`/tools/category/${categoryId}`)
export const createToolCategory = (name: string) => API.post(`/tools/category`, { name })
export const updateToolCategory = (categoryId: string, name: string) => API.put(`/tools/category/${categoryId}`, { name })
export const deleteToolCategory = (categoryId: string) => API.delete(`/tools/category/${categoryId}`)


// BOOK SUBCATEGORY
export const getAllBookSubcategories = () => API.get(`/books/subcategory`)
export const getBookSubcategories = (categoryId: string) => API.get(`/books/category/${categoryId}/subcategory`)
export const getBookSubcategory = (categoryId: string, subcategoryId: string) => API.get(`/books/category/${categoryId}/subcategory/${subcategoryId}`)
export const createBookSubcategory = (categoryId: string, subcategoryName: string) => API.post(`/books/category/${categoryId}/subcategory`, { name: subcategoryName })
export const updateBookSubcategory = (categoryId: string, subcategoryId: string, subcategoryName: string) => API.put(`/book/category/${categoryId}/subcategory/${subcategoryId}`, { name: subcategoryName })
export const deleteBookSubcategory = (categoryId: string, subcategoryId: string) => API.delete(`/book/category/${categoryId}/subcategory/${subcategoryId}`)
// TOOL SUBCATEGORY
export const getAllToolSubcategories = () => API.get(`/tools/subcategory`)
export const getToolSubcategories = (categoryId: string) => API.get(`/tools/category/${categoryId}/subcategory`)
export const createToolSubcategory = (categoryId: string, subcategoryName: string) => API.post(`/tools/category/${categoryId}/subcategory`, { name: subcategoryName })
export const getToolSubcategory = (categoryId: string, subcategoryId: string) => API.get(`/tools/category/${categoryId}/subcategory/${subcategoryId}`)
export const updateToolSubcategory = (categoryId: string, subcategoryId: string, subcategoryName: string) => API.put(`/tool/category/${categoryId}/subcategory/${subcategoryId}`, { name: subcategoryName })
export const deleteToolSubcategory = (categoryId: string, subcategoryId: string) => API.delete(`/tools/category/${categoryId}/subcategory/${subcategoryId}`)

// MESSAGES
export const sendMessage = (message: string) => API.post(`/messages/send`, { message })
export const getMessages = () => API.get(`/messages`)
export const getMessage = (messageId: string) => API.get(`/messages/${messageId}`)
export const replyMessage = (messageId: string, replyData: { subject: string, reply: string, html: string, sendTo: string, emailUsername: string, }) => API.post(`/messages/reply/${messageId}`, replyData)
export const sendBulkEmails = (mailData: { subject: string, message: string, html: string, emailUsername: string, emails: string[] }) => API.post(`/emails/send/bulk`, mailData)
export const sendEmailsToEveryone = (mailData: { subject: string, message: string, html: string, emailUsername: string }) => API.post(`/emails/send/everyone`, mailData)
export const sendEmailsToSubscribers = (mailData: { subject: string, message: string, html: string, emailUsername: string, billing: string, planName: string }) => API.post(`/emails/send/subscription`, mailData)

// TOOLS
export const getTools = (query: string) => API.get(`/tools${query}`)
export const getTool = (toolId: string) => API.get(`/tools/${toolId}`)
export const queryTool = (toolId: string, inputs: object) => API.post(`/tools/${toolId}/query`, inputs)
export const createTool = (toolData: Tool) => API.post(`/tools/create`, toolData)
export const updateTool = (toolId: string, toolData: Tool) => API.put(`/tools/${toolId}`, toolData)
export const deleteTool = (toolId: string) => API.delete(`/tools/${toolId}`)

// BOOKS
interface CustomBook {
    name: string,
    category: string,
    subcategory: string,
    webImage: string,
    mobileImage: string,
}
export const getBooks = (query: string) => API.get(`/books/list${query}`)
export const searchBook = (searchValue: string) => API.get(`/books/search?query=${searchValue}&page=1&size=1`)
export const uploadFile = (file: FormData) => API.post(`/files/upload`, file)
export const createBook = (bookData: Omit<Book, 'files'> & { files: string[] }) => API.post(`/books/create`, bookData)
export const queryBook = (query: { conversationId: string, query: string }) => API.post(`/books/query`, query)
export const updateBook = (bookId: string, bookData: CustomBook) => API.put(`/books/${bookId}`, bookData)
export const enableFile = (fileId: string) => API.put(`/files/${fileId}/enable`)
export const disableFile = (fileId: string) => API.put(`/files/${fileId}/disable`)
export const deleteBook = (bookId: string) => API.delete(`/books/${bookId}`)
export const deleteFileFromBook = (bookId: string, fileId: string) => API.delete(`/books/${bookId}/files/${fileId}`)
export const deleteFile = (fileId: string) => API.delete(`/files/${fileId}`)

// DEFAULT
export const getBookDetailsAndStartConversation = (bookId: string) => API.get(`/books/${bookId}/initiate`)
export const getConversationMessages = (conversationId: string) => API.get(`/conversations/${conversationId}`)
export const getUserConversationHistory = () => API.get(`/conversations`)
export const getConversationIds = (bookId: string) => API.get(`/books/${bookId}/conversations`)