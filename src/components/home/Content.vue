<template>
        <div class="card-container">
            <md-card v-for="(post, index) in posts" :key="index">
                <md-card-media md-ratio="4:3">
                    <img :src="post.img">
                </md-card-media>
                <md-card-header>
                    <h2 class="md-title">{{ post.title }}</h2>
                    <div class="md-subhead">
                        <div>{{ post.desc }}</div>
                    </div>
                </md-card-header>
                <md-card-actions>
                    <app-btn 
                        type="link"
                        :linkTo="`/post/${post.id}`"
                        :addClass="['small_link',]">
                        查看更多
                    </app-btn>
                </md-card-actions>
            </md-card>

            <div class="load_more">
                <app-btn
                            type="btn"
                            :addClass="['small_link']"
                            :action="loadMore">
                            載入更多
                 </app-btn>
            </div>
        </div>
</template>


<script>
    //import posts from '../../assets/posts.js';
    export default {
        computed:{
            posts(){
                return this.$store.getters['posts/getAllPostsGetters']
            }
        },
        methods:{
            loadMore(){
              this.$store.dispatch('posts/getAllPosts',{
                limit: this.posts.length + 3
            })  
            }
        },
        created(){
            this.$store.dispatch('posts/getAllPosts',{
                limit: 3
            })
        }
    }
</script>
