<template>
    <Modal mask-closable scrollable title="修改密码"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>

            <FormItem prop="password" label="密码">
                <Input clearable type="password" placeholder="请输入密码（6~16位）" :maxlength="16" v-model="params.password" @on-enter="handleSubmitForm" />
            </FormItem>
            <FormItem prop="confirm" label="确定密码">
                <Input clearable type="password" placeholder="请输入密码（6~16位）" :maxlength="16" v-model="confirmPassword" @on-enter="handleSubmitForm" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="handleSubmitForm">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

    export default {
        name: 'AddAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                if (!value) this.$refs.form.resetFields()
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods:{
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return
                if(this.params.password != this.confirmPassword){
                    this.$Message.error('密码前后不一致')
                    return
                    }
                this.isSubmit = true
                try {
                    
                    const { code, message } = await api.admin.modifyPassword(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('change')
                    this.$Message.success('修改密码成功')
                } catch (e) {
                    this.isSubmit = false
                    this.$Message.error(e.message)
                }
            },
        },

        data () {
            return {
                show: this.value,
                params: {
                    // account: '',
                    password: '',
                    // confirmPassword:'',
                    // proxyName: '',
                    // channelCode:'',
                    adminId:''
                },
                confirmPassword:'',
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change blur' },
                        { pattern: phone, message: '请输入正确的手机号码' }
                    ],
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'change blur' },
                        { min: 2, message: '用户名最少2位字符' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { min: 6, max: 16, message: '请输入6~16位的密码' }
                    ],
                    confirmPassword: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { max: 16, message: '请输入6~16位的密码' }
                    ],
                },

                isSubmit: false
            }
        },
        mounted(){
            this.params.adminId = JSON.parse(window.localStorage.getItem("user")).id
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .agent.ivu-form-item {

        .ivu-form-item-label {
            padding-top: 5px;
        }
    }
</style>
