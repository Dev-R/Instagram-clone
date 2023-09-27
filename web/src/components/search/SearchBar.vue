<template>
    <div class="flex justify-end items-center relative p-1">
        <TheInput 
            :value="modalValue" 
            @keyup="emitSearchQuery"
            placeholder="Search..."
            class="!rounded-lg !bg-[#262626] \
            border-1 focus:bg-black border !border-slate-800 !text-white text-sm \
            focus:flex-1 focus:pr-12 max-h-12 !py-3 w-full" />
            
        <div role="status" class="absolute">

            <LoadingSpinner
                v-if="isSearchLoading"
                :is-loading="true" />

            <i v-else 
                class="hover:cursor-pointer fa-solid fa-xmark rounded-full 
                text-white w-4 h-4 mr-4">
            </i>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    TheInput,
    LoadingSpinner
} from '@/components'

defineProps({
    modalValue: {
        type: String as () => string | number | string[] | undefined,
        default: undefined
    },
    isSearchLoading: {
        type: Boolean as () => boolean | undefined,
        default: false
    }
})

const emit = defineEmits([
    'onSearchQuery'
])

/**
 * Emit search query
 */
const emitSearchQuery = (payload: KeyboardEvent) => {
    emit("onSearchQuery", payload)
}


</script>