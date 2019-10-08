<template>
    <div class="container">
        <div class="signin_container">
            <h1>會員登入</h1>
            
            <form @submit.prevent="onSubmit">

                <div class="input_field"
                     :class="{ invalid : $v.formdata.email.$error }"
                     >
                    <label>帳號信箱</label>
                    <input type="email" 
                           v-model.trim="formdata.email"
                           @blur="$v.formdata.email.$touch()">

                    <div v-if="$v.formdata.email.$error">
                        <p v-if="!$v.formdata.email.required" class="error_label">
                            Email 為必填欄位
                        </p>
                        <p v-if="!$v.formdata.email.email" class="error_label">
                            請檢查 email 格式是否正確
                        </p>
                    </div>
                </div>

                <div class="input_field"
                     :class="{ invalid : $v.formdata.password.$error }"
                     >
                    <label>密碼</label>
                    <input type="password" 
                           v-model.trim="formdata.password"
                           @blur="$v.formdata.password.$touch()">

                     <div v-if="$v.formdata.password.$error">
                        <p v-if="!$v.formdata.password.required" class="error_label">
                            請輸入密碼
                        </p>
                        <p v-if="!$v.formdata.password.minLength" class="error_label">
                            請檢查密碼長度是否為 8 個字元
                        </p>
                    </div>
                </div>

                <button type="submit">Sign in</button>

                <p v-if="error" class="error_label">
                    請檢查上述欄位是否正確
                </p>
                <p v-if="authFailed" class="error_label">
                    請檢查上述欄位是否正確
                </p>

            </form>
        </div>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'


export default {
    
    data(){
        return {
            error:false,
            formdata:{
                email:'',
                password:'',
            }
        }
    },
    computed:{
        authFailed(){
            return this.$store.state.admin.authFailed
        }
    },
    destroyed(){
        this.$store.commit('admin/authFailed', 'reset')
    },
    validations:{
        formdata:{
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(8)
            }
        }
    },
    methods:{
        onSubmit(){
            if(!this.$v.$invalid){
                this.$store.dispatch('admin/signIn', this.formdata)
            } else {
                this.error = true;
                setTimeout(() =>{
                    this.error = false
                },2000)
            }  
        }
    }
}
</script>

<style scoped>
    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }

    button {
        cursor: pointer;
    }
</style>