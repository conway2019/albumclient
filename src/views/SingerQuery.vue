<template>
    <div id="app">
    <div id="nav">
        <router-link to="/albumQuery">专辑</router-link> |
        <router-link to="/singerQuery">歌手</router-link> |
        (发烧友)
    </div>

        <el-table
                :data="singers"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="歌手"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="introduction"
                    label="简介"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="songs"
                    label="歌曲"
                    width="">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SingerQuery",
        created() {
            fetch(this.url, {"type": "GET"})
                .then(res => res.json())
                .then(singer => this.singers = singer)
        },
        data() {
            return {
                url: "http://idanao.top:3001/singer",
                singer: {id: '', name: '', age: '', introduction: '', songs: ''},
                singers: [],
                idx: -1,
                dialogVisible: false
            }
        },
        methods: {
            querySinger() {
            },
            collectSinger() {
            }
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
