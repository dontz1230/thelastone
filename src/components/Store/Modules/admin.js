/*eslint-disable*/
import Vue from 'vue';
import router from '../../../routes';

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyD83foBNfz-_Oe4Ua4LFSR2cbWUJ7ZPnuc";

const admin = {
    namespaced: true,
    state:{
        token:null,
        refresh:null,
        authFailed: false,
        addpost: false,
        imgUpload: null,
        adminPosts: null
    },
    getters:{
        isAuth(state){
            if(state.token) {
                return true
            } else {
                return false
            }
        },
        addPostStatus(state){
            return state.addpost
        },
        imgUploadUrl(state){
            return state.imgUpload
        },
        getAdminPostsGetters(state){
            return state.adminPosts
        }

    },
    mutations:{
        authUser(state, authData){
            state.token = authData.idToken
            state.refresh = authData.refreshToken

            if(authData.type === 'signin'){
                router.push('/dashboard');
            }
        },
        authFailed(state, type){
            if(type === 'reset'){
                state.authFailed = false
            } else {
                state.authFailed = true
            }
        },
        logoutUser(state){
            state.token = null;
            state.refresh = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            router.push('/');
        },
        changePostStatus(state){
            state.addpost = true
        },
        clearPostStatus(state){
            state.addpost = false
        },
        imgUpload(state, imgData){
            state.imgUpload = imgData.secure_url
        },
        clearImgUpload(state){
            state.imgUpload = null
        },
        getAdminPosts(state, posts){
            state.adminPosts = posts
        }
    },
    actions:{
        signIn({commit},payload){
            Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`,
            { ...payload,returnSecureToken: true })
            .then( res => res.json())
            .then( authData => 
                {
                    commit('authUser',{
                        ...authData,
                        type:'signin'
                    });
                    localStorage.setItem("token",authData.idToken)
                    localStorage.setItem("refresh",authData.refreshToken)
                })
            .catch( error => {
                commit("authFailed")
            })     
        },
        refreshToken({commit}){
            const refreshToken = localStorage.getItem("refresh");

            if(refreshToken){
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`,{
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then( res => res.json())
                .then( authData => {
                    commit("authUser",{
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token,
                        type:'refresh'
                    });
                    localStorage.setItem("token",authData.id_token)
                    localStorage.setItem("refresh",authData.refresh_token)
                }) 
            } else {
                console.log('cannot fresh token')
            }
        },
        addPost({ commit, state },payload){
            Vue.http.post(`posts.json?auth=${state.token}`,payload)
            .then( res => res.json() )
            .then( res => {
                //激發addpost屬性從false改成true
                commit("changePostStatus")
                setTimeout(()=>{
                    commit("clearPostStatus")
                },3000)
            })
        },
        imgUpload({commit},file){
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dontz3210/image/upload'
            const CLOUDINARY_PRESET = 's84oweuo'

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_PRESET)
            
            Vue.http.post(CLOUDINARY_URL,formData,{
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then( res => res.json())
            .then( res => 
                    commit("imgUpload", res)
                )
        },
        getAdminPosts({commit}){
            Vue.http.get('posts.json')
            .then( res => res.json())
            .then( res => {
                const posts = [];
                for(let key in res){
                    posts.push({
                        ...res[key],
                        id:key 
                    })
                }
                commit("getAdminPosts", posts.reverse())
                
            })
        },
        deletePost({commit,state},payload){
            Vue.http.delete(`posts/${payload}.json?auth=${state.token}`)
            .then( res => {
                let newPosts = [];
                state.adminPosts.forEach( post => {
                    if(post.id != payload){
                        newPosts.push(post)
                    }
                })
                commit("getAdminPosts", newPosts)
            })
        }
    }
}

export default admin;
