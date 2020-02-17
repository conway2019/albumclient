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
            <el-form :inline="true" ref="user_form" :model="user" class="demo-form-inline">
                <el-form-item label="ID">
                    <el-input v-model="user.id" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="user.name" placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model.number="user.telephone" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="邮件">
                    <el-input v-model="user.mail" placeholder="请输入邮件"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </span>
        </el-dialog>

        <div align="right">
            <el-form :inline="true" :model="user" class="handle-box">
                <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="addUser">新增用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="users"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="telephone"
                    label="手机"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="mail"
                    label="邮件"
                    width="">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="editUser(scope.$index, scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="deleteUser(scope.$index, scope.row)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "UserManager",
        created() {
            fetch(this.url, {"type": "GET"})
                .then(res => res.json())
                .then(doc => this.users = doc)
        },
        data() {
            return {
                url: "http://idanao.top:3001/user",
                user: {id: '', name: '', password: '', telephone: '', mail: ''},
                users: [],
                idx: -1,
                dialogVisible: false
            }
        },
        methods: {
            addUser() {
                this.idx = -1;
                this.user = {id: '', name: '', password: '', telephone: '', mail: ''};
                this.dialogVisible = true;
            },
            editUser(index, row) {
                this.idx = index;
                this.user = row;
                this.dialogVisible = true;
            },
            saveUser() {
                this.dialogVisible = false;
                //新增
                if (this.idx == -1) {
                    fetch(this.url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.user)
                    }).then(res => res.json())
                      .then(doc => this.users.push(doc));
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
            deleteUser(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                      fetch(this.url + "/delete/", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(row)
                    }).then(()=>{
                       this.users.splice(index, 1);
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
