<template>
    <div class="flex flex-col space-y-4 pt-2">

        <!-- Header: username | daysSinceUpload | options-->
        <div class="flex rounded-lg space-x--1 justify-between">
            <!-- 1 -->
            <div class="flex space-x-2">

                <img src="http://via.placeholder.com/32x32" class="cursor-pointer h-8 w-8 rounded-full shadow-lg">
                <div class="flex pt-1">
                    <div class="cursor-pointer font-sans text-sm font-semibold text-white">
                        imamomarsuleiman
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <div class="text-gray-500 w-5 font-sans text-md font-semibold text-white">
                        •
                    </div>

                    <div class="font-sans text-sm font-semibold text-gray-500">
                        1d
                    </div>
                </div>

            </div>

            <div class="cursor-pointer">
                <SVGLoader :icon="'more-options-svg'" />
            </div>

        </div>
        <!-- 2 -->
        <div class="md:max-h-[585px] p-1">
            <!-- <img src="https://loremflickr.com/1024/1280" class="rounded"> -->
            <PostMediaCarousel :medias="postMedias" />
        </div>
        <!-- 3 -->
        <div class="flex justify-between">

            <div class="flex space-x-4">

                <span class="cursor-pointer hover:scale-90">
                    <SVGLoader :icon="'like'" />
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

        <!-- 4 -->
        <div class="cursor-pointer font-sans text-sm font-semibold text-white self-start">
            23,489 likes
        </div>

        <!-- 5 -->
        <div class="font-sans text-sm text-white flex-col">
            <!-- <span class="font-semibold">imamomarsuleiman</span> -->
            <p class="text-sm text-left indent-8 break-all ">
                Dispiceremque ob nouavit. Aptaveras perebamque conferebant et fugitivi muliebrique attrectareque, pro e
                tenueratqueerati</p>
        </div>

        <!-- 6 -->
        <div class="grid grid-cols-12 border-b border-slate-800 p-2">
            <span class="col-span-10">
                <textarea rows="1" class="focus:outline-none resize-none block w-full text-sm bg-black text-white"
                    placeholder="Add a comment..."></textarea>
            </span>
            <span class="font-sans text-xs text-sky-500 justify-self-end cursor-pointer hover:text-white h-6">
                Post
            </span>
            <span class="text-gray-600 justify-self-end cursor-pointer fa-regular fa-face-smile w-3 h-3">
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import type { PostMedia } from '@/common/models/Post.model'
export default defineComponent({
    name: 'PostCard',
    setup() {
        onMounted(() => {
            // console.log('Mounted PostCard')
        })

        return {}
    },
    props: {
        postData: {
            type: Object as () => {
                username: string,
                medias: PostMedia[]
            },
            required: true,
        },
        postMedias: {
            type: Object as () => PostMedia[],
            required: true,
        }
    }
})
</script>