<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <!-- <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="使用状态" v-model="filterParams.status">
                            <Option value="1">已使用</Option>
                            <Option value="2">未使用</Option>
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
                
               
            </Row> -->
        </Form>
        <Table :data="list" :columns="columns" >
            <template slot-scope="{ row, index }" slot="status">
                {{row.status == 1?'已到期':'启用中'}}
            </template>
            <template slot-scope="{ row, index }" slot="memberPaid">
                {{row.memberPaid == false?'否':'是'}}
            </template>
            <template slot-scope="{ row, index }" slot="experience">
                {{row.experience == false?'否':'是'}}
            </template>
           
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />


    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'
    // import { log } from 'util';

    export default {
        name: 'own',
        mixins: [ page ],
        components:{},
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
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { status,cardId } = this.filterParams
                        
                        const account = JSON.parse(window.localStorage.getItem("user")).loginAccount
                        
                        const { count, members,proxyId } = await api.own.list({
                            pageNo, pageSize,status,cardId,account
                        })
                        
                        this.proxyId = proxyId
                        // const { data,code } = await api.agent.queryCNum({
                        //     adminId
                        // })
//                         if (code == 200){
//                             this.comboList = data.sort((a,b)=>{
//                               return a.goods_id -  b.goods_id
//                             });
//                         }     
                        resolve({
                            data: members,
                            meta: {
                                total: count
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            },
        },
        data () {
            return {
                 filterParams: {
                    cardId: '',
                    status: '',
                },
                proxyId:123,
                couponAccountModal:false,
                createAccountModal:false,
                columns: [
                    { title: '用户ID', key: 'memberId', width: 150, ellipsis: true, tooltip: true,align: 'center' },
                    { title: '手机号码', key: 'memberAccount', width: 200 ,align: 'center'},
                    { title: '卡状态', slot: 'status', width: 160 ,align: 'center'},
                    { title: '是否为付费用户', slot: 'memberPaid', width: 150,align: 'center'},
                    { title: '是否体验账号', slot: 'experience', minWidth: 100,align: 'center'},
                    { title: '账号激活时间', key: 'timeAdd', width: 200 },
                    { title: '最后登录时间', key: 'timeLogin', width: 200 },
                    { title: '续费或体验开始时间', key: 'timeStart', width: 200 },
                    { title: '到期时间', key: 'timeEnd', width: 200 },
                    {title:'用户数量',slot:'memberNumber',width:200}
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
