<template>
	<div class="flex space-x-3 justify-between pt-3 sm:pt-0">
		<div class="flex space-x-3 p-3">
			<img 
				:src="comment?.profilePictureUrl" 
				class="w-8 h-8 rounded-full" />  
                
			<div class="flex flex-col">
				<div class="flex">
					<p 
						class="text-ellipsis overflow-hidden font-sans 
                        text-sm text-white">
						<span 
							class="cursor-pointer font-sans 
                        	text-sm font-bold text-white">
							{{ comment.userName }}
						</span>
						{{ comment.content }}
					</p>
				</div>
				<div
					class="group pt-3 flex list-disc space-x-4 font-sans 
                    text-xs font-semibold text-gray-500 flex-wrap ">
					<li class="list-none cursor-pointer">
						{{ comment.createdAt }}
					</li>
					<li class="list-none cursor-pointer text-gray-400">
						Reply
					</li>
					<li class="list-none cursor-pointer invisible group-hover:visible">
						<SVGLoader :icon="'comment-options'" />
					</li>
				</div>
			</div>
		</div>
        
		<div class="text-gray-400 text-xs sm:text-lg cursor-pointer">
			<i class="fa-regular fa-heart"></i>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PostCommentCard } from '@/common'
import { SVGLoader } from '@/components'

export default defineComponent({
    name: 'CommentCard',
    setup(props, context) {
        return {
        }
    },
    components: {
        SVGLoader,
    },
    props: {
		comment: {
		type: Object as () => PostCommentCard,
		required: true
	}
    },
    emits: [
        'onOpenCommentModal',
        'onPostLike'
    ]
})
</script>