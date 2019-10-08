<template>
    <div>
        <carousel  :per-page="1" :mouse-drag="true" :autoplay="true"
                    >
            <slide v-for="(slide,index) in slides" :key="index">
                <div class="slider_bck"
                     :style="{ 'background': `url(${slide.bg})` }">
                     <div class="gradient">
                         <div class="container">
                             <div class="content">

                                 <app-btn
                                    type="link"
                                    linkTo="#"
                                    :addClass="['helo','asd']"
                                    :newStyle="{'color':'yellow'}"
                                 >
                                 See Review
                                 </app-btn>

                                 <div class="item">
                                     {{ slide.title }}
                                 </div>
                                 
                             </div>
                         </div>
                     </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Slide01 from '../../assets/images/featured/1.jpg';
import Slide02 from '../../assets/images/featured/2.jpg';
import Slide03 from '../../assets/images/featured/3.jpg';
import Slide04 from '../../assets/images/featured/4.jpg';

export default {
    data(){
        return {
            slides:[
            {
                title: 'AD01',
                bg:Slide01
            },
            {
                title: 'AD02',
                bg:Slide02
            },
            {
                title: 'AD03',
                bg:Slide03
            },
            {
                title: 'AD04',
                bg:Slide04
            }
            
        ]
        }
    },
    methods:{
        action(){
            alert('hey!');
        }
    },
    components: {
        Carousel,
        Slide
  }
}
</script>