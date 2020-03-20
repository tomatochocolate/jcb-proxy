<template>
    <Modal mask-closable scrollable title="补充代理商账号"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
            <FormItem prop="proxyId" label="代理商ID">
                <Input clearable type="text" placeholder="请输入代理商ID" v-model="params.proxyId" @on-enter="supplement"/>
            </FormItem>
            <FormItem prop="account" label="管理员账号">
                <Input clearable type="text" placeholder="请输入管理员账号" v-model="params.account" />
            </FormItem> 
            <FormItem prop="password" label="密码">
                <Input clearable type="text" placeholder="请输入密码" v-model="params.password" />
            </FormItem>                        
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="supplement">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

    export default {
        name: 'modifyAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods:{
            async supplement () {
                if (!await this.$refs.form.validate() || this.isSubmit) return
                
                this.isSubmit = true
                try {
                    
                    const { code, message } = await api.admin.proxysupplement(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('on-refresh')
                    this.$emit('fatherMethod');
                    this.$Message.success('添加成功')
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
                    proxyId: '',
                    account: '',
                    password: '',
                },
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
                    proxyId
                    : { required: true, message: '请选择代理商', trigger: 'change blur' }
                },

                isSubmit: false
            }
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
