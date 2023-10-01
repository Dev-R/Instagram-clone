<template>
	<div class="flex flex-col space-y-2 sm:space-y-0">
		<!-- Header-->
		<div class="flex rounded-lg space-x--1 justify-between">
			<!-- 1: username | daysSinceUpload | options -->
			<div class="flex space-x-2">
				<div class="story-avatar">
					<a
						href="#"
						class="block bg-white rounded-full relative">
						<img 
							class="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
							:src="postItem.profilePictureUrl" />
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
						class="cursor-pointer hover:scale-90"
						@click="$emit('onPostLike', postItem.id)">
						<SVGLoader
							v-if="postItem.hasLiked"
							:icon="'like'" />
            
						<SVGLoader
							v-else
							:icon="'unlike'" />
					</span>
					<span
						class="cursor-pointer hover:scale-90"
						@click="onOpenCommentModal(postItem)">
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
					class="text-md text-left
                    text-gray-400 cursor-pointer"
					@click="onOpenCommentModal(postItem)">
					View all {{ postItem.commentCount }} comments
				</p>
			</div>
            
			<!-- 6: Comment Form -->
			<div class="flex border-b border-slate-800 justify-between  ">
				<span class="basis-4/5">
					<textarea
						v-model="comment"
						rows="1"
						class="outline-none resize-none border-none text-white
                        block w-full text-sm bg-black placeholder:text-gray-1100"
						placeholder="Add a comment..."
						@keypress.enter.prevent="onPostComment"></textarea>
				</span>
				<span
					v-show="comment.length > 0"
					class="font-sans text-md text-sky-500
                    cursor-pointer
                    hover:text-white h-6"
					@click="onPostComment">
					Post
				</span>
				<span class="relative cursor-pointer">
					<EmojiPickerModal 
						@select-emoji="appendEmoji" />
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
	onMounted,
    onUnmounted
} from 'vue'

import {
	SVGLoader,
	EmojiPickerModal,
	MediaCarousel,
} from '@/components'

import {
    type PostCard,
    type Emoji,
    ModalName,
	type PostCard as PostCardType,
    ScreenBreakpoint
} from '@/common'

import {
    useModalManagerStore
} from '@/stores'

const prop = defineProps({
    postItem: {
        type: Object as () => PostCard,
        required: true,
    },
})

const emit = defineEmits([
    'onOpenCommentModal',
    'onPostLike',
    'onPostComment',
])

const comment = ref('')


// Stores
const modalStoreManager = useModalManagerStore()

// Computed
const findNumberOfLikes = computed(() => {
    return prop.postItem.likeCount >= 1 ? `${prop.postItem.likeCount} Likes` : 'Be the first to like this'
})

/**
 * Emit signal when comment modal button is clicked
 * @param {string} postId - The ID of the post
 */
const onOpenCommentModal = (post: PostCard) => {
    const modalName = screenSizeType.value === 'xs' ? ModalName.PROFILE : ModalName.COMMENT
    modalStoreManager.openModal(modalName)
    modalStoreManager.setActivePost(post)
}

/**
 * Emit signal when post button is clicked
 * @event on-post-comment
 */
const onPostComment = () => {
    comment.value = ''
    console.log("Emitting signal:", comment.value)
    emit('onPostComment', comment, prop.postItem.id)
}

/**
 * Append emoji to comment
 * @param emoji - The emoji object
 */
const appendEmoji = (emoji: Emoji) => {
    comment.value += emoji.i
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