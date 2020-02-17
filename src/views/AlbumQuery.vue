<template>
    <div id="app">
        <div id="nav">
            <router-link to="/albumQuery">专辑</router-link> |
            <router-link to="/singerQuery">歌手</router-link> |
            (发烧友)
        </div>
        <router-view/>

        <el-table
                :data="albums"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="专辑"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="发表时间"
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
        name: "AlbumQuery",
        created() {
            fetch(this.url, {"type": "GET"})
                .then(res => res.json())
                .then(album => this.albums = album)
        },
        data() {
            return {
                url: "http://idanao.top:3001/album",
                album: {id: '', name: '', author: '', age: '', introduction: '', songs: ''},
                albums: [],
                idx: -1,
                dialogVisible: false
            }
        },
        methods: {
            queryAlbum() {
            },
            collectAlbum() {
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
