<template>
    <div class="flex flex-col space-y-2 sm:space-y-0">
        <!-- Header-->
        <div class="flex rounded-lg space-x--1 justify-between">
            <!-- 1: username | daysSinceUpload | options -->
            <div class="flex space-x-2">

                <div class="story-avatar">
                        <a href="#" class="block bg-white rounded-full relative">
                            <img 
                                class="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
                                :src="postItem.profilePictureUrl"/>
                        </a>
                </div>
                    
                <div class="flex pt-1">
                    <div class="cursor-pointer font-sans text-sm font-semibold text-white self-center">
                        {{ postItem.userName }}
                        <!-- <i class="fa-solid fa-circle-check"></i> -->
                    </div>

                    <div class="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
                        •
                    </div>

                    <div class="font-sans text-sm font-light text-[#949494] self-center">
                        {{ postItem.createdAt }}
                    </div>
                </div>

            </div>

            <div class="cursor-pointer self-end">
                <SVGLoader 
                    :icon="'more-options'" />
            </div>

        </div>

        <div class="flex flex-col space-y-3">
            <!-- 2: Medias -->
            <div class="md:max-h-[585px] px-0.5">
                <!-- <img src="https://loremflickr.com/1024/1280" class="rounded"> -->
                <MediaCarousel
                    v-if="postItem.carouselMedia"
                    :medias="postItem.carouselMedia" />
            </div>

            <!-- 3: Actions -->
            <div class="flex justify-between">
                <div class="flex space-x-4">
                    <span
                        @click="$emit('onPostLike', postItem.id)"
                        class="cursor-pointer hover:scale-90">
                        <SVGLoader
                            v-if="postItem.hasLiked" :icon="'like'" />
            
                        <SVGLoader
                            v-else :icon="'unlike'" />
                    </span>
                    <span
                        @click="onOpenCommentModal(postItem.id)"
                        class="cursor-pointer hover:scale-90">
                        <SVGLoader
                            :icon="'comment'" />
                    </span>
                    <span class="cursor-pointer hover:scale-90">
                        <SVGLoader
                            :icon="'share'" />
                    </span>
                </div>
                <div class="cursor-pointer hover:scale-90">
                    <SVGLoader
                        :icon="'save'" />
                </div>
            </div>

            <!-- 4: Likes -->
            <div class="cursor-pointer font-sans text-sm font-semibold text-white self-start">
                {{ findNumberOfLikes }}
            </div>

            <!-- 5: Caption -->
            <div class="font-sans text-sm text-white flex-col">
                <!-- <span class="font-semibold">imamomarsuleiman</span> -->
                <p class="text-sm text-left indent-8 break-all ">
                    {{ postItem.caption }}
                </p>
                <p
                    v-if="postItem.commentCount > 0"
                    @click="onOpenCommentModal(postItem.id)"
                    class="text-md text-left
                    text-gray-400 cursor-pointer">
                    View all {{ postItem.commentCount }} comments
                </p>
            </div>
            
            <!-- 6: Comment Form -->
            <div class="grid grid-cols-12 border-b border-slate-800 p-2">
                <span class="col-span-10">
                    <textarea
                        rows="1"
                        class="focus:outline-none resize-none border-none
                        block w-full text-sm bg-black text-gray-600"
                        placeholder="Add a comment..."></textarea>
                </span>
                <span
                    class="font-sans text-xs text-sky-500
                    justify-self-end cursor-pointer
                    hover:text-white h-6">
                    Post
                </span>
                <span
                    class="text-gray-600 justify-self-end
                    cursor-pointer fa-regular fa-face-smile
                    w-3 h-3">
                </span>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import { 
    defineComponent, 
    ref, 
    computed 
} from 'vue'

import {
    // SVGLoader,
    // MediaCarousel
} from '@/components'

import SVGLoader from '@/components/basics/SVGLoader.vue'
import MediaCarousel from '@/components/carousels/MediaCarousel.vue'

import type { 
    PostCard 
} from '@/common'


export default defineComponent({
    name: 'PostCard',
    setup(props, context) {

        // Flags
        const isCommentModalOpen = ref(false);

        // Computed
        const findNumberOfLikes = computed(() => {
            return props.postItem.likeCount >= 1 ? `${props.postItem.likeCount} Likes` : 'Be the first to like this' 
        })

        /**
         * Emit signal when comment modal button is clicked
         * @event comment-unliked
         * @param {string} postId - The ID of the post
         */
        const onOpenCommentModal = (postId: string | undefined) => {
            isCommentModalOpen.value = true;
            console.log("Emitting signal:", postId)
            context.emit('onOpenCommentModal', postId);
        };
        
        return {
            isCommentModalOpen,
            onOpenCommentModal,
            findNumberOfLikes
        }
    },
    components: {
        SVGLoader,
        MediaCarousel,
    },
    props: {
        postItem: {
            type: Object as () => PostCard,
            required: true,
        },
    },
    emits: [
        'onOpenCommentModal',
        'onPostLike'
    ]
})
</script>

<style scoped>
.story-avatar {
    position: relative;
    border-radius: 50%;
    padding: 2.0px;
    background-image: linear-gradient(to right top,#ffc600 20%,#ff0040,#e600cc 80%);
}
</style>