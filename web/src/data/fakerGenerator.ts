import {
    UserSample,
    SocialPostSample,
    StoryCarouselSample,
    SuggestionSample,
    NotificationSample,
    PostMediaSample,
    SearchResultSample,
    ReelMediaSample,
    ReelPostSample,
    PostCommentSample
} from '@/data'

import { randomIntFromInterval } from '@/common/helpers'

/**
 * A class that generates fake data for posts, stories, and suggestions.
 */
export class SampleGenerator {
    /**
     * Generates a random number of posts.
     * @param min The minimum number of posts to generate.
     * @param max The maximum number of posts to generate.
     * @returns An array of randomly generated posts.
     */
    public static generateRandomPosts(min: number, max: number) {
        const numbeOfPosts = randomIntFromInterval(min, max)
        return Array.from({
            length: numbeOfPosts
        }, () => new SocialPostSample())
    }

    /**
     * Generates a random number of stories.
     * @param min The minimum number of stories to generate.
     * @param max The maximum number of stories to generate.
     * @returns An array of randomly generated stories.
     */
    public static generateRandomStories(min: number, max: number) {
        const numberOfStories = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfStories
        }, () => new StoryCarouselSample())
    }

    /**
     * Generates a random number of suggestions.
     * @param min The minimum number of suggestions to generate.
     * @param max The maximum number of suggestions to generate.
     * @returns An array of randomly generated suggestions.
     */
    public static generateRandomSuggestions(min: number, max: number) {
        if (max === 1) {
            return new SuggestionSample()
        }
        const numbeOfSuggestions = randomIntFromInterval(min, max)
        return Array.from({
            length: numbeOfSuggestions
        }, () => new SuggestionSample())
    }

    /**
     * Generates a random number of notifications.
     * @param min The minimum number of notifications to generate.
     * @param max The maximum number of notifications to generate.
     * @returns An array of randomly generated notifications.
     */
    public static generateRandomNotifications(min: number, max: number) {
        const numberOfNotifications = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfNotifications
        }, () => new NotificationSample())
    }

    /**
     * Generates a random number of post comments.
     * @param min The minimum number of post comments to generate.
     * @param max The maximum number of post comments to generate.
     * @returns An array of randomly generated post comments.
     */
    public static generateRandomPostComments(min: number, max: number) {
        const numberOfComments = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfComments
        }, () => new PostCommentSample())
    }
    
    /**
     * Generates a random number of post medias.
     * @param min The minimum number of post medias to generate.
     * @param max The maximum number of post medias to generate.
     * @returns An array of randomly generated post medias.
     */
    public static generateRandomPostMedias(min: number, max: number) {
        const numbeOfPostMedias = randomIntFromInterval(min, max)
        return Array.from({
            length: numbeOfPostMedias
        }, () => new PostMediaSample())
    }

    /**
     * Generates a random user.
     * @returns A randomly generated user.
     */
    public static generateRandomUser() {
        return new UserSample()
    }

    /**
     * Generates a random number of users.
     * @param min The minimum number of users to generate.
     * @param max The maximum number of users to generate.
     * @returns An array of randomly generated users.
     */
    public static generateRandomUsers(min: number, max: number) {
        const numberOfUsers = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfUsers
        }, () => new UserSample())
    }

    /**
     * Generates a random number of search results.
     * @param min The minimum number of search results to generate.
     * @param max The maximum number of search results to generate.
     * @returns a random number of search results.
     */
    public static generateRandomSearchResults(min: number, max: number) {
        const numberOfResults = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfResults
        }, () => new SearchResultSample())
    }

    /**
     * Generates a random reel media.
     * @returns A randomly generated reel media.
     */
    public static generateReelMedia() {
        return new ReelMediaSample()
    }

    /**
     * Generates a random number of reel posts.
     * @param min The minimum number of reel posts to generate.
     * @param max The maximum number of reel posts to generate.
     * @returns An array of randomly generated reel posts.
     */
    public static generateRandomReelPosts(min: number, max: number) {
        const numberOfPosts = randomIntFromInterval(min, max)
        return Array.from({
            length: numberOfPosts
        }, () => new ReelPostSample())
    }
}