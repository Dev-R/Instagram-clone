<template>
	<div 
		class="bg-black rounded-lg shadow w-full md:pt-0 md:z-50 pt-5 z-50 
        md:5/6 md:bg-slate-1100 absolute 
        top-1/3 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
		:class="{
			'hidden': !isToggled,
			'max-w-xs': modalSize === ModalSize.SuperSmall,
			'max-w-sm': modalSize === ModalSize.ExtraSmall,
			'max-w-md': modalSize === ModalSize.Small,
			'max-w-lg': modalSize === ModalSize.Medium,
			'max-w-4xl': modalSize === ModalSize.Large,
			'max-w-7xl': modalSize === ModalSize.ExtraLarge
		}">
		<!-- Modal header -->
		<div class="flex p-2 border-b border-gray-600 rounded-t justify-between">
			<div></div>

			<h3 class="font-sans text-md font-bold text-white">
				{{ title }}
			</h3>

			<button
				class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                    rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 
                    dark:hover:text-white"
				@click="onModalClosed()">
				<SVGLoader :icon="'cross'" />
			</button>
		</div>
		<!-- Modal body -->
		<div class="space-y-6">
			<div 
				class="flex flex-col space-y-5 lg:max-h-80 
                max-h-full overflow-y-scroll scrollbar">
				<!-- Suggestion Card Modal -->
				<div 
					v-for="item of <SuggestionCard[]> items"
					v-if="modalType === ModalType.Follow"
					class="rounded-lg flex justify-between space-x-2">
					<SmallCard 
						:profile-image="item.profilePictureUrl">
						<template #user-name>
							{{ item.userName }}
						</template>

						<template #action-name>
							Follow
						</template>

						<template #button-name>
							Remove
						</template>
					</SmallCard>
				</div>

				<!-- Comment Modal -->
				<div 
					v-else-if="modalType === ModalType.Comment"
					class="p-5">
					<div
						v-if="shouldDisplayNoComments"
						class="flex flex-col place-self-center space-y-2">
						<span
							class="font-sans text-2xl text-white font-bold mx-auto">
							No comments yet.
						</span>
					</div>

					<CommentCard 
						v-for="item of <PostCommentCard[]> items"
						v-else
						:comment="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'

import type {
	SuggestionCard,
	PostCommentCard
} from '@/common'

import {
	ModalType,
	ModalSize
} from '@/common'

import {
	SmallCard,
	SVGLoader,
	CommentCard
} from '@/components'


export default defineComponent({
	name: 'SmallModal',
	setup(prop, context) {
		const shouldDisplayNoComments = computed(() => {
			return !prop.items || prop.items.length === 0
		})

		/**
         * Emit signal when the modal is closed
         * @event modal-closed
         */
		const onModalClosed = () => {
			context.emit('onModalClosed')
		}
		onMounted(() => {
			console.log('Items loaded', prop.items)
		})
		return {
			shouldDisplayNoComments,
			ModalSize,
			ModalType,
			onModalClosed
		}
	},
	components: {
		SmallCard,
		SVGLoader,
		CommentCard
	},
	props: {
		title: {
			type: String,
			required: true
		},
		items: {
			type: Object as () => SuggestionCard[] | PostCommentCard[] | undefined,
			required: false
		},
		isToggled: {
			type: Boolean,
			required: true
		},
		modalSize: {
			type: String,
			default: ModalSize.Large
		},
		modalType: {
			type: String as () => ModalType,
			default: ModalType.Follow
		}
	},
	emits: [
		'onModalClosed'
	],
})
</script>