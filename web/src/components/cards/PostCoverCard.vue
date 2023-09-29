<template>
    <div class="flex flex-wrap">
        <div 
            v-for="(post, index) of posts"
            :key="index"
            class="h-fit w-fit basis-1/3 p-0.5 
            relative hover:brightness-75 group 
            hover:cursor-pointer"
            @click="(event) => handlePostCover(post)">

            <div 
                class="flex absolute space-x-4 top-1/2 
                left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                md:group-hover:visible invisible">
                <div 
                    class="flex font-bold text-white text-md space-x-1">
                    <i class="fa-solid fa-heart mt-1"></i>

                    <span>
                        {{ post.likeCount }}
                    </span>
                </div>

                <div class="flex font-bold text-white text-md space-x-1">
                    <i class="fa-solid fa-comment mt-1"></i>

                    <span>
                        {{ post.commentCount }}
                    </span>
                </div>
            </div>

            <img 
                v-if="post.carouselMedia"
                :src="post.carouselMedia[0]?.mediaUrl" />

        </div>
    </div>
		<CommentModal
            v-if="activePost && isModalToggled"
			:post-comment="{
				isToggled: isModalToggled,
				post : activePost,
			}" 
			@on-comment-liked="$emit('on-comment-liked', $event)"
			@on-add-comment="$emit('on-add-comment', $event)"
			@on-post-liked="$emit('on-post-liked', $event)"
			@on-modal-closed="triggerCommentModal" />

        <!-- TODO: Figure this shit out -->
        <!-- <div class="md:max-w-md justify-self-end p-2">
            <PostCard
                v-if="activeModal.name === ModalType.Profile"
                :post-item="postItems[activeModal.postId]" />
        </div> -->
</template>

<script setup lang="ts">
import {
    ref,
    type PropType
} from 'vue'

import {
    CommentModal
} from '@/components'

import type {
    PostCard
} from '@/common'

defineProps({
    posts: {
        type: Object as PropType<PostCard[]> ,
        required: true,
    }
})
const emit = defineEmits([
    'on-comment-liked',
    'on-add-comment',
    'on-post-liked'
])
const activePost = ref<PostCard | undefined>(undefined)

const isModalToggled = ref(false)

const triggerCommentModal = () => {
    isModalToggled.value = !isModalToggled.value
}

const handlePostCover = (post: PostCard) => {
    activePost.value = post
    triggerCommentModal()
}
</script>