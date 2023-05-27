<template>
	<div class="bg-[#121212]">
		<section 
			class="container max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900">
			<div class="flex">
				<!-- Left bar: Navigation -->
				<div 
					class="bg-black sm:w-20 md:block hidden space-y-12
					h-screen sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<!-- Center: Messages & Chat -->
				<div 
					class="lg:grid bg-black basis-full md:border-l border-slate-800">
					<div class="flex md:flex-row flex-col h-screen">
						<TheMessages 
							@on-select-conversation="selectConversation"
							:active-conversation="activeConversation"
							:conversations="conversations"
							:current-user="currentUser" />

						<TheChat 
							v-if="activeConversation"
							@on-chat-back="leaveChat"
							@on-file-upload="triggerFileUpload"
							@on-send-message="sendMessage"
							:active-conversation="activeConversation"
							:current-user="currentUser"
							:is-chat-loading="isChatLoading"
                            :is-chat-empty="true"
							v-model="chatMessageInput" />

						<ChatIntro 
							v-else />
					</div>
				</div>
			</div>
		</section>
		<!-- File Uploading -->
		<input
			ref="fileUpload"
			accept="image/*"
			type="file"
			hidden
			@change="onFileUpload" /> 
	</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    computed,
    onMounted
} from 'vue'

import {
    useToast
} from 'vue-toastification'

import {
    ChatIntro,
	TheChat,
	TheMessages,
    PostCard,
    SVGLoader,
    NavBarMain
} from '@/components'

import type {
    Viewer,
    Sender,
    Inbox,
    ChatDialog,
    HTMLInputElementRef,
    PhotoModalImage,
    Conversation
} from '@/common/models'

import {
    getCurrentTimestamp
} from '@/common/helpers'

