<template>
	<!-- Desktop Modal Header -->
	<div 
		:class="postComment.isToggled ? 'md:block' : ''"
		class="hidden fixed inset-x-0 top-5 right-0">
		<div class="md:mr-12 flex items-center justify-between cursor-pointer">
			<span class="ml-auto inline-flex text-white">
				<SVGLoader
					:icon="'cross'"
					@click="onModalClosed()" />
			</span>
		</div>
	</div>

	<div
		class="w-full z-50 fixed h-screen md:h-auto
        top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
		:class="{
			'hidden': !postComment.isToggled,
			'max-w-xs': modalSize === ModalSize.SuperSmall,
			'max-w-sm': modalSize === ModalSize.ExtraSmall,
			'max-w-md': modalSize === ModalSize.Small,
			'max-w-lg': modalSize === ModalSize.Medium,
			'max-w-4xl': modalSize === ModalSize.Large,
			'max-w-7xl': modalSize === ModalSize.ExtraLarge
		}">
		<!-- Mobile Modal Header -->
		<div class="md:hidden block">
			<div class="flex justify-between cursor-pointer bg-black w-full p-3 border-b border-gray-700">
				<span
					class="rotate-[270deg]"
					@click="onModalClosed()">
					<SVGLoader :icon="'back-arrow'" />
				</span>
				<span class="font-sans text-md font-semibold text-white">
					Comments
				</span>
				<span>
					<SVGLoader :icon="'share'" />
				</span>
			</div>
		</div>

		<!-- Modal Body -->
		<div 
			class="container mx-auto z-50 block 
            w-full overflow-x-hidden overflow-y-auto 
            md:inset-0">
			<!-- Modal Content -->
			<div 
				class="relative bg-black 
                flex md:flex-row flex-col">
				<!-- Carousel Container -->
				<div 
					class="md:p-0 md:block p-2 w-full hidden">
					<MediaCarousel 
						v-if="postComment.post.carouselMedia"
						:style="'rounded-none'"
						:medias="postComment.post.carouselMedia" />
				</div>

				<!-- Comment Container -->
				<div 
					class="flex flex-col sm:space-y-4 lg:basis-7/12 sm:basis-10/12
                    z-50 sm:border-l border-slate-800 sm:p-2">
					<div class="flex flex-col sm:space-x-1 justify-between sm:p-2">
						<!-- 1: username | daysSinceUpload | options for screens > 640px -->
						<div class="sm:block hidden">
							<div class="flex justify-between border-b border-slate-800 p-3">
								<div class="flex space-x-2">
									<div class="story-avatar">
										<a
											href="#"
											class="block bg-white rounded-full relative">
											<img 
												class="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
												:src="postComment.post.profilePictureUrl" />
										</a>
									</div>
										
									<div class="flex pt-1">
										<div class="cursor-pointer font-sans text-sm font-semibold text-white self-center">
											{{ postComment.post.userName }}
											<!-- <i class="fa-solid fa-circle-check"></i> -->
										</div>

										<div class="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
											•
										</div>

										<div class="font-sans text-sm font-light text-[#949494] self-center">
											{{ postComment.post.createdAt }}
										</div>
									</div>
								</div>

								<div class="cursor-pointer">
									<SVGLoader :icon="'comment-options'" />
								</div>
							</div>
						</div>

						<!-- 2: comment form for screens < 640px -->
						<div class="block sm:hidden"> 
							<div 
								class="flex justify-between border-b 
                                border-t border-slate-700 
                                bg-slate-1100 p-2.5 space-x-4">
								<div class="flex">
									<img 
										:src="postComment.post.profilePictureUrl"
										class="cursor-pointer h-10 w-10 rounded-full shadow-lg" />
								</div>


								<div class="flex w-full relative">
									<input 
										v-model="commentForm"
										type="text"
										class="bg-black border border-slate-800
                                        text-white text-sm rounded-full w-full p-3" 
										placeholder="Add a comment..." 
										@click="onAddComment()" />
									<div 
										:class="commentForm ? 'text-sky-500 sm:cursor-pointer' : 'text-white'"
										class="absolute inset-y-0 right-5 
										flex items-center pl-3 pointer-events-none 
										font-semibold">
										Post
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 2: Comment Rendering -->
					<div 
						class="lg:max-h-[600px] sm:max-h-[211px] h-screen
                        sm:p-1 space-y-7 overflow-y-auto scrollbar 
                        scrollbar-none">
						<CommentCard 
							v-for="comment of postComment.post.comments" 
							:key="comment.id"
							v-if="postComment.post.comments && postComment.post.comments.length >= 1"
							:comment="comment"
							@on-comment-like="onCommentLiked" />

						<div
							v-else
							class="flex flex-col space-y-2">
							<span
								class="font-sans lg:text-2xl md:text-md text-white font-bold self-center">
								No comments yet.
							</span>
							<span
								class="font-sans text-sm text-white font-normal self-center">
								Start the conversation.
							</span>
						</div>
					</div>
                    
					<!-- 3: Comment Actions --> 
					<div class="sm:block hidden">
						<div class="flex justify-between p-2 border-t border-slate-800">
							<div class="flex space-x-4">
								<span 
									class="cursor-pointer hover:scale-90"
									@click="onPostLike">
									<SVGLoader 
										v-if="postComment.post.hasLiked"
										:icon="'like'" />
                                    
									<SVGLoader 
										v-else
										:icon="'unlike'" />
								</span>

								<span 
									class="cursor-pointer hover:scale-90"
									@click="focusTextArea">
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
					</div>

					<!-- 4: Number of Likes | Upload date -->
					<div class="sm:block hidden">
						<div class="flex flex-col space-y-2 space-x-2">
							<span 
								class="pl-2 cursor-pointer font-sans text-sm 
                                font-semibold text-white self-start">
								{{ numberOfLikes }}
								<!-- {{ postComment.likes }} -->
							</span>

							<span 
								class="cursor-pointer font-sans 
                                text-gray-600 text-xs self-start">
								{{ postComment.post.createdAt }}
								<!-- {{ postComment.uploadDate }} -->
							</span>
						</div>
					</div>

					<!-- 5: Comment Form > 640px: -->
					<div class="sm:block hidden">
						<div class="flex justify-between border-t border-slate-800 p-2 pb-0">
							<span class="hover:cursor-pointer self-center relative">
								<EmojiPickerModal
									@select-emoji="appendEmoji" />
							</span>

							<textarea 
								ref="commentFormElementRef"
								v-model="commentForm"
								rows="1"
								class="focus:outline-none resize-none placeholder:text-gray-1100
                                    block w-full text-md bg-black text-white border-none mx-5"
								placeholder="Add a comment..."
								@keypress.enter.prevent="onAddComment"></textarea>
							<span
								:class="commentForm ? 'text-sky-500 sm:cursor-pointer' : 'text-white'"
								class="font-sans text-md text-white justify-self-end mb-2 cursor-default"
								@click="onAddComment()">
								Post
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    computed,
    ref
} from 'vue'

