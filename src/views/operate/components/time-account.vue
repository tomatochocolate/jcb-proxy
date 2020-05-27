<template>
    <Modal mask-closable scrollable title="修改时长"
           :width="500" v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
             <FormItem prop="add_time" label="修改时长">
                        <Input clearable type="text" placeholder="" :maxlength="11" v-model="params.add_time"  @on-enter="handleSubmitForm" style="width:200px"/>
                      
            </FormItem>
           
            <FormItem prop="status" label="">
                        <Select clearable placeholder="时长单位" v-model="params.unit" style="width:100px" >
                            <Option value="1">分</Option>
                            <Option value="2">时</Option>
                            <Option value="3">日</Option>
                            <Option value="4">月</Option>
                        </Select>
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
        name: 'TimeAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            mID : {
                
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
            async addTime(){
                if (!await this.$refs.form.validate() || this.isSubmit) return
                this.isSubmit = true
                try {
                    var members_id = this.mID ;
                    const admin_id = this.params.admin_id;
                    const add_time = this.params.add_time ;
                    const unit = this.params.unit ;

                    const {code,msg}= await api.user.timer({
                        members_id  ,admin_id ,add_time ,unit 
                    })
                        console.log(code);

                        this.isSubmit = false
                        if (code != 0) {
                            this.$Message.error(msg)
                            return
                        }
                        this.show = false
                        this.$emit('on-refresh')
                        this.$Message.success('添加成功')
                    } catch (e) {
                        this.isSubmit = false
                        // this.$Message.error(e.message)
                    }
                
            },
        },

        data () {
            return {
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
