<template>
    <div>
        <el-form
                :rules="rules"
                ref="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">用户登录</h3>
            <el-form-item prop="username" label="登录名" class="tp">
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="tk">
                <router-link to="/login">忘记密码？</router-link>
            </el-form-item>
            <el-form-item prop="password" label="登陆密码">
                <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
            <el-form-item class="register">
                <router-link to="/register?redirect=/login">没有账户？ 立即注册</router-link>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                loginForm: {
                    username: 'user',
                    password: '123',
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postRequest('/api/doLogin', this.$qs.stringify(this.loginForm)).then(resp => {
                            this.loading = false;
                            if (resp) {
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                this.$store.state.user = JSON.parse(window.sessionStorage.getItem("user"))
                                let path = this.$route.query.redirect;
                                this.$router.replace((path === '/login' || path === undefined) ? '/home' : path);
                            }

                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .register {
        margin-top: 15px;
        padding-left: 190px;
        height: 10px;
    }

    .tk {
        height: 10px;
        padding-left: 260px;
    }
    .tp {
        height: 55px;
    }

</style>
