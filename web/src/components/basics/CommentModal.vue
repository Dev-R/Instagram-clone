<template>
    <div
        class="md:ml-12 fixed top-0 left-0 right-0 z-50 w-full sm:p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        :class="{ 'hidden': !postComment.isToggled }">
        

        <!-- Modal Header -->
        <div class="md:block hidden">
            <div class="md:mr-12 flex items-center justify-between cursor-pointer">
                <span class="ml-auto inline-flex text-white">
                    <SVGLoader :icon="'cross'" @click="onModalClosed()" />
                </span>
            </div>
        </div>

        <div class="md:hidden block">
            <div class="flex justify-between cursor-pointer bg-black w-full p-3 border-b border-gray-700">
                <span class="rotate-[270deg]" @click="onModalClosed()" >
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

            <div class="relative sm:h-full sm:w-full md:h-auto">

                <!-- Modal Content -->
                <div 
                    class="relative bg-black md:grid
                    md:grid-cols-9 flex flex-col sm:space-y-4">
                
                    <!-- Carousel Container -->
                    <div 
                        class="lg:col-span-5 col-span-5 md:max-w-[863px]
                        md:max-w-full md:p-0 p-2 
                        md:block hidden">
                        <!-- space-y-12 -->
                        <!-- Space -->
                        <div>
                        </div>
                        <!-- Carousel -->
                        <div class="h-full pt-7">
                            <MediaCarousel 
                                :style="'rounded-none'"
                                :medias="postComment.post.carouselMedia"/>
                        </div>
                    </div>

                    <!-- Comments Container -->
                    <div 
                        class="flex flex-col sm:space-y-4  rounded-lg
                        sm:pt-2 lg:col-span-3 col-span-7 z-100
                        sm:border-l border-slate-800 sm:p-2">

                        <!-- 1: username | daysSinceUpload | options for screens > 640px -->
                        <div class="flex flex-col sm:space-x-1 justify-between sm:p-2">

                            <div class="sm:block hidden">
                                <div class="flex justify-between border-b border-slate-800 p-3">
                                    <div class="flex space-x-2">

                                        <img 
                                            :src="postComment.post.profilePictureUrl"
                                            class="cursor-pointer h-8 w-8 rounded-full shadow-lg">

                                        <div class="flex pt-1">
                                            <!-- Username -->
                                            <div class="cursor-pointer font-sans text-sm font-semibold text-white">
                                                {{ postComment.post.userName }}
                                                <i class="fa-solid fa-circle-check"></i>
                                            </div>

                                            <!-- Space -->
                                            <div class="pl-2 text-gray-500 w-5 font-sans text-md font-semibold text-white">
                                                •
                                            </div>

                                            <!-- Follow -->
                                            <div class="font-sans font-semibold text-sm text-sky-500 justify-self-end">
                                                Follow
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
                                <div class="flex justify-between border-b border-t border-slate-700 bg-slate-1100 p-2.5 space-x-4">

                                        <div class="flex">
                                            <img 
                                                :src="postComment.post.profilePictureUrl"
                                                class="cursor-pointer h-10 w-10 rounded-full shadow-lg">
                                        </div>


                                        <div class="flex w-full relative">
                                            <input type="text" id="first_name" class="bg-black border border-slate-800 text-gray-900 text-sm rounded-full w-full p-3" placeholder="Add a comment...">
                                            <div class="absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none font-semibold text-sky-600">
                                                Post
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                        <!-- 2: comments rendering -->
                        <div 
                            class="lg:max-h-[600px] sm:max-h-[211px] grid h-screen
                            sm:p-1 space-y-7 overflow-y-auto scrollbar 
                            scrollbar-none">
                                <div    
                                    v-if="postComment.post.comments" 
                                    v-for="(comment, index) of postComment.post.comments"
                                    :key="index"
                                    class="grid grid-cols-12 space-x-3">

                                    <!-- Commenter picture -->
                                    <div class="col-span-1">
                                    <img 
                                        :src="'postComment.picture?'" 
                                        class="cursor-pointer h-8 w-8 rounded-full shadow-lg">                                  
                                    </div>

                                    <!-- Comment username and content -->
                                    <div class="col-span-9 flex flex-col">
                                        <p 
                                        class="text-ellipsis overflow-hidden font-sans 
                                        text-sm text-white text-justify">
                                            
                                        <span class="cursor-pointer font-sans 
                                        text-sm font-semibold text-white">
                                                {{ comment.userName }}
                                                <i class="fa-solid fa-circle-check">
                                                </i>
                                            </span>
                                                {{ comment.content }}
                                        </p>
                                    </div>

                                    <!-- Like icon -->
                                    <div class="col-span-1 text-gray-400 text-xs">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>

                                    <!-- Space -->
                                    <div class="col-span-1">
                                    </div>

                                    <!-- Comment container footer -->
                                    <div
                                        class="group pt-3 col-span-11 
                                        flex list-disc space-x-4 font-sans 
                                        text-xs font-semibold text-gray-500 
                                        self-start flex-wrap col-start-2">

                                        <li class="list-none cursor-pointer">
                                            {{ comment.createdAt }}
                                        </li>
                                        <li class="list-none cursor-pointer text-gray-400">Reply</li>
                                        <li class="list-none cursor-pointer invisible group-hover:visible">
                                            <SVGLoader :icon="'comment-options'" />
                                        </li>

                                    </div>
                                
                                </div>

                                <div
                                    v-else
                                    class="flex flex-col place-self-center ">
                                    <span
                                        class="font-sans text-2xl text-white font-bold mx-auto">
                                        No comments yet.
                                    </span>
                                    <span
                                        class="font-sans text-md text-white font-light">
                                        Start the conversation.
                                    </span>
                                </div>
                    
                        </div>
                        
                        <!-- 3: Comment Actions --> 
                        <div class="sm:block hidden">
                            <div class="flex justify-between p-2 border-t border-slate-800">

                                <div class="flex space-x-4">

                                    <span class="cursor-pointer hover:scale-90">
                                        <SVGLoader 
                                            v-if="postComment.post.hasLiked" :icon="'like'"/>
                                        
                                        <SVGLoader 
                                            v-else :icon="'unlike'"/>
                                    </span>

                                    <span class="cursor-pointer hover:scale-90">
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
                                    {{ findNumberOfLikes }}
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
                            <div class="grid grid-cols-12 border-t border-slate-800 p-2">

                                <span class="col-span-1 hover:cursor-pointer">
                                    <SVGLoader :icon="'emoji'" />
                                </span>

                                <span class="col-span-10">
                                    <textarea 
                                        rows="1"
                                        class="focus:outline-none resize-none 
                                        block w-full text-sm bg-black text-gray-600"
                                        placeholder="Add a comment..."></textarea>
                                </span>

                                <span
                                    class="col-span-1 font-sans text-md text-white justify-self-end mb-2">
                                    Post
                                </span>

                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script lang="ts">
