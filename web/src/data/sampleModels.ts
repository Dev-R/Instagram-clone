import {
    faker
} from '@faker-js/faker'

import type {
    ChatDialog,
    User,
    Conversation,
    PostMedia,
    PostCard
} from '@/common'
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

/**
 * Represents a fake post media model.
 * @implements {PostMedia}
 */
export class PostMediaSample implements PostMedia {
    index = faker.number.int()
    type = 'video' as PostMedia['type']
    mediaUrl = faker.image.url({width: 1024, height: 1280})
    width = 1024
    height = 1280
    title = faker.lorem.sentence({min: 5, max: 10})
}

export class SocialPostSample implements PostCard {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    createdAt = faker.date.recent().toISOString()
    caption = faker.lorem.sentence()
    likeCount = faker.number.int({min: 2, max: 1000})
    hasLiked = faker.datatype.boolean()
    isFollowed = faker.datatype.boolean()
    commentCount = faker.number.int({min: 2, max: 1000})
    comments = []
    carouselMedia = [
        new PostMediaSample(),
        new PostMediaSample(),
        new PostMediaSample(),
    ]
}