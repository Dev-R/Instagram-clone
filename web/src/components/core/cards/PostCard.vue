<template>
	<div class="flex flex-col space-y-2 sm:space-y-0">
		<!-- Header-->
		<div class="flex rounded-lg space-x--1 justify-between">
			<!-- 1: username | daysSinceUpload | options -->
			<div 
				@click="goToUserProfile(post.userName)"
				class="flex space-x-2">
				<div class="story-avatar">
					<a
						href="#"
						class="block bg-white rounded-full relative">
						<img 
							class="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
							:src="post.profilePictureUrl" />
					</a>
				</div>
                    
				<div class="flex pt-1">
					<div class="cursor-pointer font-sans text-sm font-semibold text-white self-center">
						{{ post.userName }}
					<!-- <i class="fa-solid fa-circle-check"></i> -->
					</div>

					<div class="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
						•
					</div>

					<div class="font-sans text-sm font-light text-[#949494] self-center">
						{{ formatDate(post.createdAt as string) }}
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
				<MediaCarousel
					v-if="post.carouselMedia"
					:medias="post.carouselMedia" />
			</div>

			<!-- 3: Actions -->
			<div class="flex justify-between">
				<div class="flex space-x-4">
					<span
						class="cursor-pointer hover:scale-90"
						@click="$emit('onPostLike', post.id)">
						<SVGLoader
							v-if="post.hasLiked"
							:icon="'like'" />
            
						<SVGLoader
							v-else
							:icon="'unlike'" />
					</span>
					<span
						class="cursor-pointer hover:scale-90"
						@click="onOpenCommentModal(post)">
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
					{{ post.caption }}
				</p>
				<p
					v-if="post.commentCount > 0"
					class="text-md text-left
                    text-gray-400 cursor-pointer"
					@click="onOpenCommentModal(post)">
					View all {{ post.commentCount }} comments
				</p>
			</div>
            
			<!-- 6: Comment Form -->
			<div 
				v-if="isCommentAreaVisible"
				class="flex border-b border-slate-800 justify-between  ">
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
    ScreenBreakpoint
} from '@/common'

import {
    useModalManagerStore
} from '@/stores'
import router from '@/router'

const prop = defineProps({
    post: {
        type: Object as () => PostCard,
        required: true,
    },
	isCommentAreaVisible: {
		type: Boolean,
		default: true,
	}
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
    return prop.post.likeCount >= 1 ? `${prop.post.likeCount} Likes` : 'Be the first to like this'
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
    emit('onPostComment', comment, prop.post.id)
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

const formatDate = (date: string) => {
	const dateObj = new Date(date)
	const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions
	return dateObj.toLocaleDateString('en-US', dateOptions)
}

const goToUserProfile = (userName: string) => {
	router.push({ name: 'profile', params: { username: userName, isSelf: 0  } })
	console.log('goToUserProfile')
}

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