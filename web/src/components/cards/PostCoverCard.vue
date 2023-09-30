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

</template>
<script setup lang="ts">
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    type PropType
} from 'vue'

import {
    type PostCard as PostCardType,
    ScreenBreakpoint,
    ModalName
} from '@/common'

import { 
    useModalManagerStore 
} from '@/stores'

defineProps({
    posts: {
        type: Object as PropType<PostCardType[]> ,
        required: true,
    }
})
const emit = defineEmits([
    'on-comment-liked',
    'on-add-comment',
    'on-post-liked'
])

// Data
const activePost = ref<PostCardType | undefined>(undefined)

// Services
const modalStoreManager = useModalManagerStore()

/**
 * Open comment modal and set active post
 */
const openCommentModal = () => {
    const modalName = screenSizeType.value === 'xs' ? ModalName.PROFILE : ModalName.COMMENT
    modalStoreManager.openModal(modalName)
    modalStoreManager.setActivePost(activePost.value)
}

/**
 * Handle post cover click
 * @param post 
 */
const handlePostCover = (post: PostCardType) => {
    activePost.value = post
    openCommentModal()
}

/** 
* Return current screen size type
*/
const screenSizeType = computed(() => (windowWidth.value < ScreenBreakpoint.Small ? 'xs' : false))

/**
 * Return current screen width
 */
const windowWidth = ref(window.innerWidth) // Current window width


/**
* Get current screen width
*/
const onWidthChange = () => windowWidth.value = window.innerWidth

// Lifecycle Hooks 
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

</script>