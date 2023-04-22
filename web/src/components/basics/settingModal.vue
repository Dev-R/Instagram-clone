<template>
    <div 
        class="bg-black rounded-lg shadow h-5/6 w-full md:pt-0 md:z-0 pt-5 z-50 
        lg:h-auto md:w-[400px] md:bg-slate-1100 absolute 
        md:top-1/3 top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 'hidden': !isToggled }">
        <!-- Modal body -->
        <div class="space-y-6 rounded-full pb-2">
                <div 
                    class="flex flex-col  max-h-full overflow-y-scroll scrollbar">

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Change Password
                        </span>
                    </div>

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            QR Code
                        </span>
                    </div>

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Apps and Websites
                        </span>
                    </div>    

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Notifications
                        </span>
                    </div>    

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Privacy and security
                        </span>
                    </div>  

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Supervision
                        </span>
                    </div>  

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Emails from Instagram
                        </span>
                    </div>

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Report a problem
                        </span>
                    </div>

                    <div class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Log Out
                        </span>
                    </div> 

                    <div 
                        @click="onModalClosed()"
                        class="flex w-full justify-center p-2 hover:cursor-pointer">
                        <span class="font-sans text-sm font-thin text-white">
                            Cancel
                        </span>
                    </div> 
                    
                </div>
        </div>
        
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import SmallCard from '@/components/basics/SmallCard.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';

export default defineComponent({
    name: "settingModal",
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