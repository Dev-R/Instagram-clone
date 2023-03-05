<template>
    <span :class="class">
        <i v-html="svg"/>
    </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/**
 * Props:
 * - icon: The name of the icon to render.
 * - src: The path to the directory containing the icon files. Defaults to an empty string.
 */
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        default: '',
    },
    class: {
        type: String,
        default: ''
    }
})

// Construct the file path for the icon
const path = props.src ? props.src : ''
const file = `${path}icon-${props.icon}`

// Import all SVG files in the icon directory
const modules = import.meta.glob('../../assets/icons/**/*.svg', {
    as: 'raw',
    eager: true,
})

// Compute the SVG content for the specified icon
const svg = computed(() => {
    console.log('Loaded.', `../../assets/icons/${file}.svg`)
    return modules[`../../assets/icons/${file}.svg`] ?? modules['../../assets/icons/icon-logo-cone.svg']
})
</script>