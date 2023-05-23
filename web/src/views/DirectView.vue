<template>
    <div class="bg-[#121212]">
        <section 
            class="container max-w-full mx-auto text-center scrollbar scrollbar-thumb-gray-900"
            :class="{ 'brightness-50 pointer-events-none': commentModal.isToggled || photoModal.isToggled }">
            <div class="flex">
                <!-- Left bar: Navigation -->
                <div 
                    class="bg-black sm:w-20 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
                    
                    <!-- A -->
                    <NavBarMain />
                    
                </div>

                <!-- Center: Messages -->
                <div 
                    class="lg:grid bg-black basis-full border-l border-slate-800">
                    <div class="flex md:flex-row flex-col h-full">
                        
                        <!-- Left: Conversations -->
                        <div 
                            :class="{ 'hidden': currentlyActiveConversation}"
                            class="bg-black basis-1/5 md:block">
                            
                            <!-- Conversation Rendering Header  -->
                            <div class="flex flex-col">
                                <div 
                                    class="flex bg-black p-5 lg:h-16 
                                    w-full space-x-2 justify-between">
                                        <div class="flex">
                                            <div class="cursor-pointer font-sans text-xl font-bold text-white pt-1">
                                                {{ currentUser.userName }}
                                            </div>

                                            <div class="flex space-x-4 cursor-pointer">
                                            </div>
                                        </div>

                                        <div>
                                        </div>
                                        
                                        <div 
                                            @click="onUnsupportedFeatureClick"
                                            class="flex cursor-pointer">
                                            <SVGLoader :icon="'new-message'" />
                                        </div>
                                </div>
                                <div 
                                    class="flex bg-black pl-5 pr-5 pb-2 w-full space-x-2 justify-between">
                                        <div class="flex">
                                            <div class="cursor-pointer font-sans text-md font-bold text-white pt-1">
                                                Messages
                                            </div>

                                            <div class="flex space-x-4 cursor-pointer">
                                            </div>
                                        </div>

                                        <div>
                                        </div>
                                        
                                        <div class="cursor-pointer font-sans text-xs font-semibold text-[#949494] pt-1">
                                            Requests
                                        </div>
                                </div>
                            </div>


                            <!-- Conversations rendering -->

                            <div class="overflow-auto lg:max-h-[850px]">
                                <div 
                                    v-for="(convo, index) of conversations"
                                    :key="index"
                                    @click="onSelectConversation(convo)"
                                    class="flex flex-col md:block pl-2 pr-2">
                                    <div 
                                        :class="{ 'bg-slate-1100': convo.uuid === currentlyActiveConversation?.uuid }"
                                        class="flex p-3 space-x-3 hover:bg-slate-1100 w-full cursor-pointer">
                                        <!-- Profile Image -->
                                        <img 
                                            :src="convo.user.profilePictureUrl"
                                            class="cursor-pointer h-14 w-14 rounded-full shadow-lg">


                                        <!-- Username / Chat / Date -->
                                        <div class="flex flex-col self-center space-y-2 pb-3">
                                            <span class="font-sans text-sm font-semibold text-white self-start">
                                                {{ convo.user.userName }}
                                            </span>

                                            <div class="flex flex-row space-x-1">
                                                    <span class="font-sans text-xs font-semibold text-gray-400">
                                                        {{ convo.lastMessage }}
                                                    </span>

                                                    <div class="font-sans text-xs font-semibold text-gray-500">
                                                        •
                                                    </div>

                                                    <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                                                        {{ convo.timeSinceLastMessage }}
                                                    </div>
                                            </div>
                                        </div>
                                        
                                    </div>


                                </div>
                            </div>


                        </div>
                        <!-- Right: Current Chat -->
                        <div 
                            v-if="currentlyActiveConversation"
                            class="relative bg-black lg:max-w-[1320px] lg:basis-10/12 w-full h-screen border-l border-gray-800">
                            
                            <div 
                                class="flex lg:h-16  w-full space-x-2 md:justify-between p-3
                                items-center border-slate-700 border-b">
                                    <div 
                                        @click="onPageBack"
                                        class='rotate-[270deg] md:hidden hover:cursor-pointer'>
                                        <SVGLoader 
                                            :icon="'back-arrow'" 
                                            :class="'group-hover:scale-110'" />
                                    </div>

                                    <div class="flex space-x-2 items-center">
                                        <img 
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-10 w-10 rounded-full shadow-lg">

                                        <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                                            {{ currentlyActiveConversation.user.firstName }}
                                        </div>
                                    </div>

                                    <div 
                                        @click="onUnsupportedFeatureClick"
                                        class="flex space-x-4 cursor-pointer md:visible invisible">
                                        <SVGLoader :icon="'audio-call'" />
                                        <SVGLoader :icon="'video-call'" />
                                        <SVGLoader :icon="'chat-info'" />
                                    </div>
                             </div>
                                
                            <div class="flex flex-col h-5/6 lg:max-h-[850px] overflow-auto">
                                <div class="flex pt-5 space-x-2 justify-center">
                                    <!-- <span class="font-sans text-xs font-semibold text-gray-400">
                                        November 2, 2020 12:44 am
                                    </span> -->
                                    <i  
                                        v-if="isChatLoading"
                                        class="fa-solid fa-spinner fa-spin fa-2xl text-slate-500">
                                    </i>
                                </div>

                                <!-- Other -->
                                <div 
                                    v-for="(dialog, index) of currentlyActiveConversation?.dialogs"
                                    :key="index"
                                    class="flex pt-5 space-x-2 m-2"
                                    :class="{
                                        'justify-end': dialog.isSentByViewer,
                                    }">
                                    <img 
                                        v-if="!dialog.isSentByViewer"
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg self-end" />

                                    <p 
                                        v-if="dialog.text"
                                        class="break-words p-3 border border-[#1f1f1f] rounded-lg text-white lg:text-sm text-xs max-w-xs"
                                        :class="{ 
                                            'm-2 bg-gray-1100 md:bg-sky-1100': dialog.isSentByViewer, 
                                            'md:bg-[#262626]': !dialog.isSentByViewer 
                                        }">
                                            {{ dialog.text }}
                                    </p>

                                    <img 
                                        v-else-if="dialog.img"
                                        :src="dialog.img"
                                        class="cursor-pointer w-60 h-40 rounded-lg">

                                    <div v-if="index === currentlyActiveConversation.dialogs.length - 1" 
                                        id="last-element">
                                    </div>
                                </div>

                            </div>

                            <!-- File Uploading -->
                            <input
                                @change="onFileUpload"
                                ref="fileUpload"
                                accept="image/*"
                                type='file' hidden/> 

                            <!-- TODO: Improve input shape -->
                            <div 
                                class="md:absolute sticky inset-x-3 bottom-6 
                                sm:w-full rounded-full flex space-x-3">
                                <div class="relative w-full">
                                    
                                    <div @click="triggerFileUpload" :class="{'hidden': commentText}">
                                        <SVGLoader
                                            :icon="'gallery'" 
                                            :class="'cursor-pointer absolute inset-y-0 right-14 \
                                            flex items-center'" /> 
                                    </div>

                                    <div @click="scrollToTheLatestMessage" :class="{'hidden': commentText}">
                                        <SVGLoader
                                            :icon="'like'" 
                                            :class="'cursor-pointer absolute inset-y-0 right-4 \
                                            flex items-center'" />     
                                    </div>                             
                                        
                                    <textarea
                                        @keyup.enter="onSendMessage"
                                        v-model="commentText"
                                        tabindex="1"
                                        rows="1"
                                        maxlength="2200"
                                        type="text"
                                        :class="{'rounded-lg ': commentText}"
                                        class="z-50 bg-black border border-[#262626] text-white 
                                        rounded-full text-sm focus:outline-none
                                        block w-full p-2.5 lg:pb-0 resize-none" 
                                        placeholder="Message..." />
                                </div>
                                    
                            </div>

                        </div>
                        <!-- Right: Intro message -->
                        <div 
                            v-else
                            class="md:grid place-content-center bg-black border-l border-slate-800
                            lg:basis-9/12 w-full md:h-full h-screen hidden">
                            <div class="flex flex-col space-y-1">
                                <SVGLoader
                                    :icon="'direct-intro'" 
                                    :class="'cursor-pointer self-center'" /> 

                                <div class="text-white md:text-xl text-xs pt-3">
                                    Your messages
                                </div>

                                <div class="text-[#a8a8a8] lg:text-sm text-xs pb-3">
                                    Send private photos and messages to a friend or group.
                                </div>

                                <!-- <div>
                                    Send private photos and messages to a friend or group.
                                </div> -->
                                <button 
                                    type="button" 
                                    class="text-white bg-[#0095f6] hover:brightness-75 self-center
                                    font-semibold w-auto rounded-lg text-sm md:p-1.5 
                                    md:px-3 md:py-1.5 px-20 py-1 md:w-32">
                                    Send Message
                                </button>
                            </div>
                                
                        </div>
                    </div>
 
                </div>

            </div>
        </section>
        <!-- Modals -->

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, triggerRef, onMounted, type VNodeRef, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import PostCard from '@/components/basics/PostCard.vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import type {
    Emoji,
    Viewer,
    Sender,
    Inbox,
    ChatDialog,
    Reactions,
    HTMLInputElementRef,
    PhotoModalImage,
    Conversation
} from '@/common/models'
import {
    getCurrentTimestamp
} from '@/common/helpers'
import { useToast } from 'vue-toastification'


