<template>
    <div class="flex flex-col space-y-4 pt-2">

        <!-- Header-->
        <div class="flex rounded-lg space-x--1 justify-between">
            <!-- 1: username | daysSinceUpload | options -->
            <div class="flex space-x-2">

                <img 
                    :src="postItem.profilePictureUrl" 
                    class="cursor-pointer h-8 w-8 rounded-full 
                    shadow-lg">
                    
                <div class="flex pt-1">
                    <div class="cursor-pointer font-sans text-sm font-semibold text-white">
                        {{ postItem.userName }}
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <div class="text-gray-500 w-5 font-sans text-md font-semibold text-white">
                        •
                    </div>

                    <div class="font-sans text-sm font-semibold text-gray-500">
                        {{ postItem.createdAt }}
                    </div>
                </div>

            </div>

            <div class="cursor-pointer">
                <SVGLoader :icon="'more-options-svg'" />
            </div>

        </div>
        <!-- 2: Medias -->
        <div class="md:max-h-[585px] p-1">
            <!-- <img src="https://loremflickr.com/1024/1280" class="rounded"> -->
            <MediaCarousel :medias="postItem.carouselMedia"/>
        </div>
        <!-- 3: Actions -->
        <div class="flex justify-between">

            <div class="flex space-x-4">

                <span class="cursor-pointer hover:scale-90">
                    <SVGLoader 
                        v-if="postItem.hasLiked" :icon="'like'"/>
                    
                    <SVGLoader 
                        v-else :icon="'unlike'"/>
                </span>

                <span 
                    @click="onOpenCommentModal(postItem.id)"
                    class="cursor-pointer hover:scale-90">
                    <SVGLoader :icon="'comment'" />
                </span>

                <span class="cursor-pointer hover:scale-90">
                    <SVGLoader :icon="'share'" />
                </span>

            </div>

            <div class="cursor-pointer hover:scale-90">
                <SVGLoader :icon="'save'" />
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
                    class="focus:outline-none resize-none 
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import SVGLoader from "@/components/basics/SVGLoader.vue"
import MediaCarousel from '@/components/basics/MediaCarousel.vue'
import type { PostCard } from '@/common/models/post.model'

export default defineComponent({
    name: 'PostCard',
    setup(props, context) {

        // Checkers
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
        const onOpenCommentModal = (postId: string) => {
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
        'onOpenCommentModal'
    ]
})
</script>