import type { PostCommentModal } from '@/common/models/post.model'
import { defineComponent, onMounted, computed } from 'vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'
import MediaCarousel from './MediaCarousel.vue'


export default defineComponent({
  name: "CommentModal",
  setup(props, context) {

      // Computed
      const findNumberOfLikes = computed(() => {
          return props.postComment.post.likeCount >= 1 ? `${props.postComment.post.likeCount} Likes` : 'Be the first to like this' 
      })

      /**
       * Emit signal to add new comment
       * @param {string} commentText - The text of the new comment
       */
      const onAddComment = (commentText: string) => {
          context.emit("onAddComment", commentText);
      }

      /**
       * Emit signal to delete existing comment
       * @param {number} commentId - The ID of the comment to be deleted
       */
      const onDeleteComment = (commentId: number) => {
          context.emit("onDeleteComment", commentId);
      }

      /**
       * Emit signal when the modal is opened
       * @event modal-opened
       */
      const onModalOpened = () => {
          context.emit('onModalOpened')
      }

      /**
       * Emit signal when the modal is closed
       * @event modal-closed
       */
      const onModalClosed = () => {
          context.emit('onModalClosed')
      }

      /**
       * Emit signal when a comment is unliked
       * @event comment-unliked
       * @param {string} commentId - The ID of the comment being unliked
       */
      const onCommentUnliked = (commentId: string) => {
          context.emit('onCommentUnliked', commentId)
      }

      /**
       * Emit signal when a comment is liked
       * @event comment-liked
       * @param {string} commentId - The ID of the comment being liked
       */
      const onCommentLiked = (commentId: string) => {
          context.emit('onCommentLiked', commentId)
      }

      onMounted(() => {
      });
      return {
          onModalClosed,
          findNumberOfLikes
      };
  },
  components: { 
      MediaCarousel,
      SVGLoader 
  },
  props: {
      postComment: {
          type: Object as () => PostCommentModal,
          required: true
      }
  },
  emits: [
      'onAddComment',
      'onDeleteComment',
      'onModalOpened',
      'onModalClosed',
      'onCommentUnliked',
      'onCommentLiked'
  ]
})
</script>

