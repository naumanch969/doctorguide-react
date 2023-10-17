export interface Category {
    name: string,
    _id: string,
    toolSubcategories?: { name: string, id: string }[],
    bookSubcategories?: { name: string, id: string }[],
    subcategories: { name: string, id: string }[]
}
export interface Subcategory {
    name: string;
    _id: string;
    id?: string;
    bookCategory?: { name: string; id: string } | undefined;
    toolCategory?: { name: string; id: string } | undefined;
}

export interface Tool {
    _id: string,
    name: string,
    category: string,
    subcategory: string,
    webImage: string,
    mobileImage: string,
    inputFields: { fieldName: string, placeholder: string }[] | [],
    systemRole: string,
    prompt: string,
    languageDropdown: string
}

export interface Book {
    _id: string,
    name: string,
    category: string,
    subcategory: string,
    webImage: string,
    mobileImage: string,
    files: { fileName: string, disabled: true, _id: string, __v: number }[] | [],
    indexName: string,
    initialMessage: string,
    suggestedQuestions: [string] | []
}

export interface User {
    email: string,
    googleId: string,
    name: string,
    imageUrl: string,
    verified: boolean,
    createdAt: string,    //Date
    updatedAt: string,
    category: string | Category,
    role: string,
    conversations: [{ conversationId: string, bookId: string }] | [],
    remainingMessages: number,
    stripeCustomerId: string,
    subscription: string,
    usageLogs: [{ date: string, messagesUsed: number }] | []
}

export interface Message {
    createdAt: string,
    updatedAt: string,
    message: string,
    _v: string,
    user: { email: string, name: string, _id: string },
    _id: string,
}

export interface Plan {
    _id: string,
    name: string,
    billing: string,
    price: string,
    messagesPerMonth: number,
    priceId: string,
    features: string[]
}

export interface ConversationMessage {
    role: string
    text: string
    sourceDocuments: { pageContent: string, metadata: { fileId: string } }[] | []
    questions: string[] | []
}