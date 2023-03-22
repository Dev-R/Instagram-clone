<template>
    <div 
        class="rounded-lg shadow w-4/5 md:pt-0 md:z-0  z-50 
        lg:h-auto h-4/5 md:w-[742px] bg-slate-1100 absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 'hidden': isToggled }">

        
        <div class="space-y-6 rounded-full pb-2">
                <div class="flex flex-col lg:h-[750px]">
                    <!-- Header -->
                    <div class="flex border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-semibold text-white">
                            Create new post 
                        </span>
                    </div>
                    <!-- Body -->
                    <div class="flex flex-col m-auto space-y-4">

                        <SVGLoader :icon="'media-modal'" :class="'mx-auto'"/>

                        <span class="font-sans text-lg font-normal text-white mx-auto">
                            Drag photos and videos here
                        </span>

                        <button  
                            type="button" 
                            class="text-white bg-[#0095f6] hover:bg-sky-700
                            font-semibold w-auto mx-auto rounded-lg text-xs 
                            md:p-1.5 md:px-3 md:py-1.5 px-3 py-1 md:w-auto">
                            Select from computer>
                        </button>
                    </div>
                </div>
        </div>
        
    </div>
    <!-- Modal Header -->
    <div class="md:block hidden pt-3">
        <div class="md:mr-12 flex items-center justify-between cursor-pointer">
            <span class="ml-auto inline-flex text-white">
                <SVGLoader :icon="'cross'" @click="onModalClosed()" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import SmallCard from '@/components/basics/smallCard.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';

export default defineComponent({
    name: "photoModal",
    setup(prop, context) {

      /**
       * Emit signal when the modal is closed
       * @event modal-closed
       */
       const onModalClosed = () => {
          context.emit('onModalClosed')
      }
        onMounted(() => {
        });
        return {
            onModalClosed
        };
    },
    props: {
        isToggled: {
            type: Boolean,
            required: true
        }
    },
    components: { 
        SmallCard, 
        SVGLoader 
    },
    emits: [
      'onModalClosed',
  ]
})
</script>