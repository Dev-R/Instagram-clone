<template>
	<div class="bg-black">
		<section 
			class="container md:max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': 1 != 1 }">
			<div class="md:grid grid-cols-12 flex justify-center">
				<!-- Left bar: Navigation -->
				<div 
					class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="
                    lg:col-span-8 lg:grid md:col-span-6
                    scrollbar scrollbar-thumb-gray-900
                    md:col-start-2 md:p-0 col-span-12 p-2">
					<!-- Profile Info -->
					<div 
						class="flex flex-col md:w-[935px] flex-nowrap space-y-4 
                        pt-2 md:pt-5 justify-self-end md:ml-5 lg:ml-0 ">
						<!-- Image Rendering Section -->
						<div
							class="flex flex-wrap">
							<div 
								v-for="(post, index) of postItems"
								class="h-fit w-fit basis-1/3 p-0.5 
                                relative hover:brightness-75 group 
                                hover:cursor-pointer"
								@click="triggerCommentModal(index)">
                                <!-- Post item card -->
								<div 
									class="flex absolute space-x-4 top-1/2 
                                    left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    md:group-hover:visible invisible">
									<div 
										class="flex font-bold text-white 
                                        text-md space-x-1">
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
					</div>
				</div>
			</div>
		</section>

		<!-- Comment Modal -->
		<CommentModal
			:post-comment="{
				isToggled: commentModal.isToggled,
				post : postItems[commentModal.postId],
			}" 
			@on-modal-closed="triggerCommentModal" />
	</div>
</template>
 
<script lang="ts">

import {
	onMounted,
	defineComponent,
	ref,
	computed
} from 'vue'


import {
	NavBarMain,
	SmallModal,
	CommentModal,
	SVGLoader
} from '@/components'

import type { commentModalName, PostCard, PostMedia } from '@/common'
import {
	ProfileTab,
	ProfileTriggeredModal
} from '@/common'

// Sample Data
const mediasArraySampleA: PostMedia[] = [
	{
		index: 0,
		type: 'image',
		mediaUrl:
            'https://loremflickr.com/1024/1280/cat',
		title: 'Legendary A'
	},
	{
		index: 1,
		type: 'image',
		mediaUrl:
            'https://loremflickr.com/1024/1280/nature',
		title: 'Legendary A'
	}
]

const postItems: PostCard[] = [
	{
		id: '0',
		userName: 'Rabee',
		createdAt: 'February 24',
		likeCount: 2456,
		hasLiked: true,
		caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
		carouselMedia: mediasArraySampleA,
		commentCount: 2456,
		profilePictureUrl: 'https://loremflickr.com/32/32/bird',
		isFollowed: false
	},
	{
		id: '1',
		userName: 'Rabee',
		createdAt: 'February 24',
		likeCount: 2456,
		hasLiked: true,
		caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
		carouselMedia: mediasArraySampleA,
		commentCount: 2456,
		profilePictureUrl: 'https://loremflickr.com/32/32/bird',
		isFollowed: false
	},
	{
		id: '2',
		userName: 'Rabee',
		createdAt: 'February 24',
		likeCount: 2456,
		hasLiked: true,
		caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
		carouselMedia: mediasArraySampleA,
		commentCount: 2456,
		profilePictureUrl: 'https://loremflickr.com/32/32/bird',
		isFollowed: false
	},
	{
		id: '3',
		userName: 'Rabee',
		createdAt: 'February 24',
		likeCount: 2456,
		hasLiked: true,
		caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
		carouselMedia: mediasArraySampleA,
		commentCount: 2456,
		profilePictureUrl: 'https://loremflickr.com/32/32/bird',
		isFollowed: false
	}
]
export default defineComponent({
	name: 'Reels',
	components: {
		NavBarMain,
		SVGLoader,
		CommentModal
	},
	setup() {
		// Modals data
		const commentModal = ref({
			name: '' as commentModalName,
			isToggled: false,
			postId: 0
		})

		// Others
		const windowWidth = ref(window.innerWidth) // Current window width


		const triggerCommentModal = (id: number | undefined) => {
			// If screen size > 768 open comment Modal else open Profile Modal
			const modalName = screenSizeType.value === 'xs' ? ProfileTriggeredModal.Profile : ProfileTriggeredModal.Comment
			commentModal.value = { name: modalName, isToggled: !commentModal.value.isToggled, postId: id ? id : 0 }
		}


		// Listeners
		const onWidthChange = () => windowWidth.value = window.innerWidth


		// Computed
		const screenSizeType = computed(() => {
			if (windowWidth.value < 550) return 'xs'
			return false
		})

		onMounted(() => {
			// console.log('Mounted Explore')
		})
		return {
			triggerCommentModal,
			postItems,
			ProfileTriggeredModal,
			commentModal
		}
	}
})
</script>

<style>
</style>