/* eslint-disable */
import Vue from 'vue';

const posts = {
    namespaced: true,
    state:{
        homePosts:null,
        post:null
        //當剛載入的時候，homePosts為null
        //直到我們執行getAllPosts actions
    },
    getters:{
        getAllPostsGetters(state){
            return state.homePosts
        },
        getPostGetters(state){
            return state.post
        }
    },
    mutations:{
        getAllPostsMu(state,posts){
            state.homePosts = posts
        },
        getPostMu(state, onePost){
            state.post = onePost
        },
        clearPost(state){
            state.post = null
        }
    },
    actions:{
        getAllPosts({commit},payload){
            Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
            .then( res => res.json())
            .then( res => {
                const postList = [];
                for(let key in res){
                    postList.push({
                        ...res[key],
                        id:key
                    })
                }
                commit('getAllPostsMu', postList.reverse())
        })
    },
    getPost({commit},payload){
        Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
        .then( res => res.json())
        .then( res => {
            
            let onePost = {}
            for(let key in res){
                onePost = {
                    ...res[key]
                }
            }
            commit("getPostMu", onePost)
        }
            )
    }
}
}

export default posts;