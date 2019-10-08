<template>
    <div class="container not_found_container">
        找不到網頁喔，請點擊下方按鈕返回首頁：
        <app-btn
             type="link"
             :addClass="['small_link']"
             :linkTo="'/'">
             返回首頁
        </app-btn>
    </div>
</template>

<script>
export default {
    
}
</script>