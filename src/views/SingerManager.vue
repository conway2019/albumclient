<template>
    <div id="app">
    <div id="nav">
        <router-link to="/album">专辑管理</router-link> |
        <router-link to="/singer">歌手管理</router-link> |
        <router-link to="/user">用户管理</router-link>
        (管理员)
    </div>
    <router-view/>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form :inline="true" ref="singer_form" :model="singer" class="demo-form-inline">
                <el-form-item label="ID">
                    <el-input v-model="singer.id" placeholder="请输入歌手ID"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                    <el-input v-model="singer.name" placeholder="请输入歌手名称"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="singer.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model.number="singer.introduction" placeholder="请输入简介"></el-input>
                </el-form-item>
                <el-form-item label="歌曲">
                    <el-input v-model="singer.songs" placeholder="请输入歌曲，用逗号分隔"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSinger">确 定</el-button>
            </span>
        </el-dialog>

        <div align="right">
            <el-form :inline="true" :model="singer" class="handle-box">
                <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addSinger">新增歌手</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="intData">数据初始化</el-button>
                </el-form-item>
            </el-form>
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
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="editSinger(scope.$index, scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="deleteSinger(scope.$index, scope.row)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SingerManager",
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
            initAlbum() {

            },
            addSinger() {
                this.idx = -1;
                this.singer = {id: '', name: '', age: '', introduction: '', songs: ''};
                this.dialogVisible = true;
            },
            editSinger(index, row) {
                this.idx = index;
                this.singer = row;
                this.dialogVisible = true;
            },
            saveSinger() {
                this.dialogVisible = false;
                //新增
                if (this.idx == -1) {
                    fetch(this.url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.singer)
                    }).then(res => res.json())
                      .then(doc => this.singers.push(doc));
                    this.$message.success(`新增成功`);
                } else {//更新
                    fetch(this.url + "/update/", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.singer)
                    });
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                }
            },
            deleteSinger(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                      fetch(this.url + "/delete/", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(row)
                    }).then(()=>{
                       this.singers.splice(index, 1);
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
