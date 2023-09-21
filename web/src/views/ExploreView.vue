<template>
	<div class="bg-black h-screen">
		<section 
			v-show="!activeModal.isToggled"
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="md:grid grid-cols-12 flex justify-center">
				<!-- Left bar: Navigation -->
				<div 
					class="xl:col-span-2 col-span-1 bg-black 
					md:block hidden space-y-12 h-screen 
					sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="xl:col-span-8 lg:grid md:col-span-10 bg-black
					scrollbar scrollbar-thumb-gray-900
					md:col-start-2 md:p-0 col-span-12 p-2">
					<!-- Profile Info -->
					<div 
						class="flex flex-col md:w-[935px] 
						flex-nowrap space-y-4 pt-2 md:pt-5 justify-self-end 
						md:ml-5 lg:ml-0 ">
						<!-- Image Rendering Section -->
						<div
							class="flex flex-wrap">
							<PostCoverCard 
								@on-post-cover="triggerCommentModal"
								:posts="posts" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Modals -->

		<!-- PostCard Modal -->
		<div 
			v-show="activeModal.name === ModalType.Profile"
			class="md:w-[470px] justify-self-end p-2">
			<PostCardModal
				:post-item="posts[activeModal.postId]" />
		</div>

		<!-- Comment Modal -->
		<CommentModal
			:post-comment="{
				isToggled: activeModal.isToggled && activeModal.name === ModalType.Comment,
				post : posts[activeModal.postId],
			}" 
			@on-comment-liked="handleCommentLike"
			@on-add-comment="handleCommentAdd"
			@on-post-liked="handlePostLike"
			@on-modal-closed="triggerCommentModal" />
	</div>
</template>
 
<script lang="ts">

import {
	onMounted,
	defineComponent,
	ref,
	computed,
onUnmounted
} from 'vue'


import {
	NavBarMain,
	CommentModal,
	SVGLoader,
	PostCard as PostCardModal,
  PostCoverCard
} from '@/components'


import {
	type PostCard as PostCardType,
	type ModalName,
	type PostMedia,
	ModalType
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

const mediasArraySampleB: PostMedia[] = [
	{
		index: 0,
		type: 'image',
		mediaUrl:
            'https://loremflickr.com/1024/1280/life',
		title: 'Legendary A'
	},
	{
		index: 1,
		type: 'image',
		mediaUrl:
            'https://loremflickr.com/1024/1280/car',
		title: 'Legendary A'
	}
]

export default defineComponent({
  name: 'Reels',
  setup() {
    // Sample Data
    const posts = ref<PostCardType[]>([
      {
        id: '0',
        userName: 'Rabee',
        createdAt: 'February 24',
        likeCount: 2456,
        hasLiked: true,
        caption: 'Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30',
        carouselMedia: mediasArraySampleA,
        commentCount: 2456,
        profilePictureUrl: 'https://loremflickr.com/32/32/life',
        isFollowed: false,
        comments: []
      },
      {
        id: '1',
        userName: 'Rabee',
        createdAt: 'February 24',
        likeCount: 2456,
        hasLiked: true,
        caption: 'Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30',
        carouselMedia: mediasArraySampleB,
        commentCount: 2456,
        profilePictureUrl: 'https://loremflickr.com/32/32/dog',
        isFollowed: false,
        comments: []
      }
    ])

    // Modals data
    const activeModal = ref({
      name: '' as ModalName,
      isToggled: false,
      postId: 0
    })

    /**
     * Triggers the comment modal.
     * If screen size > 768, opens comment modal, else opens profile modal.
     * @param postId The ID of the post.
     */
    const triggerCommentModal = (postId: number | undefined) => {
      const modalName = screenSizeType.value === 'xs' ? ModalType.Profile : ModalType.Comment
      activeModal.value = { name: modalName, isToggled: !activeModal.value.isToggled, postId: postId ? postId : 0 }

      console.log("Triggering the following modal:", modalName)
    }

    /**
     * Handles post like.
     * TODO: Remove.
     */
    const handlePostLike = () => {
      posts.value[activePostId.value].hasLiked = !posts.value[activePostId.value].hasLiked
      console.log("Post has been liked ...")
    }

    /**
     * Handles comment addition.
     * TODO: Remove.
     * @param commentContent The content of the comment.
     */
    const handleCommentAdd = (commentContent: string) => {
      posts.value[activePostId.value].comments?.push({
        id: 0,
        userName: 'Sara',
        profilePictureUrl: 'https://loremflickr.com/1024/1280/woman',
        content: commentContent,
        createdAt: '2012-02-23'
      })
      console.log("New comment has been added ...", posts.value[activePostId.value].comments)
    }

    /**
     * Handles comment like.
     * @param commentId The ID of the comment.
     */
    const handleCommentLike = (commentId: number) => {
      console.log("The following comment", commentId, "has been liked")
    }

    /**
     * Adds the resize event listener.
     */
    const addResizeListener = () => {
      window.addEventListener('resize', onWidthChange)
    }

    /**
     * Removes the resize event listener.
     */
    const removeResizeListener = () => {
      window.removeEventListener('resize', onWidthChange)
    }

    /**
     * Updates the window width on resize.
     */
    const onWidthChange = () => {
      windowWidth.value = window.innerWidth
    }

    // Computed
    const windowWidth = ref(window.innerWidth) // Current window width
    const screenSizeType = computed(() => (windowWidth.value < 550 ? 'xs' : false))
    const isModalToggled = computed(() => activeModal.value.isToggled)
    const activePostId = computed(() => activeModal.value.postId)

    // Lifecycle Hooks
    onMounted(() => {
      addResizeListener()
    })

    onUnmounted(() => {
      removeResizeListener()
    })

    return {
      triggerCommentModal,
      handleCommentAdd,
      handleCommentLike,
      handlePostLike,
      posts,
      ModalType,
      activeModal,
      isModalToggled
    }
  },
  components: {
    NavBarMain,
    SVGLoader,
    CommentModal,
    PostCardModal,
    PostCoverCard
  },
})

</script>

<style scoped>
</style>