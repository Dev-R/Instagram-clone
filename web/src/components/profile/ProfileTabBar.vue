<template>
	<div class="text-center border-t border-slate-1100">
		<ul 
			class="flex space-x-14 flex-wrap -mb-px 
            md:justify-center justify-between sm:px-6">
			<li 
				v-for="(tab, index) in tabElements" 
				:key="index" 
				class="sm:hover:cursor-pointer" 
				:class="{ 'md:hidden block' : tab.name === ProfileTab.Peeds }"
				@click="emitTabSwitch(tab.name as NavBarTabs)">
				<div 
					:class="getTabClass(tab.name)">
					<SVGLoader 
                        v-if="tab.iconLarge"
						:icon="tab.iconLarge" 
						:class="'md:block hidden'" />
					<SVGLoader 
                        v-else-if="tab.iconSmall"
						:icon="tab.iconSmall" 
						:class="'md:hidden block'" />
					<span class="text-xs subpixel-antialiased hidden md:block">
						{{ tab.label }}
					</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    SVGLoader
} from '@/components'

import {
    type NavBarTabs,
    type ProfileTabElement,
    ProfileTab,
} from '@/common'

const prop = defineProps({
    currentTab: {
        type: String as PropType<NavBarTabs>,
        required: true
    }
})
const emit = defineEmits(['switchTab'])


const tabElements: ProfileTabElement[] = [{
        name: ProfileTab.Posts,
        label: 'POSTS',
        iconLarge: 'profile-posts-large',
        iconSmall: 'profile-posts-small',
        action: () => emitTabSwitch(ProfileTab.Posts)
    },
    {
        name: ProfileTab.Peeds,
        label: 'PEEDS',
        iconSmall: 'profile-peed-small',
        action: () => emitTabSwitch(ProfileTab.Peeds)
    },
    {
        name: ProfileTab.Saved,
        label: 'SAVED',
        iconLarge: 'profile-saved-large',
        iconSmall: 'profile-saved-small',
        action: () => emitTabSwitch(ProfileTab.Saved)
    },
    {
        name: ProfileTab.Tagged,
        label: 'TAGGED',
        iconLarge: 'profile-tagged-large',
        iconSmall: 'profile-tagged-small',
        action: () => emitTabSwitch(ProfileTab.Tagged)
    },
]

const emitTabSwitch = (currentTab: NavBarTabs) => {
    emit('switchTab', currentTab)
}

/**
 * Return tab class based on current active tab
 * @param tabName Current tab name
 */
const getTabClass = (tabName: string) => {
    return {
        'flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300': true,
        'border-transparent text-gray-200': prop.currentTab !== tabName && tabName !==
            ProfileTab.Saved && tabName !== ProfileTab.Tagged,
        'border-transparent text-gray-300': prop.currentTab !== tabName && (tabName ===
            ProfileTab.Saved || tabName === ProfileTab.Tagged),
        'text-white': prop.currentTab === tabName,
        'sm:hover:text-gray-300': prop.currentTab !== tabName && (tabName === ProfileTab.Saved ||
            tabName === ProfileTab.Tagged),
    }
}
</script>