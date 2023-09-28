<template>
    <SVGLoader 
        @click="openEmojiPicker"
        :icon="'emoji'" />
        
    <div 
        class="absolute bottom-12 right-0 z-50"
        :class="toggleDirectionClass()">
        <Transition>
            <EmojiPicker 
                v-show="isToggled"
                :native="false"
                :theme="'dark'"
                @select="emitSelectEmoji" />
        </Transition>
    </div>
</template>


<script setup lang="ts">
import { 
    ref 
} from 'vue'

import EmojiPicker from 'vue3-emoji-picker'

import {
    SVGLoader
} from '@/components'

import type  {
    Emoji
} from '@/common'

const prop = defineProps({
    toggleDirection: {
        type: String as () => 'left' | 'right',
        default: 'right'
    }
})
const emit = defineEmits(
    ['selectEmoji']
)

// Data
const isToggled = ref(false)

// Methods
const openEmojiPicker = () => {
    isToggled.value = !isToggled.value
}

const emitSelectEmoji = (emoji: Emoji) => {
    emit('selectEmoji', emoji)
}

const toggleDirectionClass = () => {
    return prop.toggleDirection === 'left' ? 'left-0' : 'right-0'
}
</script>