export default defineComponent({
    name: 'DirectView',
    setup() {

        // References to DOM element
        const fileUpload = ref<HTMLInputElementRef | null>()
        const lastMessageElement = ref()

        // Form data
        const attachmentImage = ref<PhotoModalImage>(null)
        const chatMessageInput = ref<string | null>(null)

        // Flags for tracking state
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)
        const isMobileScreenSize = ref<boolean>(false)
        const isChatLoading = ref<boolean>(false)

        // Others
        const activeConversation = ref<Conversation | null>(null)
        const screenWidth = ref<number>(window.innerWidth) // Current window width

        // Demo data
        const userA: Viewer = {
            id: '123456789',
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/life',
            email: 'johndoe@example.com',
            followerCount: 1000,
            followingCount: 500
        }

        const userB: Sender = {
            id: '987654321',
            firstName: 'Jane',
            lastName: 'Smith',
            userName: 'janesmith',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/car',
            followerCount: 500,
            followingCount: 1000
        }

        const currentUser = userA

        // A chat instances between two users
        const chatA = ref<ChatDialog[]>([{
                utemId: '31054936540680616356189602913976320',
                user: userA,
                timestamp: 1683491483190270,
                itemType: 'text',
                isSentByViewer: true,
                uqSeqId: 5136,
                text: 'Hello, how are you?'
            },
            {
                utemId: '42054936540680616356189602913976320',
                user: userB,
                timestamp: 1683491483195270,
                itemType: 'text',
                isSentByViewer: false,
                uqSeqId: 5137,
                text: 'I\'m good, thanks! How about you?'
            }
        ])

        // List of all conversations in the inbox
        const conversations = ref<Conversation[]>([{
            uuid: '1',
            user: userA,
            lastMessage: 'Hello World',
            timeSinceLastMessage: '1w',
            dialogs: chatA.value,
            isActive: false
        }])

        // Current Inbox
        const inbox = ref<Inbox>({
            threads: conversations.value,
            unseenCount: 1,
            unseenCountTimeStamp: 1683491483190270
        })

        // Active Chat Message
        const chatMessage = ref<ChatDialog>({
            user: undefined,
            uqSeqId: undefined,
            itemType: undefined,
            isSentByViewer: undefined,
            text: undefined,
            timestamp: undefined
        })


        // Services
        const toast = useToast()

        // Methods
        const sendMessage = (payload: Event) => {
            chatMessageInput.value = '' // Clear message area
            const message = payload?.target as HTMLInputElement
            // Prevent spacing values
            if (message.value.trim() != '') {
                chatMessage.value = {
                    user: userA,
                    itemType: '',
                    isSentByViewer: true,
                    text: message.value,
                    timestamp: getCurrentTimestamp()
                }
                // Reset message
                message.value = ''
            }
        }

        /**
         * Trigger DOM file upload event
         */
        const triggerFileUpload = () => {
            fileUpload.value?.click()
        }

        /**
         * Push message to inbox
         * @param message Message to be added
         */
        const addToChat = (message: ChatDialog) => {
            activeConversation.value?.dialogs.push(message)
        }

        /**
         * TODO: Add validation
         * Handle file uploaded event
         * @param {Object} event - The event object
         */
        const onFileUpload = async (event: Event) => {
            const targetEvent = event.target as HTMLInputElement
            const file = targetEvent?.files?.item(0) as Blob

            // Read the file as data URL to show preview
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                attachmentImage.value = event.target?.result as string
                isFileValid.value = true
                isFileUploaded.value = true

                chatMessage.value = {
                    user: userA,
                    itemType: 'image',
                    isSentByViewer: true,
                    img: attachmentImage.value as string,
                    timestamp: getCurrentTimestamp()
                }
            }
        }

        /**
         * 
         * @param convo - Conversation to be selected
         */
        const selectConversation = (convo: Conversation) => {
            activeConversation.value = convo
        }

        /**
         * Go back to conversation list
         */
        const leaveChat = () => {
            activeConversation.value = null
        }

        const onUnsupportedFeatureClick = () => {
            toast.info('The following feature, is not supported yet.')
        }

        const resetChatMessage = () => {
            chatMessage.value = {
                text: undefined
            }
        }

        const sendHeartEmoji = () => {
            chatMessage.value = {
                text: undefined
            }
        }

        /**
         * Scroll to latest message in the conversation
         */
        const scrollToTheLatestMessage = () => {
            const target = document.querySelector('#last-element')
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        }

        /**
         * Dynamically check whether inbox should updated
         */
        const shouldUpdateInbox = () => {
            const message = chatMessage.value
            return (message.text != undefined || message.img != undefined)
        }


        // Watchers

        /**
         *  Trigger mobile screen flag on screen size change
         */
        watch(() => screenWidth.value, (size) => {
            const smallScreenWidth = 750
            if (size <= smallScreenWidth) {
                isMobileScreenSize.value = true
            } else {
                isMobileScreenSize.value = false
            }
        })

        /**
         * Update inbox with latest message
         */
        watch(chatMessage, () => {
            if (shouldUpdateInbox()) {
                addToChat(chatMessage.value)
                resetChatMessage()
                scrollToTheLatestMessage()
            }
        })

        /**
         * Scroll to latest message on conversation change
         */
        watch(activeConversation, () => {
            const WAITING_TIME = 5
            setTimeout(() => {
                scrollToTheLatestMessage()
            }, WAITING_TIME)
        })

        onMounted(() => {
            // Keep track of screen width
            window.onresize = () => {
                screenWidth.value = window.innerWidth
            }
        })

        return {
            // Data
            isChatLoading,
            isMobileScreenSize,
            fileUpload,
            inbox,
            chatMessageInput,
            chatMessage,
            conversations,
            activeConversation,
            lastMessageElement,
            currentUser,

            // Methods
            leaveChat,
            sendMessage,
            onFileUpload,
            onUnsupportedFeatureClick,
            selectConversation,
            sendHeartEmoji,
            scrollToTheLatestMessage,
            triggerFileUpload
        }
    },
    components: {
        PostCard,
        SVGLoader,
        NavBarMain,
        ChatIntro,
        TheChat,
        TheMessages
    },
    props: {},
})
</script>




<style>

</style>