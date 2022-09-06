<template>
    <div class="zx">
        <div class="zx_left">
            <img src="../../imgs/zx.png" alt="">
            <span> <slot></slot> </span>
        </div>
        <router-link :to="{path:url}">
            <img src="../../imgs/more.png" alt="">
        </router-link>

    </div>
</template>

<script>
    export default {
        name: "AisheTitle",
        props:{
            url:{
                type:String,
                required:true
            }
        }
    }
</script>

<style scoped>
    /* 咨询 */
    .zx{
        margin: 0.4rem 0;
        width: 6.91rem;
        height: 0.41rem;
        display: flex;
        justify-content: space-between;
    }
    .zx div img{
        width:0.12rem;
        height:0.41rem;
        margin-right: 0.1rem;
    }
    .zx_left{
        display: flex;
        align-items: center;
    }
    .zx img{
        width: 0.13rem;
        height: 0.23rem;
        justify-content: flex-end;
    }
    span{
        font-size: 0.32rem;
        font-weight: 500;
        color: #111223;
        line-height: 0.41rem;
    }

</style>
