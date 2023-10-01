<template>
	<div class="bg-black">
		<section 
			class="container text-center md:max-w-full mx-auto sm:h-screen scrollbar scrollbar-thumb-gray-900 z-0"
			:class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="flex">
				<div 
					class="basis-1/6 md:block hidden space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>
                
				<div class="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10">
					<div 
						class="flex flex-col md:w-[935px] flex-nowrap space-y-4 
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
			</div>
		</section>

		<StatsModal 
			:modal-size="ModalSize.Medium"
			:title="statsModal.title"
			:items="statsModal.stats" 
			:is-toggled="statsModal.type === ModalName.FOLLOW"
			@on-modal-closed="toggleStatsModal" />

        <ProfileSettingModal
            v-show="statsModal.type === ModalName.PROFILE_SETTING"
            @on-modal-closed="toggleStatsModal" />
	</div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    NavBarMain,
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
    SampleGenerator
} from '@/data'

// Data
const profile = ref<User>(SampleGenerator.generateRandomUser())
const posts = ref<PostCardType[] | undefined>(profile.value.mediaItems)

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
    statsModal.value = {
        title: modalTitle ? modalTitle : '',
        type: modalType ? modalType : '',
        isToggled: !statsModal.value.isToggled,
        stats: [profile]
    }
}

/**
 * Return true if any modal is toggled
 */
const isModalToggled = computed(() => {
    return statsModal.value.isToggled
})
</script>