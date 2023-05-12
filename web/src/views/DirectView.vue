<template>
    <div class="bg-[#121212]">
        <section 
            class="container max-w-full mx-auto text-center"
            :class="{ 'brightness-50 pointer-events-none': commentModal.isToggled || photoModal.isToggled }">
            <div class="grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
                    
                    <!-- A -->
                    <NavBarMain
                        />
                    
                </div>

                <!-- Center: Messages -->
                <div 
                    class="lg:col-span-6 lg:col-start-5 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-8
                    col-span-12 bg-gray-300 lg:max-h-[920px]">
                    <div class="flex flex-row h-full">
                        <div class="bg-black basis-1/2 lg:block hidden">
                            
                            <div class="flex bg-black border border-slate-800 p-5 lg:h-16 w-full space-x-2 justify-between items-center">
                                    <div>
                                    </div>
                                    
                                    <div class="flex">
                                        <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                                            Instagram User
                                        </div>

                                        <div class="flex space-x-4 cursor-pointer">
                                        </div>
                                    </div>

                                    <div class="flex cursor-pointer items-center">
                                        <SVGLoader :icon="'new-message'" />
                                    </div>
                            </div>


                            <!-- Chat rendering -->

                            <div class="flex flex-col lg:max-h-[850px] overflow-auto">

                                <div class="flex p-3 space-x-3 hover:bg-[#262626] w-full cursor-pointer">
                                    <!-- Profile Image -->
                                    <img 
                                        src="https://loremflickr.com/1024/1080/cat"
                                        class="cursor-pointer h-14 w-14 rounded-full shadow-lg">


                                    <!-- Username / Chat / Date -->
                                    <div class="flex flex-col self-center space-y-2 pb-3">
                                        <span class="font-sans text-sm font-semibold text-white self-start">
                                            Instagram User
                                        </span>
                                        <div class="flex flex-row space-x-1">
                                                <span class="font-sans text-xs font-semibold text-gray-400">
                                                    Hello World ...
                                                </span>

                                                <div class="font-sans text-xs font-semibold text-gray-500">
                                                    •
                                                </div>

                                                <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                                                    1d
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex p-3 space-x-3 hover:bg-[#262626] w-full cursor-pointer">
                                    <!-- Profile Image -->
                                    <img 
                                        src="https://loremflickr.com/1024/1080/love"
                                        class="cursor-pointer h-14 w-14 rounded-full shadow-lg">


                                    <!-- Username / Chat / Date -->
                                    <div class="flex flex-col self-center space-y-2 pb-3">
                                        <span class="font-sans text-sm font-semibold text-white self-start">
                                            Instagram User
                                        </span>
                                        <div class="flex flex-row space-x-1">
                                                <span class="font-sans text-xs font-semibold text-gray-400">
                                                    Hello World ...
                                                </span>

                                                <div class="font-sans text-xs font-semibold text-gray-500">
                                                    •
                                                </div>

                                                <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                                                    1d
                                                </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                        <!-- Current Chat -->
                        <div class="relative bg-black lg:basis-9/12 w-full md:h-full h-screen">
                            
                            <div class="flex lg:h-16 md:pl-8 w-full space-x-2 justify-between items-center border-slate-700 border-b lg:visible invisible">
                                    <div class="flex space-x-2 items-center">
                                        <img 
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg">

                                            
                                        <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                                            Instagram User
                                        </div>
                                    </div>

                                    <div class="flex space-x-4 cursor-pointer ">
                                        <SVGLoader :icon="'audio-call'" />
                                        <SVGLoader :icon="'video-call'" />
                                        <SVGLoader :icon="'chat-info'" />
                                        <div></div>
                                        <div></div>
                                    </div>
                             </div>
                                
                            <div class="flex flex-col h-5/6 lg:max-h-[850px] overflow-auto">
                                <div class="flex pt-5 space-x-2 justify-center">
                                    <span class="font-sans text-xs font-semibold text-gray-400">
                                        November 2, 2020 12:44 am
                                    </span>
                                </div>

                                <!-- Other -->
                                <div 
                                    v-for="thread of inbox.threads"
                                    class="flex pt-5 space-x-2 m-2"
                                    :class="{ 'justify-end ': thread.isSentByViewer }">
                                    <img 
                                        v-if="!thread.isSentByViewer"
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg self-end">
                                    <div 
                                        v-if="thread.text"
                                        class="p-3 border border-[#1f1f1f] rounded-full text-white lg:text-sm text-xs"
                                        :class="{ 'm-2 bg-slate-1100': thread.isSentByViewer }">
                                            {{ thread.text }}
                                    </div>
                                    <img 
                                        v-else-if="thread.img"
                                        :src="thread.img"
                                        class="cursor-pointer w-60 h-40 rounded-lg">
                                </div>

                            </div>

                            <!-- File Uploading -->
                            <input
                                @change="onFileUpload"
                                ref="fileUpload"
                                accept="image/*"
                                type='file' hidden/> 


                            <!-- TODO: Improve input shape -->
                            <div class="md:absolute sticky inset-x-3 bottom-6 sm:w-11/12 rounded-full h-11 flex space-x-3">
                                <div class="relative w-full">
                                    
                                    <div @click="triggerFileUpload">
                                        <SVGLoader
                                            :icon="'gallery'" 
                                            :class="'cursor-pointer absolute inset-y-0 right-14 \
                                            flex items-center'"/> 
                                    </div>

                                    <div @click="sendHeartEmoji()">
                                        <SVGLoader
                                            :icon="'like'" 
                                            :class="'cursor-pointer absolute inset-y-0 right-4 \
                                            flex items-center'"/>     
                                    </div>                             
                                        
                                    <input
                                        @keyup.enter="onSendMessage"
                                        tabindex="1"
                                        type="text"
                                        class="z-50 bg-black border border-[#262626] text-white text-sm rounded-full focus:outline-none
                                        block w-full p-2.5" 
                                        placeholder="Message">
                                </div>
                                    
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
import { defineComponent, ref, watch, computed, triggerRef } from 'vue'
import { useRouter } from 'vue-router'

import PostCard from '@/components/basics/PostCard.vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import type { 
    Emoji,
    Viewer,
    Inbox,
    Chat,
    Reactions,
    HTMLInputElementRef,
PhotoModalImage
} from '@/common/models'
import {
    getCurrentTimestamp
} from '@/common/helpers'


