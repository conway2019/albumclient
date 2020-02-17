<template>
    <div id="app">
        <div id="nav">
            <router-link to="/album">专辑</router-link> |
            <router-link to="/singer">歌手</router-link> |
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
        name: "AlbumManager",
        created() {
            fetch(this.url, {"type": "GET"})
                .then(res => res.json())
                .then(album => this.albums = album)
        },
        data() {
            return {
                url: "http://localhost:3001/album",
                album: {id: '', name: '', author: '', age: '', introduction: '', songs: ''},
                albums: [],
                idx: -1,
                dialogVisible: false
            }
        },
        methods: {
            addAlbum() {
                this.idx = -1;
                this.album = {id: '', name: '', author: '', age: '', introduction: '', songs: ''};
                this.dialogVisible = true;
            },
            editAlbum(index, row) {
                this.idx = index;
                this.album = row;
                this.dialogVisible = true;
            },
            saveAlbum() {
                this.dialogVisible = false;
                //新增
                if (this.idx == -1) {
                    fetch(this.url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.album)
                    }).then(res => res.json())
                      .then(bk => this.albums.push(bk));
                    this.$message.success(`新增成功`);
                } else {//更新
                    fetch(this.url + "/update/", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.album)
                    });
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                }
            },
            deleteAlbum(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                      fetch(this.url + "/delete/", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(row)
                    }).then(()=>{
                       this.albums.splice(index, 1);
                    });

                    this.$message.success("删除" + row.id + "成功");
                }).catch(() => {});
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
