<template>
    <div class="bg-slate-1000">
        <div class="text-lg">This is SettingView</div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'

export default defineComponent({
    name: 'SettingView  ',
    setup() {
        onMounted(() => {
            // console.log('SettingView mounted')
        })

        return {}
    },
    components: {
        NavBarMain,
    },
})
</script>