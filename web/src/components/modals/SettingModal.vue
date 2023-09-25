<template>
    <div 
        class="bg-black rounded-lg shadow h-5/6 w-full md:pt-0 md:z-0 pt-5 z-50 
        lg:h-auto md:w-[400px] md:bg-slate-1100 absolute 
          top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 'hidden': !isToggled }">
        <!-- Modal body -->
        <div class="space-y-6 rounded-full">
                <div class="flex flex-col m-1 max-h-full overflow-y-scroll scrollbar">
                    <div 
                        v-for="(setting, index) in settings"
                        :key="index"
                        @click="setting.action()"
                        class="flex w-full border-b border-gray-700 justify-center p-2 hover:cursor-pointer">

                        <span class="font-sans text-sm font-thin text-white">
                            {{ setting.name }}
                        </span>

                    </div>
                </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'vue-toastification';

import {
    SmallCard,
    SVGLoader
} from '@/components';

export default defineComponent({
    name: "settingModal",
    setup(prop, context) {

      const router = useRouter();
      const toast = useToast();

      const settings = [
        {
            name: 'Change Password',
            action: () => goToSettingRoute()
        },
        {
            name: 'QR Code',
            action: () => goToSettingRoute()
        },
        {
            name: 'Apps and Websites',
            action: () => goToSettingRoute()
        },
        {
            name: 'Notifications',
            action: () => goToSettingRoute()
        },
        {
            name: 'Privacy and security',
            action: () => goToSettingRoute()
        },
        {
            name: 'Supervision',
            action: () => goToSettingRoute()
        },
        {
            name: 'Emails from Instagram',
            action: () => goToSettingRoute()
        },
        {
            name: 'Report a problem',
            action: () => goToSettingRoute()
        },
        {
            name: 'Log Out',
            action: () => logout()
        },
        {
            name: 'Cancel',
            action: () => onModalClosed()
        },
      ]

      const goToSettingRoute = () => {
          router.push('/settings');
      }

      const logout = () => {
        // TODO: Add logout logic and make a universal logout function
          toast.success('Logout successful');
		//   Sleep for 2 seconds
		  setTimeout(() => {
			  router.push('/accounts/login');
		  }, 2000)

      }

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
            onModalClosed,
            goToSettingRoute,
            settings
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