<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="使用状态" v-model="filterParams.status">
                            <Option value="1">正常</Option>
                            <Option value="2">禁用</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="id"><Input clearable placeholder="卡号" v-model="filterParams.cardId" /></FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button type="info" @click="handleCreateAccountModal">生成卡券</Button>
                    </FormItem>
                </Col>
                <Col span="3" v-for="item,index in comboList" :key="item.goods_id"> 
                    <FormItem label="7天套餐">
                        <span slot="label">{{item.goodsName}}</span>
                        <InputNumber  disabled="disabled" :value='item.balance'></InputNumber>
                    </FormItem>
                </Col>
               
            </Row>
        </Form>
        <Table :data="list" :columns="columns" >
            <!-- <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEnable(row)">启用</Button>
                <Button type="error" size="small" @click="handleEnableNo(row)">禁用</Button>
            </template> -->
            <template slot-scope="{ row, index }" slot="status">
                {{row.status == 1?'正常':'禁用'}}
            </template>
            <template slot-scope="{ row, index }" slot="goodsId">
                {{goodsChoose(row.goodsId)}}
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

         <coupon-account v-model="couponAccountModal" @on-refresh="handleFilterQuery" :comboList='comboList'/>
         <create-account v-model="createAccountModal" @on-refresh="handleFilterQuery" :comboList='comboList' :memberId='memberId'/>

    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'
    import CouponAccount from './components/coupon-account'
    import CreateAccount from './components/create-account'
    // import { log } from 'util';

    export default {
        name: 'coupon',
        mixins: [ page ],
        components:{CouponAccount,CreateAccount},
        methods: {
            handleCouponAccountModal(){
                this.couponAccountModal = true
            },
            handleCreateAccountModal(){
                this.createAccountModal = true
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            handleEnable (row) {
                const adminId = JSON.parse(window.localStorage.getItem("user")).id
                const cardId = row.cardId
                const status = 1
                api.coupon.update({
                    adminId,status,cardId
                })
                this.handleFilterQuery ()
            },
            handleEnableNo (row) {
                const adminId = JSON.parse(window.localStorage.getItem("user")).id
                const cardId = row.cardId
                const status = 2
                api.coupon.update({
                    adminId,status,cardId
                })
                this.handleFilterQuery ()
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { status,cardId } = this.filterParams
                        
                        const memberId = JSON.parse(window.localStorage.getItem("user")).memberId
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        
                        const { count, cardRecords,proxyId } = await api.coupon.list({
                            pageNo, pageSize,status,cardId,memberId
                        })
                        
                        this.memberId = memberId
                        this.proxyId = proxyId
                        const { data,code } = await api.agent.queryCNum({
                            memberId
                        })
                        if (code == 200){
                            this.comboList = data.sort((a,b)=>{
                              return a.goods_id -  b.goods_id
                            });
                        }     
                        resolve({
                            data: cardRecords,
                            meta: {
                                total: count
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            goodsChoose(goodsId){
                if(goodsId == 101){
                    return '包月套餐'
                }else if (goodsId == 102){
                    return '季度套餐'
                }else if(goodsId == 103){
                    return '半年套餐'
                }else if (goodsId == 104){
                    return '全年套餐'
                }
                return '体验套餐'
            }
        },
        data () {
            return {
                 filterParams: {
                    cardId: '',
                    status: '',
                },
                comboList:[
                    {
	            		"balance":0,
	            		"goods_id":90
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":95
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":101
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":102
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":103
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":104
	            	}
	            ],
                proxyId:123,
                memberId:1,
                couponAccountModal:false,
                createAccountModal:false,
                columns: [
                    { title: '卡号', key: 'cardId', width: 200 },
                    // { title: '所属代理商', key: 'proxyId', width: 150, ellipsis: true, tooltip: true },
                    { title: '卡状态', slot: 'status', width: 160 },
                    { title: '套餐', slot: 'goodsId', width: 160 },
                    { title: '激活时间', key: 'timeAdd', width: 200 },
                    { title: '有效期', key: 'timeExpire', width: 200 },
                    { title: '卡密', key: 'cardSerial', minWidth: 100,align: 'center'},
                    // {slot: 'action',title: '操作',width: 150,align: 'center',fixed:'left'}
                    
                ],
                datePickerOptions: {
                    ...datePicker,
                    disabledDate (date) {
                        return dayjs().isBefore(date)
                    }
                }
            }
        },
        mounted () {
            this.getList()
            
            
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
     .ivu-form {
        margin-bottom: 10px;

        /deep/ {

            .btn-group {

                .ivu-btn {
                    /*width: 90px;*/
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .ivu-date-picker {
                display: block;
            }
            .ivu-col {
                padding-right: 10px;
                margin-bottom: 10px;

                @include media('<sm') {
                    &:nth-child(2n+0) {
                        padding-right: 0;
                    }
                }
                @include media('>sm', '<md') {
                    &:nth-child(4n+0),
                    &:nth-child(14) {
                        padding-right: 0;
                    }
                }
                @include media('>md', '<lg') {
                    &:nth-child(4),
                    &:nth-child(8),
                    &:nth-child(12),
                    &:nth-child(14),
                    &:nth-child(16)  {
                        padding-right: 0;
                    }
                }
                @include media('>lg', '<xl') {
                    &:nth-child(8),
                    &:nth-child(15) {
                        padding-right: 0;
                    }
                }
                @include media('>xl') {
                    &:nth-child(12n+0) {
                        padding-right: 0;
                    }
                }
            }
            .ivu-form-item {
                width: 100%;
                margin-right: 0;
                margin-bottom: 0;
            }
            .ivu-btn-text {
                padding: 0;
                margin-left: 10px;
            }
        }
    }
</style>
