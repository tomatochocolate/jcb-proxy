<template>
    <Modal mask-closable scrollable title="修改代理资料"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
            <!-- <FormItem prop="account" label="账号">
                <Input clearable type="text" placeholder="请输入账号" :maxlength="32" v-model="params.account" />
            </FormItem>
            <FormItem prop="password" label="密码">
                <Input clearable type="password" placeholder="请输入密码（6~16位）" :maxlength="16" v-model="params.password" />
            </FormItem> -->
            <!-- <FormItem prop="phone" label="手机号">
                <Input clearable type="text" placeholder="请输入手机号码" :maxlength="11" v-model="params.phone" />
            </FormItem> -->
            <FormItem prop="realname" label="代理名称">
                <Input clearable type="text" placeholder="请输真实姓名" v-model="params.realname" />
            </FormItem>
            <!-- <FormItem prop="realname" label="公司">
                <Input clearable type="text" placeholder="请输公司名称" v-model="params.company" />
            </FormItem>  -->
            <FormItem prop="realname" label="备注">
                <Input clearable type="text" placeholder="请输入备注" v-model="params.remark" />
            </FormItem>                        
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
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

        data () {
            return {
                show: this.value,
                params: {
                    phone: '',
                    account: '',
                    realname: '',
                    password: '',
                    agentId: '',
                    company:'',
                    remark:''
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
                    agentId: { required: true, message: '请选择代理商', trigger: 'change blur' }
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
