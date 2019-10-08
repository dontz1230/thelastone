<template>
    <div class="container post_container">
        <div class="top" v-if="onePost">
            <div class="post_header">
                <h1>{{ onePost.title }}</h1>
                <div class="post_img"
                     :style="{'background':`url(${onePost.img})`}">
                </div>
                <div class="post_content">
                    <div v-html="onePost.content"></div>
                </div>
                <div class="post_rating">
                    評分：<span>{{ onePost.rating }} / 5</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        onePost(){
            return this.$store.getters['posts/getPostGetters']
        }
    },
    created(){
        let id = this.$route.params.id;
        this.$store.dispatch('posts/getPost', id)
    },
    destroyed(){
        this.$store.commit('posts/clearPost')
    }
}
</script>