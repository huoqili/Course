<template>
    <div>
        <div>
            <el-button type="primary">
                <router-link :to="{name:'chapterquery',query:{cid:$route.query.cid}}">查看</router-link>
            </el-button>
            <el-button type="primary">
                <router-link :to="{name:'chapterinsert',query: {cid:$route.query.cid}}">添加</router-link>
            </el-button>


        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    a{
        color: white;
    }
</style>
