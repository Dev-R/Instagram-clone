<template>
    <div 
        class="bg-black rounded-lg shadow h-5/6 w-full md:pt-0 md:z-0 pt-5 z-50 
        lg:h-auto md:w-[400px] md:bg-slate-1100 absolute 
        top-1/3 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 'hidden': !isToggled }">
        <!-- Modal header -->
        <div class="flex p-2 border-b border-gray-600 rounded-t justify-between">
            <div></div>

            <h3 class="font-sans text-md font-bold text-white">
                {{ title }}
            </h3>

            <button type="button" 
                @click="onModalClosed()"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                    rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 
                    dark:hover:text-white" data-modal-hide="small-modal">
                    <SVGLoader :icon="'cross'"/>
                    
            </button>

        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
                <div 
                    class="flex flex-col space-y-5 lg:max-h-80 max-h-full overflow-y-scroll scrollbar">

                    <div 
                        v-for="item of items"
                        class="rounded-lg flex justify-between space-x-2">
                        <SmallCard 
                            :profile-image="item.profilePictureUrl">

                            <template v-slot:user-name>
                                {{ item.userName }}
                            </template>

                            <template v-slot:action-name>
                                Follow
                            </template>

                            <template v-slot:button-name>
                                Remove
                            </template>

                        </SmallCard>

                    </div>
                    
                </div>
        </div>
        
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import type { SuggestionCard } from '@/common/models/post.model'
import SmallCard from '@/components/cards/SmallCard.vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'

export default defineComponent({
    name: "smallModal",
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
        title: {
            type: String,
            required: true
        },
        items: {
            type: Object as () => SuggestionCard[],
            required: true
        },
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