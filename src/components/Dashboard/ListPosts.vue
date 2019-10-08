<template>
    <div>
       
    <md-table>
      <md-table-row>
        <md-table-head>遊戲名稱</md-table-head>
        <md-table-head>遊戲簡介</md-table-head>
        <md-table-head>遊戲評分</md-table-head>
        <md-table-head>動作</md-table-head>
      </md-table-row>

      <md-table-row v-for="(post,index) in adminPosts" :key="index">
        <md-table-cell>{{ post.title }}</md-table-cell>
        <md-table-cell>{{ post.desc }}</md-table-cell>
        <md-table-cell>{{ post.rating }}</md-table-cell>
        <md-table-cell>
            <div class="post_delete"
                 @click="deletePost(post.id)">
                 刪除</div>
        </md-table-cell>
      </md-table-row>
    </md-table>

     <md-dialog-confirm
      :md-active.sync="confirmDelete"
      md-title=""
      md-content="你確定要<strong>刪除</strong>這篇文章嗎？ (文章刪除後不可復原)"
      md-confirm-text="是，我要刪除。"
      md-cancel-text="否，取消刪除。"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    </div>
</template>

<script>
export default {
    data(){
        return {
            confirmDelete: false,
            deleteItemId:''
        }
    },
    computed:{
        adminPosts(){
            let posts = this.$store.getters['admin/getAdminPostsGetters'];
            return posts;
        }
    },
    created(){
        this.$store.dispatch('admin/getAdminPosts')
    },
    methods:{
        deletePost(postId){
            this.deleteItemId = postId
            this.confirmDelete = true
        },
        onCancel(){
            this.deleteItemId = ''
            this.confirmDelete = false
        },
        onConfirm(){
            this.$store.dispatch('admin/deletePost', this.deleteItemId)
            this.confirmDelete = false
        }
    }
}
</script>

<style>
    .post_delete {
        cursor: pointer;
    }
</style>