/**
 * TODO:
 *      - Sender and receiver data interface ✅
 *      - Send message design / logic: ✅
 *      - Switch chat design / logic
 *      - Send button design / logic ✅
 *      - Loading data based on URL
 *      - Welcome message if no data provided
 *      - Unsupported feature popup design / logic
 *      - Send media design / logic ✅
 */

 export default defineComponent({
    name: 'DirectView',
    setup(props, context) {


        // References to DOM element
        const fileUpload = ref<HTMLInputElementRef | null>()
        
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


        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)

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

        const chats: Chat[] = [
            {
                utemId: "31054936540680616356189602913976320",
                userId: "34351335554",
                timestamp: 1683491483190270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5136,
                text: "Hello, how are you?"
            },
            {
                utemId: "42054936540680616356189602913976320",
                userId: "4036118946",
                timestamp: 1683491483195270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5137,
                text: "I'm good, thanks! How about you?",
            },
            {
                utemId: "52054936540680616356189602913976320",
                userId: "34351335554",
                timestamp: 1683491483198270,
                itemType: "text",
                isSentByViewer: true,
                uqSeqId: 5138,
                text: "I'm doing great too!"
            },
            {
                utemId: "62054936540680616356189602913976320",
                userId: "4036118946",
                timestamp: 1683491483200270,
                itemType: "text",
                isSentByViewer: false,
                uqSeqId: 5139,
                text: "That's great to hear!"
            },
        ]


        /**
         * Reactive datas
         */
        const chatMessage = ref<Chat>({
            userId: undefined,
            uqSeqId: undefined,
            itemType: undefined,
            isSentByViewer: undefined,
            text: undefined,
            timestamp: undefined
        })

        const inbox = ref<Inbox>({
            threads: chats,
            unseenCount: 1,
            unseenCountTimeStamp: 1683491483190270
        })

        // Services
        const router = useRouter()
        // const photoStore = usePhotoStore()


        // Methods
        const onSendMessage = (payload: Event) => {
            const targetEvent = payload.target as HTMLInputElement
            console.log('Message to sent', targetEvent.value)
            chatMessage.value = {
                userId: viewer.id,
                itemType: '',
                isSentByViewer: true,
                text: targetEvent.value,
                timestamp: getCurrentTimestamp(),
            }
            // Reset message
            targetEvent.value = ''
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
        const addToThread = (message: Chat) => {
            inbox.value.threads.push(message)
            console.log('Message added successfully ✅', message)
            console.log('Current messages', inbox.value.threads.forEach(element => {
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
                    userId: viewer.id,
                    itemType: 'image',
                    isSentByViewer: true,
                    img: attachmentImage.value as string,
                    timestamp: getCurrentTimestamp(),
                }
            }
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

        // TODO: Complete and use
        const scrollToBottom = () => {
            window.scrollTo
        }

        const shouldUpdateInbox = () => {
            const message = chatMessage.value
            return (message.text != undefined || message.img != undefined)
        }

        /**
         * Update inbox with latest message
         */
        watch(chatMessage, () => {
            if (shouldUpdateInbox()) {
                console.log('Adding message ...')
                addToThread(chatMessage.value)
                resetChatMessage()
            }
        })

        // Dummy data for Viewer interface
        const viewer: Viewer = {
            id: "123456789",
            mediaCount: 10,
            profilePicture: "https://example.com/profile-picture.jpg",
            isVerified: true,
            fullName: "John Doe",
            userName: "johndoe"
        }

        return {
            commentModal,
            photoModal,
            fileUpload,
            inbox,

            onSendMessage,
            onFileUpload,
            triggerFileUpload,
            sendHeartEmoji
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