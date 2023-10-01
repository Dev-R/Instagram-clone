import {
    SocialPostSample,
    StoryCarouselSample,
    SuggestionSample,
    NotificationSample
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
}