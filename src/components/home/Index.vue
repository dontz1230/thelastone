<template>
    <div>
        <my-carousel></my-carousel>
        <my-content></my-content>
    </div>
</template>

<script>
import myCarousel from './Carousel.vue'
import myContent from './Content.vue'

export default {
    components:{
        myCarousel,
        myContent
    }
}
</script>