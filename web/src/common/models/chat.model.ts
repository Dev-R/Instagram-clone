import type { BaseUser } from "./user.model"

/**
 * Represents an emoji reaction.
//  */
// export interface Emoji {
//     /** Timestamp of the emoji reaction */
//     timeStamp: number

//     /** ID of the sender */
//     senderId: string

//     /** Emoji value */
//     emoji: string
// }

/**
 * Represents reactions associated with a chat item.
 */
export interface Reactions {
    /** Array of liked items */
    likes: any[]

    /** Number of likes */
    likesCount: number

    /** Array of emoji reactions */
    // Emojis: Emoji[]
}

/**
 * Represents a chat item.
 */
export interface ChatDialog {
    /** ID of the chat item */
    utemId?: string

    /** A simple instance of the user */
    user?: Sender | Viewer

    /** Timestamp of the chat item */
    timestamp?: number

    /** Type of the chat item */
    itemType?: string

    /** Indicates if the chat item is sent by the viewer */
    isSentByViewer?: boolean

    /** Unique sequence ID of the chat item */
    uqSeqId?: number

    /** Text content of the chat item */
    text?: string

    /** Image as a data URI scheme of the chat item*/
    img?: string

    /** Reactions associated with the chat item */
    reactions?: Reactions
}

/**
 * Represent a single conversation instance between two users.
 */
export interface Conversation {
    /** Unique identifier for the conversation */
    uuid: string

    /** User who initiated the conversation */
    user: Sender

    /** Last message in the conversation */
    lastMessage: string

    /** Time elapsed since the last message */
    timeSinceLastMessage: string

    /** Dialogs (messages) in the conversation */
    dialogs: ChatDialog[]

    /** Indicates if the conversation is currently active */
    isActive: boolean
}



/**
 * Represents an inbox containing chat threads.
 */
export interface Inbox {
    /** List of chat threads */
    threads: Conversation[]

    /** Number of unseen chats */
    unseenCount: number

    /** Timestamp of the last update to the unseen count */
    unseenCountTimeStamp: number
}

/**
 * Represents the viewer (current user) of the application.
 */
export interface Viewer extends BaseUser {

}

/**
 * Represents the Sender (chatting to) of the application.
 */
export interface Sender extends BaseUser {

}
