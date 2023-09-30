<template>
    <div class="relative hidden md:block">
        <img src="@/assets/images/background-image-e.png" />
        <Transition name="fade">
            <img
                id="dynamic"
                :key="currentImage"
                class="absolute top-6 right-14"
                :src="currentImage" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { 
    ref, 
    computed,
    onMounted
} from 'vue'

// Background Images
import backgroundImageA from '@/assets/images/background-image-a.png'
import backgroundImageB from '@/assets/images/background-image-b.png'
import backgroundImageC from '@/assets/images/background-image-c.png'
import backgroundImageD from '@/assets/images/background-image-d.png'

// Images
const images = [
	backgroundImageA,
	backgroundImageB,
	backgroundImageC,
	backgroundImageD
]

const TIME_INTERVAL = 5000 // 5 seconds in milliseconds

let currentImageIndex = ref<number>(0)
const currentImage = computed(() => images[currentImageIndex.value])

const changeImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
}

onMounted(() => {
    setInterval(changeImage, TIME_INTERVAL); // Change image every N seconds
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>