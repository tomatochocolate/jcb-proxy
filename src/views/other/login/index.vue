<template>
    <Row type="flex" align="middle" justify="center">
        <Col :xs="20" :sm="20" :md="8" :lg="5">
            <h1 class="title"><span>管理员登录</span></h1>
            <Form ref="form" :model="params" :rules="rules" @keydown.enter.native="validate">
                <FormItem prop="account">
                    <Input v-model="params.account" :maxlength="16" placeholder="账号" size="large">
                        <span slot="prepend"><Icon :size="24" type="md-person" /></span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="params.password" :maxlength="16" placeholder="密码" size="large">
                        <span slot="prepend"><Icon :size="24" type="ios-lock"/></span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary" size="large" :loading="isSubmit" @click="validate">登录</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script type="text/babel">
    import { system } from '@/api'

    export default {
        name: 'Login',
        methods: {
            async validate () {
                if (this.isSubmit) return
                if (!await this.$refs.form.validate()) return

                this.isSubmit = true
                try {
                    
                    const { account, code,token,memberId } = await system.login(this.params)
                    console.log(account);
                    
                    this.isSubmit = false
                    if (code !== 0) {
                        var message = '登录失败,账号不存在,或密码错误,或被禁用'
                        this.$Message.error(message)
                        await this.captcha()
                        return
                    }
                    this.$store.dispatch('app/login', {
                        user: {
                            id: account,
                            username: account,
                            loginAccount: account,
                            memberId:memberId
                        },
                        token: token
                    })
                    this.$Message.success('登录成功')
                    this.$router.replace({ name: 'home' })
                } catch (e) {
                    this.isSubmit = false
                }
            }
        },
        data () {
            return {
                params: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: { required: true, message: '请输入用户名', trigger: 'change blur' },
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' }
                    ]
                },
                isSubmit: false
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .ivu-row-flex {
        width: 100%;
        height: 100%;
        background-image: url('./img/bg.svg');
        background-color: #f7f7f7;
    }
    .title {
        font-size: 28px;
        text-align: center;
        font-weight: 600;
        line-height: 1;
        padding-bottom: 40px;

        span {
            padding-left: 40px;
            background-size: 35px;
            background-image: url(~@/assets/img/logo.png);
            background-repeat: no-repeat;
            background-position: left center;
        }
    }
</style>