/**
 * TODO:
 *      - Sender and receiver data interface ✅
 *      - Send message design / logic: ✅
 *      - Switch chat design / logic
 *      - Send button design / logic ✅
 *      - Loading data based on URL:
 *        - Welcome message if no data provided <URL> ✅
 *        - Render side chat dynamically and emit event when any is clicked ✅
 *        - Switch view on conversation click:
 *          - Directly assign current active Conversation to the emited number ✅
 *          - Loop through it and render convo ✅
 *      - Unsupported feature popup design / logic
 *      - Send media design / logic ✅
 *        ** Message hierarchy **
 *               Inbox
 *                 |
 *            Conversations ✅
 *                 |
 *                Chat ✅
 *                 |
 *              Messages 
 */

 export default defineComponent({
    name: 'DirectView',
    setup(props, context) {


        // References to DOM element
        const fileUpload = ref<HTMLInputElementRef | null>()
        const lastMessageElement = ref()

        const commentModal = ref({
            isToggled: false,
            postId: 0
        })

        const photoModal = ref({
            isToggled: false,
            currentStep: '',
            isFileValid: false
        })
        const attachmentImage = ref<PhotoModalImage>(null)
        const commentText = ref<string>()


        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)

        // Others
        const isChatLoading = ref<boolean>(false)
        const currentlyActiveConversation = ref<Conversation>()
        const isMobileScreenSize = ref<boolean>(false)
        let screenWidth = ref<number>(window.innerWidth) // Current window width

        // let window = ref(window) // Current window width

        /**
         * Dummy datas
         */
        const emoji: Emoji = {
            timeStamp: 1683491483190270,
            senderId: "4036118946",
            emoji: "👍"
        }
        const reactions: Reactions = {
            likes: [],
            likesCount: 0,
            Emojis: [emoji]
        }

        const userA: Viewer = {
            id: "123456789",
            firstName: "John",
            lastName: "Doe",
            userName: "johndoe",
            profilePictureUrl: "https://loremflickr.com/1024/1280/life",
            email: "johndoe@example.com",
            followerCount: 1000,
            followingCount: 500,
        }

        const userB: Sender = {
            id: "987654321",
            firstName: "Jane",
            lastName: "Smith",
            userName: "janesmith",
            profilePictureUrl: "https://loremflickr.com/1024/1280/car",
            followerCount: 500,
            followingCount: 1000,
        }

        const currentUser = userA

        // A chat instances between two users
        const chatA = ref<ChatDialog[]>([
            {
                utemId: "31054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483190270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5136,
                text: "Hello, how are you?"
            },
            {
                utemId: "42054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483195270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5137,
                text: "I'm good, thanks! How about you?",
            },
            {
                utemId: "52054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483198270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5138,
                text: "I'm doing great too!"
            },
            {
                utemId: "62054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483200270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5139,
                text: "That's great to hear!"
            },
        ])
        const chatB = ref<ChatDialog[]>([
            {
                utemId: "31054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483190270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5136,
                text: "Hey, how's your day going?",
            },
            {
                utemId: "42054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483195270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5137,
                text: "It's going well, thanks! What about you?",
            },
            {
                utemId: "52054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483198270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5138,
                text: "I'm having a productive day so far!",
            },
            {
                utemId: "62054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483200270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5139,
                text: "That's awesome! Keep up the good work!",
            },
            {
                utemId: "72054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483203270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5140,
                text: "Thanks! I'm working on an exciting project.",
            },
            {
                utemId: "82054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483206270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5141,
                text: "Oh, that sounds interesting. What is it about?",
            },
            {
                utemId: "92054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483209270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5142,
                text: "It's a mobile app for organizing daily tasks and setting reminders.",
            },
            {
                utemId: "102054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483212270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5143,
                text: "That's useful! I could definitely use something like that.",
            },
            {
                utemId: "31054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483190270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5136,
                text: "Hey, how's your day going?",
            },
            {
                utemId: "42054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483195270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5137,
                text: "It's going well, thanks! What about you?",
            },
            {
                utemId: "52054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483198270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5138,
                text: "I'm having a productive day so far!",
            },
            {
                utemId: "62054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483200270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5139,
                text: "That's awesome! Keep up the good work!",
            },
            {
                utemId: "72054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483203270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5140,
                text: "Thanks! I'm working on an exciting project.",
            },
            {
                utemId: "82054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483206270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5141,
                text: "Oh, that sounds interesting. What is it about?",
            },
            {
                utemId: "92054936540680616356189602913976320",
                user: userA,
                timestamp: 1683491483209270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5142,
                text: "It's a mobile app for organizing daily tasks and setting reminders.",
            },
            {
                utemId: "102054936540680616356189602913976320",
                user: userB,
                timestamp: 1683491483212270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5143,
                text: "That's useful! I could definitely use something like that.",
            },
        ])

        // List of all conversations in the inbox
        const conversations = ref<Conversation[]>([
            {
                uuid: '1',
                user: userA,
                lastMessage: 'Hello World',
                timeSinceLastMessage: '1w',
                dialogs: chatA.value,
                isActive: false
            },
            {
                uuid: '2',
                user: userB,
                lastMessage: 'I miss you baby 💕',
                timeSinceLastMessage: '1w',
                dialogs: chatB.value,
                isActive: false
            },
        ])

        // Current user inbox
        const inbox = ref<Inbox>({
            threads: conversations.value,
            unseenCount: 1,
            unseenCountTimeStamp: 1683491483190270
        })

        /**
         * Reactive datas
         */
        const chatMessage = ref<ChatDialog>({
            user: undefined,
            uqSeqId: undefined,
            itemType: undefined,
            isSentByViewer: undefined,
            text: undefined,
            timestamp: undefined
        })


        // Services
        const router = useRouter()
        const toast = useToast()
        // const photoStore = usePhotoStore()


        // Methods
        const onSendMessage = (payload: Event) => {
            commentText.value = '' // Clear message area
            const message = payload.target as HTMLInputElement
            console.log('Message to sent', message.value)
            // Prevent spacing values
            if (message.value.trim() != '') {
                chatMessage.value = {
                    user: userA,
                    itemType: '',
                    isSentByViewer: true,
                    text: message.value,
                    timestamp: getCurrentTimestamp(),
                }
                // Reset message
                message.value = ''
            }
        }

        /**
         * Trigger DOM file upload event
         */
        const triggerFileUpload = () => {
            console.log('Clicked...')
            fileUpload.value?.click()
        }

        /**
         * Push message to inbox
         * @param message Message to be added
         */
        const addToChat = (message: ChatDialog) => {
            currentlyActiveConversation.value?.dialogs.push(message)
            console.log('Message added successfully ✅', message)
            console.log('Current messages', currentlyActiveConversation.value?.dialogs.forEach(element => {
                console.log('Message: ', element.text)
            }))
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
                console.log("File uploaded", file)

                chatMessage.value = {
                    user: userA,
                    itemType: 'image',
                    isSentByViewer: true,
                    img: attachmentImage.value as string,
                    timestamp: getCurrentTimestamp(),
                }
            }
        }

        /**
         * 
         * @param convo - Conversation to be selected
         */
        const onSelectConversation = (convo: Conversation) => {
            currentlyActiveConversation.value = convo
        }

        /**
         * Go back to conversation list
         */
        const onPageBack = () => {
            currentlyActiveConversation.value = undefined
        }

        const onUnsupportedFeatureClick = () => {
            toast.info("The following feature, is not supported yet.")
        }

        const resetChatMessage = () => {
            chatMessage.value = {
                text: undefined,
            }
        }

        const sendHeartEmoji = () => {
            chatMessage.value = {
                text: undefined,
            }
        }

        /**
         * Scroll to latest message in the conversation
         */
        const scrollToTheLatestMessage = () => {
            const target = document.querySelector("#last-element")
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
            }
        }

        const shouldUpdateInbox = () => {
            const message = chatMessage.value
            return (message.text != undefined || message.img != undefined)
        }


        // Watchers
        /**
         * Watch screen size to trigger mobile screen flag
         */
        watch(() => screenWidth.value, (size) => {
            const smallScreenWidth = 750
            if (size <= smallScreenWidth) {
                isMobileScreenSize.value = true
                // console.log('Current screen size: ', screenWidth.value, isMobileScreenSize.value)
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
        watch(currentlyActiveConversation, () => {
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
            commentModal,
            photoModal,
            fileUpload,
            inbox,
            commentText,
            conversations,
            currentlyActiveConversation,
            isChatLoading,
            isMobileScreenSize,
            lastMessageElement,
            currentUser,

            onSendMessage,
            onFileUpload,
            onPageBack,
            onUnsupportedFeatureClick,
            onSelectConversation,
            triggerFileUpload,
            sendHeartEmoji,
            scrollToTheLatestMessage
        }
    },
    components: {
        PostCard,
        SVGLoader,
        NavBarMain,
    },
    props: {}
})
</script>




<style>

</style>