<template>
	<div class="flex space-x-3 justify-between pt-3 sm:pt-0">
		<div class="flex space-x-3 p-3">
			<img 
				:src="comment?.profilePictureUrl" 
				class="w-8 h-8 rounded-full" />  
                
			<div class="flex flex-col">
				<div 
					@click="goToUserProfile(comment.userName)"
					class="flex">
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
        
		<div 
			class="text-gray-400 text-xs sm:text-xs cursor-pointer"
			@click="triggerCommentLike">
			<SVGLoader 
				v-if="isCommentLiked"
				:icon="'like'" />
			
			<SVGLoader 
				v-else
				:icon="'unlike'" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    ref
} from 'vue'

import {
    SVGLoader
} from '@/components'

import {
	goToUserProfile,
    type PostCommentCard
} from '@/common'


const prop = defineProps({
    comment: {
        type: Object as () => PostCommentCard,
        required: true
    }
})

const emit = defineEmits([
    'onOpenCommentModal',
    'onCommentLike'
])


const isCommentLiked = ref < boolean > (false)

const triggerCommentLike = () => {
    isCommentLiked.value = !isCommentLiked.value // TODO: Remove only for demo
    emit('onCommentLike', prop.comment.id)
}

</script>