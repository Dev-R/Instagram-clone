import type {
    Sender,
    Viewer,
    ChatDialog,
    User,
    Conversation
} from '@/common'
import {
    faker
} from '@faker-js/faker'

const numberOfConversations = 5; // Change this to the desired number of instances


/**
 * Represents a fake user model.
 * @implements {User}
 */
export class UserSample implements User {
    id = faker.string.uuid()
    firstName = faker.person.firstName()
    lastName = faker.person.lastName()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    email = faker.internet.email()
    followerCount = faker.number.int()
    followingCount = faker.number.int()
    gender = 'Other' as User['gender']
    friendShip = {
        muting: faker.datatype.boolean(),
        isMutingReel: faker.datatype.boolean(),
        following: faker.datatype.boolean(),
        outgoingRequest: faker.datatype.boolean()
    }
    dateJoined = faker.date.past().toISOString()
    mediaItems = []
}

/**
 * Represents a fake chat dialog model.
 * @implements {ChatDialog}
 */
export class ChatDialogSample implements ChatDialog {
    utemId = faker.string.uuid()
    user: User
    timestamp = faker.date.recent().getTime()
    itemType = 'text'
    isSentByViewer = faker.datatype.boolean()
    uqSeqId = faker.number.int()
    text = faker.lorem.sentence()
    img = faker.image.avatar()
    reactions = {
        likes: [],
        likesCount: faker.number.int()
    }
    constructor(user: User) {
        this.user = user
    }
}

/**
 * Represents a fake conversation model.
 * @implements {Conversation}
 */
export class ConversationSample implements Conversation {
    uuid = faker.string.uuid()
    user = new UserSample()
    lastMessage = faker.lorem.sentence()
    timeSinceLastMessage = faker.date.recent().toISOString()
    dialogs: ChatDialog[] = []
    isActive = faker.datatype.boolean()
    
}