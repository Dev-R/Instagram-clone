<template>
	<div 
        :class="isToggledClass"
        class="flex flex-col h-screen space-y-4 flex-nowrap sticky top-0 justify-between">
		<!-- Icon and Navbar tabs -->
		<div class="flex flex-col">
			<!-- Icon -->
			<div 
				:class="{ 'xl:justify-start': !isNavBarCollapsed }"
				class="p-4 rounded-lg flex cursor-pointer justify-center">
				<!-- Large Icon -->
				<div
					v-if="!isNavBarCollapsed"
					class="xl:block hidden p-2 pt-7">
					<SVGLoader :icon="'instagram-large'" />
				</div>
				<div 
					:class="isNavBarCollapsed ? 'block pt-5' : 'xl:hidden block'">
					<!-- Small Icon -->
					<SVGLoader :icon="'instagram-small'" />
				</div>
			</div>

			<!-- Side NavBar Items Rendering -->
			<div class="p-1 md:pl-3 flex flex-col space-y-2">
				<div 
					v-for="item in menuItems"
					@click="updateActiveNavBar(item.name)">
					<router-link
						:to="item.path"
						:class="{ 
							'xl:justify-center': isNavBarCollapsed,
							'bg-slate-1000 animate-pulse': item.name === activeNavBar
						}"
						class="group cursor-pointer rounded-full
						flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100 
						p-3 xl:justify-start justify-center"
						@click="item.onClick">
						<SVGLoader 
							v-if="item.name != 'profile'"
							:icon="item.iconSvgName!" 
							:class="'group-hover:scale-110 group-active:scale-90 delay-100'" />

						<img 
							v-else
							:src="item.img" 
							class="w-6 h-6 rounded-full shadow-lg group-hover:scale-110" />

						<span 
							:class="{ 'xl:hidden': isNavBarCollapsed }"
							class="xl:block hidden font-sans text-md 
							font-normal text-white">
							{{ item.title }}
						</span>
					</router-link>
				</div>
			</div>
		</div>

		<!-- More Settings -->
		<div 
			@click="toggleMoreModal"
			class="cursor-pointer rounded-full flex space-x-4 md:px-5 p-5
			sm:hover:bg-slate-1000 sm:hover:delay-100 ">
			<SVGLoader :icon="'more'" />
			<span 
				:class="isNavBarCollapsed ? 'xl:hidden block' : 'block'"
				class="font-sans text-md 
                font-semibold text-white">
				More
			</span>
		</div>

		<!-- More Modal -->
		<div 
			class="bg-black rounded-lg md:w-full md:bg-slate-1100 absolute max-w-xs st
			top-2/4 left-1/2 transform translate-y-1/4 -translate-x-1/2 "
			:class="{ 'hidden': isMoreModalOpen }">
			<!-- Modal body -->
			<div class="flex flex-col m-1 max-h-full overflow-y-scroll scrollbar">
				<div 
					v-for="(setting, index) in settings"
					:key="index"
					@click="setting.action()"
					class="flex w-full md:pb-4 hover:cursor-pointer space-x-3 px-3 py-2 
					sm:hover:bg-[#343434] sm:hover:delay-100  cursor-pointer rounded-full">

					<i 
						:class="setting.iconSvgName"
						class="text-white self-end">
					</i>
					<span class="font-sans text-sm font-thin text-white">
						{{ setting.name }}
					</span>

				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import {
    onMounted,
    computed,
    ref
} from 'vue'

import {
    useRoute,
    useRouter
} from 'vue-router'

import {
    useToast
} from 'vue-toastification'

import {
    SVGLoader
} from '@/components'

import {
useModalManagerStore,
    usePhotoStore
} from '@/stores'

import {
    type NavBarItem,
	ModalName,
} from '@/common'


const emit = defineEmits([
    'onCreate',
    'onProfileOpen'
])

// Services
const router = useRouter()
const route = useRoute() // TODO: Remove either route or router
const toast = useToast()
const photoStore = usePhotoStore()
const modalStoreManager = useModalManagerStore()


let windowWidth = ref(window.innerWidth) // Current window width
const activeNavBar = ref < NavBarItem['name'] > ()
const isMoreModalOpen = ref(true)

const menuItems: NavBarItem[] = [{
        title: 'Home',
        path: '/home',
        name: 'home',
        customClass: '',
        iconSvgName: 'home',
        onClick: () => {}
    },
    {
        title: 'Search',
        path: '/',
        name: 'search',
        customClass: '',
        iconSvgName: 'search',
        onClick: () => router.push('/search')
    },
    {
        title: 'Explore',
        path: '/explore',
        name: 'explore',
        customClass: '',
        iconSvgName: 'explore',
        onClick: () => {}
    },
    {
        title: 'Reels',
        path: '/reels',
        name: 'reels',
        customClass: '',
        iconSvgName: 'reels',
        onClick: () => {}
    },
    {
        title: 'Messages',
        path: '/direct',
        name: 'direct',
        customClass: '',
        iconSvgName: 'direct',
        onClick: () => {}
    },
    {
        title: 'Notifications',
        path: '/notifications',
        name: 'notifications',
        customClass: '',
        iconSvgName: 'notifications',
        onClick: () => {}
    },
    {
        title: 'Create',
        path: '/create',
        name: 'create',
        customClass: '',
        iconSvgName: 'create',
        onClick: () => triggerPhotoModal()
    },
    {
        title: 'Profile',
        path: '/BrainFuckUser?isSelf=1',//TODO: Remove, only for demo.
        name: 'profile',
        customClass: '',
        iconSvgName: '',
        img: 'https://avatars.githubusercontent.com/u/83784102?v=4',
        onClick: () => {}
    }
]


const settings = [{
        name: 'Settings',
        iconSvgName: 'fa-solid fa-gear',
        action: () => router.push('/settings')
    },
    {
        name: 'Your activity',
        iconSvgName: 'fa-solid fa-clock-rotate-left',
        action: () => router.push('/settings')
    },
    {
        name: 'Saved',
        iconSvgName: 'fa-regular fa-bookmark',
        action: () => {}
    },
    {
        name: 'Switch Appreance',
        iconSvgName: 'fa-solid fa-moon',
        action: () => {}
    },
    {
        name: 'Report a problem',
        iconSvgName: 'fa-solid fa-triangle-exclamation',
        action: () => router.push('/settings')
    },
    {
        name: 'Switch accounts',
        iconSvgName: 'fa-solid fa-user-circle',
        action: () => {}
    },
    {
        name: 'Log Out',
        iconSvgName: 'fa-solid fa-sign-out',
        action: () => logout()
    }
]

// Routes with collapsed sidenavbar
const collapsedHiddenRoutes = ['direct']

// Methods
const toggleMoreModal = () => {
    isMoreModalOpen.value = !isMoreModalOpen.value
}

const logout = () => {
    // TODO: Add logout logic and make a universal logout function
    toast.success('Logout successful')
    //   Sleep for 2 seconds
    setTimeout(() => {
        router.push('/accounts/login')
    }, 2000)

}

// Computed
const routeName = computed(() => {
    return route.name ? route.name.toString() : ''
})

const isNavBarCollapsed = computed(() => {
    return collapsedHiddenRoutes.includes(routeName.value)
})

const updateActiveNavBar = (navBarTab: NavBarItem['name']) => {
    activeNavBar.value = navBarTab
}

/**
 * Trigger photo modal
 */
const triggerPhotoModal = () => {
	onOpenPhotoModal()
    // photoModal.value.isToggled = !photoModal.value.isToggled
}


const onOpenPhotoModal = () => {
	modalStoreManager.toggleModal(ModalName.PHOTO)
}


const isToggledClass = computed(() => {
    return modalStoreManager.isAnyModalOpen ? 'lights-off' : ''
})

onMounted(() => {
	updateActiveNavBar(routeName.value)
})
</script>