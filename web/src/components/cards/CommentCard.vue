<template>
	<div class="flex space-x-3 justify-between pt-3 sm:pt-0">
		<div class="flex space-x-3 p-3">
			<img 
				:src="comment.profilePictureUrl" 
				class="cursor-pointer h-8 w-8 rounded-full shadow-lg" />  
                
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
                    text-xs font-semibold text-gray-500 
                        flex-wrap ">
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
        
		<div class="text-gray-400 text-xs">
			<i class="fa-regular fa-heart"></i>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PostComment } from '@/common'
import { SVGLoader } from '@/components'

// Props
const prop = defineProps({
	comment: {
		type: Object as () => PostComment,
		required: true
	}
})

</script>