<template>
    <SVGLoader 
        @click="openEmojiPicker"
        :icon="'emoji'" />
        
    <div class="absolute bottom-12">
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

const emit = defineEmits(
    ['selectEmoji']
)

// Data
const isToggled = ref(false)

// Methods
const openEmojiPicker = () => {
    isToggled.value = !isToggled.value
}

const emitSelectEmoji = (emoji: object) => {
    emit('selectEmoji', emoji)
}

</script>