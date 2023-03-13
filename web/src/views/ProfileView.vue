<template>
    <div class="bg-black">
        <section 
            class="container max-w-full mx-auto text-center"
            :class="{ 'brightness-50': commentModalInfo.isToggled }">
            <div class=" grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black pt-5
                    md:block hidden space-y-12 relative h-screen 
                    sticky top-0 border-r border-gray-900">
                    <!-- A -->
                    <NavBarMain/>
                    
                </div>

                <!-- Center: Posts -->
                <div 
                    class="lg:col-span-8 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-8 md:p-0
                    col-span-12 p-2">
 
                    <div 
                        class="md:w-[570px] flex flex-col 
                        space-y-4 flex-nowrap lg:w-[975px] 
                        justify-self-end lg:mr--[64px]">
                        <div class="flex space-x-12 border-b border-slate-800 pb-12">
                            <div>
                                <img 
                                    src="https://loremflickr.com/1024/1280/black" 
                                    class="w-40 h-40 rounded-full">
                            </div>
                            <div class="p-5 bg-black flex flex-col space-y-6">
                                <div class="flex space-x-4">
                                    <div class="font-sans text-xl font-normal text-white">
                                        hot_souce_56
                                    </div>
                                    <div>
                                        <button 
                                            type="button" 
                                            class="text-gray-900 bg-white hover:bg-gray-100 
                                            border border-gray-200 font-semibold 
                                            rounded-lg text-sm px-5 py-1.5  ">
                                            Edit Profile
                                        </button>
                                    </div>
                                    <div>
                                        <SVGLoader :icon="'options'" />
                                    </div>
                                </div>

                                <div class="flex space-x-4">
                                    <div class="font-sans text-md font-normal text-white">
                                        <span class="font-sans text-md font-bold text-white">2</span> posts
                                    </div>
                                   <div class="font-sans text-md font-normal text-white">
                                    <span class="font-sans text-md font-bold text-white">264</span> followers
                                    </div>
                                    <div class="font-sans text-md font-normal text-white">
                                        <span class="font-sans text-md font-bold text-white">452</span> following
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <!-- Comment Modal -->
        <CommentModal
            @on-modal-closed="triggerCommentModal" 
            :post-comment="{
                isToggled: commentModalInfo.isToggled,
                post : postItems[commentModalInfo.postId],
            }"/>

        <!-- Mobile Navbar -->
        <NavBarMobile />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import SVGLoader from '@/components/basics/SVGLoader.vue';
import NavBarMain from '@/components/navbars/NavBarMain.vue';
import NavBarMobile from '@/components/navbars/NavBarMobile.vue';
import CommentModal from '@/components/basics/CommentModal.vue';

import type { PostMedia } from '@/common/models/post.model';

export default defineComponent({
    name: 'Profile',
    setup() {


        const commentModalInfo = ref({
            isToggled: false,
            postId: 0
        })

        const triggerCommentModal = (id: number | undefined) => {
            console.log('triggerCommentModal:', id)
            commentModalInfo.value = { 'isToggled': !commentModalInfo.value.isToggled, postId: id ? id : 0 }
        }
        const mediasArraySampleA: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/cat",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/nature",
                title: "Legendary A"
            }
        ]


        const postItems = [
            {
                id: '0',
                userName: 'Rabee',
                createdAt: 'February 24',
                likeCount: 0,
                hasLiked: true,
                caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
                carouselMedia: mediasArraySampleA,
                commentCount: 0,
                profilePictureUrl: 'https://loremflickr.com/32/32/bird'
            },
            {
                id: '1',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 10,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleA,
                commentCount: 5,
                profilePictureUrl: 'https://loremflickr.com/32/32/girl'
            }
        ]


        return {
            postItems,
            commentModalInfo,
            triggerCommentModal
        }
    },
    components: {
        SVGLoader,
        NavBarMain,
        CommentModal,
        NavBarMobile
    }
})
</script>




<style>

</style>