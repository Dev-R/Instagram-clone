<template>
	<div class="bg-slate-1000">
		<section 
			class="container max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900">
			<div class="flex">
				<div 
					class="bg-black sm:w-20 md:block hidden space-y-12
					h-screen sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="lg:grid bg-black basis-full md:border-l border-slate-800">
					<div class="flex md:flex-row flex-col h-screen">
						<TheMessages 
							:active-conversation="activeConversation"
							:conversations="conversations"
							:current-user="currentUser"
							@on-select-conversation="selectConversation" />

						<TheChat 
							v-if="activeConversation"
							:active-conversation="activeConversation"
							v-model="chatMessageInput"
							:current-user="currentUser"
							:is-chat-loading="isChatLoading"
							:is-chat-empty="true"
							@on-chat-back="leaveChat"
							@on-file-upload="triggerFileUpload"
							@on-send-message="sendMessage"
							@on-like-icon="sendHeartEmoji" />

						<ChatIntro 
							v-else
							@on-send-message-modal="openSendMessageModal" />
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

<script setup lang="ts">
import {
    ref,
    watch
} from 'vue'

import {
    useToast
} from 'vue-toastification'

import {
    ChatIntro,
	TheChat,
	TheMessages,
    NavBarMain
} from '@/components'

import type {
    Viewer,
    Sender,
    ChatDialog,
    HTMLInputElementRef,
    PhotoModalImage,
    Conversation
} from '@/common/models'

import {
    getCurrentTimestamp
} from '@/common/helpers'

// References to DOM element
const fileUpload = ref<HTMLInputElementRef | null>()

// Form data
const attachmentImage = ref<PhotoModalImage>(null)
const chatMessageInput = ref<string | null>(null)

// Flags for tracking state
const isFileUploaded = ref<boolean>(false)
const isFileValid = ref<boolean>(false)
const isChatLoading = ref<boolean>(false)

// Others
const activeConversation = ref<Conversation | null>(null)

// Demo data
const userA: Viewer = {
    id: '123456789',
    firstName: 'John',
    lastName: 'Doe',
    userName: 'johndoe',
    profilePictureUrl: 'https://loremflickr.com/1024/1280/life',
    email: 'johndoe@example.com',
    followerCount: 1000,
    followingCount: 500,
    gender: 'Female'
}
const userB: Sender = {
    id: '987654321',
    firstName: 'Jane',
    lastName: 'Smith',
    userName: 'janesmith',
    profilePictureUrl: 'https://loremflickr.com/1024/1280/car',
    followerCount: 500,
    followingCount: 1000,
    gender: 'Female'
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
 * Select conversation from inbox list
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

/**
 * Show toast message on unsupported feature click
 */
const onUnsupportedFeatureClick = () => {
    toast.info('The following feature, is not supported yet.')
}

/**
 * Reset chat message object
 */
const resetChatMessage = () => {
    chatMessage.value = {
        text: undefined
    }
}

/**
 * TODO
 */
const openSendMessageModal = () => {
    onUnsupportedFeatureClick()
}

/**
 * TODO
 */
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
</script>