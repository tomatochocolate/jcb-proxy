<template>
    <Modal mask-closable scrollable title="分配代理卡券余额"
           :width="500" :loading="isSubmit"
           :closable="false"
           v-model="tableAccountModal">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
              
            <FormItem prop="status" label="">
                        <!-- <Select clearable placeholder="填写ID" v-model="params.proxyId" style="width:100px"  filterable>
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select> -->
             <Input clearable type="text" placeholder="请填写代理ID" :maxlength="32" v-model="params.proxyId" style="width: 100px" />           
            </FormItem>
            <FormItem  label="月套餐">
                <InputNumber
                    :max="comboList[0].balance"
                    :min="0"
                    v-model="params.monthNum"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
                <InputNumber  disabled="disabled" :value='comboList[0].balance'style="margin-left:100px"></InputNumber>
            </FormItem>
            <FormItem  label="季度套餐">
                <InputNumber
                    :max="comboList[1].balance"
                    :min="0"
                    v-model="params.seasonNum"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
                <InputNumber  disabled="disabled" :value='comboList[1].balance'style="margin-left:100px"></InputNumber>
            </FormItem>
            <FormItem  label="半年套餐">
                <InputNumber
                    :max="comboList[2].balance"
                    :min="0"
                    v-model="params.halfYearNum"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
                <InputNumber  disabled="disabled" :value='comboList[2].balance'style="margin-left:100px"></InputNumber>
            </FormItem>
            <FormItem  label="全年套餐">
                <InputNumber
                    :max="comboList[3].balance"
                    :min="0"
                    v-model="params.yearNum"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
                <InputNumber  disabled="disabled" :value='comboList[3].balance'style="margin-left:100px"></InputNumber>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" @click="showChange">取消</Button>
            <Button type="primary" @click="coupon">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

    export default {
        name: 'TableExpand',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            comboList : {
                
            },
            tableAccountModal:{}
        },
        watch: {
            show (value) {
                
                // if (!value) this.$refs.form.resetFields()
                // this.$emit('input', value)
                // this.showChange()
                
            },
            value (value) {
                // this.show = value
                
            }
        },
        methods:{
            showChange(){
                this.$emit('on-refresh')
            },
            async coupon () {
                if (!await this.$refs.form.validate() || this.isSubmit) return
                
                this.isSubmit = true
                try {
                    
                    const { code, message } = await api.agent.planCNum(this.params)

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
                show: true,
                params: {
                    proxyId: '',
                    adminId:'',
                    monthNum:0,
                    seasonNum:0,
                    halfYearNum:0,
                    yearNum:0,
                },
                cityList: [
                    {
                        value: 2,
                        label: '代理甲'
                    },
                    {
                        value: 5,
                        label: '代理乙'
                    },
                    {
                        value: 6,
                        label: '代理丙'
                    },
                ],
                shareList:{
                    month : 0,
                    quarter : 0,
                    half : 0,
                    year : 0
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
