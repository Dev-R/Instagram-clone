<template>
	<div class="bg-black">
		<section 
			class="container max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900">
			<div class="grid grid-cols-12">
				<!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
                                        <NavBarMain />
                    
                </div>

                <div class="md:col-span-3 col-span-12 md:col-start-6 self-center
                     overflow-auto scrollbar scrollbar-none">
                    <swiper
                        :direction="'vertical'"
                        :slidesPerView="1.15"
                        :centeredSlides="true"
                        :spaceBetween="15"
                        :loop="true"
                        :mousewheel="true"
                        :pagination="{
                            clickable: false,
                            bulletClass: 'hidden'   
                        }"
                        :class="'h-screen rounded-lg'"
                        
                        :modules="modules">

                        <swiper-slide>
                            <img src="https://loremflickr.com/1024/1080/car" class="h-full rounded"/>
                        </swiper-slide>

                        <swiper-slide>
                            <img src="https://loremflickr.com/1024/1080/cat" class="h-full rounded"/>
                        </swiper-slide>

                        <swiper-slide>
                            <img src="https://loremflickr.com/1024/1080/dog" class="h-full rounded"/>
                        </swiper-slide>

                        <swiper-slide>
                            <img src="https://loremflickr.com/1024/1080/love" class="h-full rounded"/>
                        </swiper-slide>

                    </swiper>
                </div>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel, Pagination } from 'swiper';

import { NavBarMain } from '@/components'
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: "Reels",
    setup() {
        const onSwiper = (swiper: any) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        onMounted(() => {
            console.log("Mounted Reels");
        });
        return {
            modules: [Mousewheel, Pagination],
            onSlideChange,
            onSwiper
        };
    },
    components: { 
        NavBarMain,
        Swiper,
        SwiperSlide
    }
})
</script>

<style>
</style>