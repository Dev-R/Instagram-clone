<template>
    <div   
        :class="isToggledClass"
        class="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10 text-center">
        <div 
            class="flex flex-col w-full max-w-4xl flex-nowrap space-y-4 
            pt-2 md:pt-0 justify-self-end lg:mr-[64px]">
            
            <ProfileHeader 
                @open-modal="toggleStatsModal"
                :user="profile" />

            <ProfileTabBar 
                :current-tab="activeTab"
                @switch-tab="switchActiveTab" />

            <!-- TODO: Remove hard codded boolean -->
            <ProfileEmptyTabMessage 
                :current-active-tab="activeTab"
                :is-post-tab-empty="false"
                :is-saved-tab-empty="true"
                :is-peed-tab-empty="true"
                :is-tagged-tab-empty="true" />
            
            <PostCoverCard
                v-if="activeTab === ProfileTab.Posts && posts"
                :posts="posts" />

            <ProfileFooter />
        </div>
    </div>

    <StatsModal 
        :modal-size="ModalSize.Medium"
        :title="statsModal.title"
        :items="statsModal.stats" 
        :is-toggled="statsModal.type === ModalName.FOLLOW"
        @on-modal-closed="toggleStatsModal" />

    <ProfileSettingModal
        v-show="statsModal.type === ModalName.PROFILE_SETTING"
        @on-modal-closed="toggleStatsModal" />  
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted,
watch,
} from 'vue'

import { 
    useRoute 
} from 'vue-router'

import {
    SmallModal as StatsModal,
	ProfileHeader,
    ProfileTabBar,
    ProfileEmptyTabMessage,
    PostCoverCard,
    ProfileFooter,
    ProfileSettingModal
} from '@/components'

import {
    ProfileTab,
    ModalSize,
    ModalName,
    type NavBarTabs,
    type User,
    type PostCard as PostCardType
} from '@/common'

import { 
    useModalManagerStore 
} from '@/stores'

import {
    SampleGenerator
} from '@/data'

// Data
const profile = ref<User>(SampleGenerator.generateRandomUser())
const posts = ref<PostCardType[] | undefined>(profile.value.mediaItems)

// Services
const modalStoreManager = useModalManagerStore()
const route = useRoute()

const activeTab = ref<NavBarTabs>(ProfileTab.Posts) // Select profile-posts as default active tab
const statsModal = ref({
    title: '',
    type: '',
    stats: [] as any, // Stats i.e current followers, following data of the user
    isToggled: false
})


// Methods
/**
 * Switch between profile tabs
 * @param currentTab Current active tab
 */
const switchActiveTab = (currentTab: NavBarTabs) => {
    activeTab.value = currentTab
}

/**
 * Trigger small modal
 * @param name Modal name (i.e: Follow, Setting)
 * @param title Modal title 
 */
 const toggleStatsModal = ({
    modalTitle,
    modalType
}: {
    modalTitle ? : string,
    modalType ? : string
} = {}) => {
    modalStoreManager.toggleModal(ModalName.FOLLOW)
    statsModal.value = {
        title: modalTitle ? modalTitle : '',
        type: modalType ? modalType : '',
        isToggled: !statsModal.value.isToggled,
        stats: [profile]
    }
}

const isToggledClass = computed(() => {
    return statsModal.value.isToggled ? "lights-off" : ""
})

const createRandomProfile = () => {
    profile.value = SampleGenerator.generateRandomUser()
}

watch(() => route.path, (path) => {
    if (path === '/') {
        createRandomProfile()
        posts.value = profile.value.mediaItems
    }
})

onMounted(() => {
    createRandomProfile()
    // Only set username if it's available for DEMO
    if (route.params.username) {
        profile.value.userName = route.params.username as string
    }
    // posts.value = posts
})
</script>