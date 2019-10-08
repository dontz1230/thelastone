<template>
    <div class="container dashboard_container">
        <div class="admin_nav">
            <ul>
                <li><router-link to="/dashboard/add_posts">新增貼文</router-link></li>
                <li><router-link to="/dashboard/posts_list">文章列表</router-link></li>
                 <li><router-link to="/dashboard">返回</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    
</template>