import {
    SVGLoader,
    CommentCard,
    MediaCarousel,
	EmojiPickerModal
} from '@/components'


import {
    ModalSize,
    type PostCommentModal,
    type PostCommentCard,
    type Emoji
} from '@/common'

import {
    useModalManagerStore
} from '@/stores'


const prop = defineProps({
    postComment: {
        type: Object as () => PostCommentModal,
        required: true,
    },
    modalSize: {
        type: String,
        default: ModalSize.ExtraLarge
    }
})

const emit = defineEmits([
    'onAddComment',
    'onDeleteComment',
    'onModalOpened',
    'onModalClosed',
    'onCommentLiked',
    'onPostLiked'
])

// Forms 
const commentForm = ref<string>('')

// DOM Refs
const commentFormElementRef = ref<HTMLAreaElement>()

// Stores
const modalManagerStore = useModalManagerStore()

// Computed
const numberOfLikes = computed(() => {
    return prop.postComment.post.likeCount >= 1 ? `${ prop.postComment.post.likeCount } Likes` : 'Be the first to like this'
})

/**
 * Select emoji when user click on the emoji icon
 * @param {Emoji} emoji - The emoji selected
 */
const appendEmoji = (emoji: Emoji) => {
    commentForm.value += emoji.i
}

/**
 * Focus on text area when user click on the comment icon
 */
const focusTextArea = () => {
    commentFormElementRef.value?.focus()
}

/**
 * Reset comment value
 */
const resetCommentValue = () => {
    commentForm.value = ''
}

/**
 * Emit signal to add new comment
 * @param {string} commentText - The text of the new comment
 */
const onAddComment = () => {
    if (commentForm.value) {
        emit('onAddComment', commentForm.value)
        resetCommentValue()
    }
}

/**
 * Emit signal to delete existing comment
 * @param {number} commentId - The ID of the comment to be deleted
 */
const onDeleteComment = (commentId: number) => {
    emit('onDeleteComment', commentId)
}

//    /**
//    * Emit signal when the modal is opened
//    * @event modal-opened
//    */
// 	const onModalOpened = () => {
// 		emit('onModalOpened')
// 	}

/**
 * Emit signal when the modal is closed
 * @event modal-closed
 */
const onModalClosed = () => {
    emit('onModalClosed')
    closeCommentModal()
}

/**
 * Emit signal when a comment is liked
 * @event comment-liked
 * @param {number} commentId - The ID of the comment being liked
 */
const onCommentLiked = (commentId: PostCommentCard['id']) => {
    emit('onCommentLiked', commentId)
}

/**
 * Emit signal when a post is liked
 */
const onPostLike = () => {
    emit('onPostLiked')
}

/**
 * Close the comment modal from the modal manager store
 */
const closeCommentModal = () => {
        modalManagerStore.modalName = null
}
</script>

