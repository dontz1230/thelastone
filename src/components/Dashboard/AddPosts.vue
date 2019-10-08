<template>
    <div class="dashboard_form">
        <h1>新增文章</h1>
        <form @submit.prevent="postSubmit">

            <div v-if="imgUpload">
                <img :src="imgUpload">
            </div>

            <div class="input_field">
                <input type="file" 
                       @change="processFile($event)"
                       ref="myImgInput"
                >
            </div>

            <!-- 標題 -->
            <div class="input_field"
                 :class="{ invalid : $v.formdata.title.$error }">
                <label>標題</label>
                <input type="text" 
                       v-model="formdata.title"
                       @blur="$v.formdata.title.$touch()">
                <p class="error_label" v-if="$v.formdata.title.$error">
                標題為必填欄位
                </p>
            </div>

            <!-- 簡述 -->
            <div class="input_field"
                 :class="{ invalid : $v.formdata.desc.$error }">
                <label>簡述</label>
                <input type="text" placeholder="簡述請小於40字"
                       v-model="formdata.desc"
                       @blur="$v.formdata.desc.$touch()">
                <p class="error_label" v-if="$v.formdata.desc.$error">
                簡述為必填欄位
                </p>
                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                簡述請小於20字
                </p>
            </div>

            <!-- wysiwyg -->
            <div class="input_field">
                <wysiwyg v-model="formdata.content"/>
            </div>

            <div class="input_field"
                 :class="{ invalid : $v.formdata.rating.$error}">
                <label>評分</label>
                <select v-model="formdata.rating"
                        @blur="$v.formdata.rating.$touch()">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <p class="error_label" v-if="$v.formdata.rating.$error">
                    一定要評分喔！
                </p>
            </div>

            <button type="submit">
                發布貼文
            </button>
            
        </form>

        <md-dialog :md-active.sync="mddialog">
            <md-dialog-title>您尚未輸入文章內容，確定要發布文章嗎？</md-dialog-title>
            <md-dialog-actions>
        <md-button class="md-primary" @click="dialogConfirm">確認發布</md-button>
        <md-button class="md-primary" @click="dialogCancel">取消發布</md-button>
      </md-dialog-actions>
        </md-dialog>

        <div v-if="addpost" class="post_succesfull">
            已發布文章
        </div>
    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { log } from 'util'

export default {
    data(){
        return {
            mddialog:false,
            formdata:{
                img:'',
                title:'',
                desc:'',
                content:'',
                rating:'',
            }
        }
    },
    validations:{
        formdata:{
            title:{
                required
            },
            desc:{
                required,
                maxLength:maxLength(40)
            },
            rating:{
                required
            }
        }
    },
    computed:{
        addpost(){
            let status = this.$store.getters['admin/addPostStatus'];
            if(status){
                this.clearPost();
                this.$store.commit('admin/clearImgUpload')
            }
            return status
        },
        imgUpload(){
            let imgUrl = this.$store.getters['admin/imgUploadUrl']
            this.formdata.img = imgUrl
            return imgUrl
        }
    },
    destroyed(){
        this.$store.commit('admin/clearImgUpload')
    },
    methods:{
        postSubmit(){
            if(!this.$v.$invalid){
                if(this.formdata.content === ''){
                    this.mddialog = true
                } else {
                    this.addPost()
                }
            } else {
                alert('請檢查內容是否正確')
            }
        },
        addPost(){
            this.$store.dispatch('admin/addPost', this.formdata)
        },
        clearPost(){
            //clear Vuelidate
            this.$v.$reset()
            //clear img
            this.$refs.myImgInput.value = ''
            //clear the form
            this.formdata = {
                title:'',
                desc:'',
                content:'',
                rating:'',
            }
        },
        dialogConfirm(){
            this.mddialog = false;
            this.addPost()
        },
        dialogCancel(){
            this.mddialog = false
        },
        processFile(e){
            let file = e.target.files[0];
            this.$store.dispatch('admin/imgUpload', file)
        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }

    button {
        cursor: pointer;
    }
</style>