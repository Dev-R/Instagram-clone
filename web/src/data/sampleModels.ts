import {
    faker
} from '@faker-js/faker'

import media from './videos.json'

import {
    SampleGenerator
} from '@/data'

import {
    formatDate
} from '@/common'

import type {
    ChatDialog,
    User,
    Conversation,
    PostMedia,
    ReelPost,
    ReelMedia,
    PostCard as SocialPost,
    PostComment,
    StoryCarousel,
    SuggestionCard as Suggestion,
    NotificationCard as Notification,
    SearchCard as SearchResult
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
    followerCount = faker.number.int({ min: 2, max: 1000 })
    followingCount = faker.number.int({ min: 2, max: 1000 })
    gender = 'Other' as User['gender']
    friendShip = {
        muting: faker.datatype.boolean(),
        isMutingReel: faker.datatype.boolean(),
        following: faker.datatype.boolean(),
        outgoingRequest: faker.datatype.boolean()
    }
    dateJoined = faker.date.past().toISOString()
    mediaItems = SampleGenerator.generateRandomPosts(2, 10)
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
 * Represents a fake post comment model.
 * @implements {PostComment}
 */
export class PostCommentSample implements PostComment {
    id = faker.number.int()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    content = faker.lorem.sentence()
    createdAt = formatDate(faker.date.recent().toISOString())
}

/**
 * Represents a fake post media model.
 * @implements {PostMedia}
 */
export class PostMediaSample implements PostMedia {
    static index = 0; // TODO: Remove this, after updating MediaCarousel -> BAD PRACTICE
    index = PostMediaSample.index
    type = 'image' as PostMedia['type']
    mediaUrl = faker.image.url({ width: 1024, height: 1280 })
    width = 1024
    height = 1280
    title = faker.lorem.sentence({ min: 5, max: 10 })
    constructor() {
        // TODO: Remove this, after updating MediaCarousel -> BAD PRACTICE
        const currentMediaIndex = PostMediaSample.index
        if (currentMediaIndex === 2) {
            PostMediaSample.index = 0
        } else {
            PostMediaSample.index++
        }
    }
}

/**
 * Represents a fake post card model.
 * @implements {SocialPost}
 */
export class SocialPostSample implements SocialPost {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    createdAt = formatDate(faker.date.recent().toISOString())
    caption = faker.lorem.sentence()
    likeCount = faker.number.int({ min: 2, max: 1000 })
    hasLiked = faker.datatype.boolean()
    isFollowed = faker.datatype.boolean()
    commentCount = faker.number.int({ min: 2, max: 1000 })
    comments = SampleGenerator.generateRandomPostComments(1, 10)
    carouselMedia = SampleGenerator.generateRandomPostMedias(1, 5)
}

/**
 * Represents a fake story carousel model.
 * @implements {StoryCarousel}
 */
export class StoryCarouselSample implements StoryCarousel {
    id = faker.number.int()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    expiringAt = faker.date.recent().toISOString()
    seen = faker.datatype.boolean()
    hasLiked = faker.datatype.boolean()
    mediaCount = 1
    items = SampleGenerator.generateRandomPostMedias(1, 5)
}

/**
 * Represents a fake suggestion model.
 * @implements {Suggestion}
 */
export class SuggestionSample implements Suggestion {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    createdAt = formatDate(faker.date.recent().toISOString())
    caption = faker.lorem.sentence()
    suggested = [{ // TOOD: Extract this to a separate model
        userName: faker.internet.userName(),
        profilePictureUrl: faker.image.avatar(),
        followedBy: faker.internet.userName()
    }]
}

/**
 * Represents a fake notification model.
 * @implements {Notification}
 */
export class NotificationSample implements Notification {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    type = faker.helpers.arrayElement(['like', 'comment', 'follow']) as Notification['type']
    isFollowing = faker.datatype.boolean()
}

/**
 * Represents a fake search result model.
 * @implements {SearchResult}
 */
export class SearchResultSample implements SearchResult {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    createdAt = faker.date.recent().toISOString()
    caption = faker.lorem.sentence()
    bio = faker.lorem.sentence()
}

/**
 * Represents a fake reel media model.
 * @implements {ReelMedia}
 */

export class ReelMediaSample implements ReelMedia {
    type = 'video' as ReelMedia['type']
    mediaUrl = faker.helpers.arrayElement(media.videos).sources[0] as ReelMedia['mediaUrl']
    width = faker.number.int({ min: 2, max: 1000 })
    height = faker.number.int({ min: 2, max: 1000 })
    title = faker.lorem.sentence()
    location = faker.location.city()
}

/**
 * Represents a fake reel post model.
 * @implements {ReelPost}
 */
export class ReelPostSample implements ReelPost {
    id = faker.string.uuid()
    userName = faker.internet.userName()
    profilePictureUrl = faker.image.avatar()
    createdAt = formatDate(faker.date.recent().toISOString())
    caption = faker.lorem.sentence()

    likeCount = faker.number.int({ min: 2, max: 1000 })
    hasLiked = faker.datatype.boolean()
    isFollowed = faker.datatype.boolean()
    commentCount = faker.number.int({ min: 2, max: 1000 })
    comments = []
    reelMedia = SampleGenerator.generateReelMedia()
}