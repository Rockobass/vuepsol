<template>
    <div>
        <el-form ref="RegisterForm" :model="form" label-width="80px" class="fm" :rules="rules" label-position="left">
            <el-form-item label="登录名" prop="username">
                <el-input v-model="form.username" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" prop="password">
                <el-input v-model="form.password" size="medium" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" prop="password1">
                <el-input v-model="form.password1" size="medium" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="form.name" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
                <el-input v-model="form.idNumber" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="telephone">
                <el-input v-model="form.telephone" size="medium"></el-input>
            </el-form-item>
            <el-button size="normal" type="primary" style="width: 100%;" @click="regist">注册</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            var checkUsername = (rule, value, callback) => {
                this.postRequest('/api/register/ck1', this.$qs.stringify({username: value})).then(resp => {
                    if (value === '')
                        callback(new Error('登录名不能为空'));
                    else if (resp.status === 500) {
                        callback(new Error(resp.msg))
                    } else {
                        callback()
                    }
                })
            };
            var ckPass = (rule, value, callback) => {
                if (value === '')
                    callback(new Error('请输入密码'))
                else
                    callback()
            };
            var ckPass1 = (rule, value, callback) => {
                if (value !== this.form.password)
                    callback(new Error('两次密码输入不一致'))
                else callback()
            };
            var checkID = (rule, value, callback) => {
                this.postRequest('/api/register/ck2', this.$qs.stringify({idNumber: value})).then(resp => {
                    if (value === '')
                        callback(new Error('请输入身份证号'));
                    else if (resp.status === 500) {
                        callback(new Error(resp.msg))
                    } else {
                        callback()
                    }
                })
            };
            var checkPhone = (rule, value, callback) => {
                this.postRequest('/api/register/ck3', this.$qs.stringify({telephone: value})).then(resp => {
                    if (value === '')
                        callback(new Error('请输入手机号'));
                    else if (resp.status === 500) {
                        callback(new Error(resp.msg))
                    } else {
                        callback()
                    }
                })
            };
            return {
                form: {
                    username: '',
                    password: '',
                    password1:'',
                    nickname: '',
                    name: '',
                    idNumber: '',
                    telephone: ''
                },
                rules: {
                    username: [{validator: checkUsername, trigger: 'blur'}],
                    password: [{validator: ckPass, trigger: 'blur'}],
                    password1: [{validator: ckPass1, trigger: 'blur'}],
                    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
                    name: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
                    idNumber: [{validator: checkID, trigger: 'blur'}],
                    telephone: [{validator: checkPhone, trigger: 'blur'}],
                }
            }
        },
        methods: {
            regist() {
                this.$refs.RegisterForm.validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.postRequest('/api/register/do', this.$qs.stringify(this.form)).then(resp => {
                            if (resp) {
                                this.$router.replace('/login');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .fm {
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        border-radius: 15px;
        background-clip: padding-box;
        width: 480px;
        margin: 180px auto;
    }

    .el-form-item {
        width: 300px;
    }
</style>