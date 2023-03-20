<template>
    <div class="bg-white rounded-lg shadow max-w-sm bg-slate-1100">
        <!-- Modal header -->
        <div class="flex p-2 border-b border-gray-600 rounded-t justify-between">
            <div></div>

            <h3 class="font-sans text-md font-bold text-white">
                {{  }}
            </h3>

            <button type="button" 
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                    rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 
                    dark:hover:text-white" data-modal-hide="small-modal">
                    <SVGLoader :icon="'cross'"/>
                    
            </button>

        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
                <div 
                    class="flex flex-col space-y-5 max-h-80 overflow-y-scroll scrollbar">

                    <div class="rounded-lg flex justify-between space-x-2">

                        <div class="flex flex-inital flex-row text-center space-x-1">
                            <img 
                                src="https://loremflickr.com/1024/1280/nature" 
                                class="w-8 h-8 rounded-full">
                            
                            <div class="flex pt-2 space-x-2">
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    {{  }}
                                </span>
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    ·
                                </span>
                                <span class="font-sans text-xs text-sky-500 pt-1">
                                    {{  }}
                                </span>
                            </div>

                        </div>

                        <button 
                            type="button" 
                            class="flex-inital self-end text-gray-900 
                            border border-gray-200 font-semibold w-auto 
                            bg-white hover:bg-gray-100 rounded-lg text-sm md:p-1.5
                            rounded-lg text-sm md:p-1.5 md:px-5 md:py-1.5 px-20 py-1.5 md:w-auto">
                            Remove
                        </button>

                    </div>

                    <div class="rounded-lg flex justify-between space-x-2">

                        <div class="flex flex-inital flex-row text-center space-x-1">
                            <img 
                                src="https://loremflickr.com/1024/1280/nature" 
                                class="w-8 h-8 rounded-full">
                            
                            <div class="flex pt-2 space-x-2">
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    Rabee
                                </span>
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    ·
                                </span>
                                <span class="font-sans text-xs text-sky-500 pt-1">
                                    Follow
                                </span>
                            </div>

                        </div>

                        <button 
                            type="button" 
                            class="flex-inital self-end text-gray-900 
                            border border-gray-200 font-semibold w-auto 
                            bg-white hover:bg-gray-100 rounded-lg text-sm md:p-1.5
                            rounded-lg text-sm md:p-1.5 md:px-5 md:py-1.5 px-20 py-1.5 md:w-auto">
                            Remove
                        </button>

                    </div>
                    <div class="rounded-lg flex justify-between space-x-2">

                        <div class="flex flex-inital flex-row text-center space-x-1">
                            <img 
                                src="https://loremflickr.com/1024/1280/nature" 
                                class="w-8 h-8 rounded-full">
                            
                            <div class="flex pt-2 space-x-2">
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    Rabee
                                </span>
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    ·
                                </span>
                                <span class="font-sans text-xs text-sky-500 pt-1">
                                    Follow
                                </span>
                            </div>

                        </div>

                        <button 
                            type="button" 
                            class="flex-inital self-end text-gray-900 
                            border border-gray-200 font-semibold w-auto 
                            bg-white hover:bg-gray-100 rounded-lg text-sm md:p-1.5
                            rounded-lg text-sm md:p-1.5 md:px-5 md:py-1.5 px-20 py-1.5 md:w-auto">
                            Remove
                        </button>

                    </div>

                    <div class="rounded-lg flex justify-between space-x-2">

                        <div class="flex flex-inital flex-row text-center space-x-1">
                            <img 
                                src="https://loremflickr.com/1024/1280/nature" 
                                class="w-8 h-8 rounded-full">
                            
                            <div class="flex pt-2 space-x-2">
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    Rabee
                                </span>
                                <span class="font-sans text-sm font-semibold text-white self-start">
                                    ·
                                </span>
                                <span class="font-sans text-xs text-sky-500 pt-1">
                                    Follow
                                </span>
                            </div>

                        </div>

                        <button 
                            type="button" 
                            class="flex-inital self-end text-gray-900 
                            border border-gray-200 font-semibold w-auto 
                            bg-white hover:bg-gray-100 rounded-lg text-sm md:p-1.5
                            rounded-lg text-sm md:p-1.5 md:px-5 md:py-1.5 px-20 py-1.5 md:w-auto">
                            Remove
                        </button>

                    </div>

                </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'


export default defineComponent({
    name: 'FollowModal',
    setup(prop) {
        onMounted(() => {
        })

        return { }
    },
    props: {
        prop: {
            type: Object as () => {},
            required: true
        }
    }
})
</script>