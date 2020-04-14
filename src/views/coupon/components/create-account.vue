<template>
    <Modal mask-closable scrollable title="生成卡券"
           :width="500" v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
              
            <FormItem prop="status" label="ID">
                        <!-- <Select clearable placeholder="填写ID" v-model="params.unit" style="width:100px"  filterable>
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select> -->
                        <InputNumber  disabled="disabled" :value='memberId'></InputNumber>
            </FormItem>
            <FormItem prop="status" label="">
                        <Select clearable placeholder="选择套餐" v-model="params.unit" style="width:100px" >
                            <Option value="90">7天套餐</Option>
                            <Option value="95">15天套餐</Option>
                            <Option value="101">包月套餐</Option>
                            <Option value="102">季度套餐</Option>
                            <Option value="103">半年套餐</Option>
                            <Option value="104">全年套餐</Option>
                            <Option value="201">高速包月</Option>
                            <Option value="202">高速季度</Option>
                            <Option value="203">高速半年</Option>
                            <Option value="204">高速全年</Option>
                        </Select>
            </FormItem>
            <FormItem  label="">
                <InputNumber
                    :max="1000"
                    :min="0"
                    v-model="number"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
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
        name: 'CreateAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            comboList : {
                
            },
            memberId:''
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
        methods: {
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return

                this.isSubmit = true
                try {
                     const memberId = this.memberId
                     const number = this.number
                     const goodsId = this.params.unit
                     const cardType = 1
    
                    const {code,message} = await api.coupon.create({
                       memberId,number,goodsId,cardType
                    })

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('on-refresh')
                    this.$Message.success('添加成功')
                } catch (e) {
                    this.isSubmit = false
                    // this.$Message.error(e.message)
                    
                    this.$emit('on-refresh')
                }
            },
            // addTime(){
                
            //      const proxyId = this.proxyId
            //      const number = this.number
            //      const goodsId = this.params.unit
            //      const cardType = 1

            //     const abc = api.coupon.create({
            //        proxyId,number,goodsId,cardType
            //     })
            //     this.$emit('on-refresh')
            // },
        },
        mounted (){
             this.couponID =  JSON.parse(window.localStorage.getItem("user")).id
        },

        data () {
            return {
                shareList:{
                    month : 0,
                    quarter : 0,
                    half : 0,
                    year : 0
                },
                show: this.value,
                couponID:1,
                params: {
                    members_id : '' ,
                    admin_id : '' ,
                    add_time : '' ,
                    unit:'',
                },
                number:0,
                rules: {
                    add_time: [
                        { required: true, message: '请输入数值', trigger: 'change blur' },
                    ]
                },
                isSubmit: false,
                cityList: [
                    {
                        value: 10001,
                        label: '代理甲'
                    },
                    {
                        value: 10002,
                        label: '代理乙'
                    },
                    {
                        value: 10003,
                        label: '代理丙'
                    },
                ]
            }
        },
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .agent.ivu-form-item {

        .ivu-form-item-label {
            padding-top: 5px;
        }
    }
</style>
