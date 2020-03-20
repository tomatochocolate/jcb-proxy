<template>
    <Modal mask-closable scrollable title="卡券数量分配"
           :width="500" v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
              
            <FormItem prop="status" label="">
                        <Select clearable placeholder="填写ID" v-model="params.unit" style="width:100px"  filterable>
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
            </FormItem>
            <FormItem  label="月套餐">
                <InputNumber
                    :max="comboList.month"
                    :min="0"
                    v-model="shareList.month"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="季度套餐">
                <InputNumber
                    :max="comboList.quarter"
                    :min="0"
                    v-model="shareList.quarter"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="半年套餐">
                <InputNumber
                    :max="comboList.half"
                    :min="0"
                    v-model="shareList.half"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="全年套餐">
                <InputNumber
                    :max="comboList.year"
                    :min="0"
                    v-model="shareList.year"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>

        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="addTime">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

    export default {
        name: 'CouponAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            comboList : {
                
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
        methods: {
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return

                this.isSubmit = true
                try {
                    const { code, message } = await api.user.timer(this.params)

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
                    this.$Message.error(e.message)
                }
            },
            addTime(){
                
                 var members_id = this.mID ;
                 const admin_id = this.params.admin_id;
                 const add_time = this.params.add_time ;
                 const unit = this.params.unit ;
                
                const abc = api.user.timer({
                    members_id  ,admin_id ,add_time ,unit 
                })
            },
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
                params: {
                    members_id : '' ,
                    admin_id : 1 ,
                    add_time : '' ,
                    unit:'',
                },
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
