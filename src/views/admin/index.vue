<template>
    <Card class="list" v-if="adminId == 1">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="状态" v-model="filterParams.status">
                            <Option value="1">正常</Option>
                            <Option value="2">禁用</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="id"><Input clearable placeholder="ID" v-model="filterParams.cardId" /></FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button type="info" @click="handleAddAccount">添加管理员</Button>
                        <Button type="info" @click="handleTableAccount">添加用户套餐记录</Button>
                        <Button type="info" @click="handlemodifyAccount">代理商账号补充</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns" >
            <template slot-scope="{ row, index }" slot="goodsButton">
                <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="">启用</Button> -->
                <!-- <Button type="error" size="small" @click="">禁用</Button> -->
                <Button type="success" size="small" @click="">编辑</Button>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                    {{row.status == 1?'正常':'禁用'}}
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" @on-refresh="handleFilterQuery"/>
        <table-expand  v-model="tableAccountModal"   @on-refresh='handleTableAccount' />
        <modify-account v-model="modifyAccountModal" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'
    import { datePicker } from '@/config'
    import { log } from 'util';

    import AddAccount from './components/add-account'
    import TableExpand from './components/table-expand'
    import ModifyAccount from './components/modify-account'

    export default {
        name: 'Admin',
        mixins: [ page ],
        components: {AddAccount,TableExpand,ModifyAccount},
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleTableAccount () {
                this.tableAccountModal = true
            }, 
            handlemodifyAccount () {
                this.modifyAccountModal = true
            }, 
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            handleEditGoods (type = 'add', row = {}) {
                this.editGoodsModal.show = true
                this.editGoodsModal.type = type
                this.editGoodsModal.data = row
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { status,account } = this.filterParams
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        const password = 123456

                        const { code,count, adminList } = await api.admin.list({
                           pageNo, pageSize ,adminId
                        })

//                         const { code,data,message } = await api.agent.queryCNum({
//                             adminId,
//                         })

//                         if (code == 200){
//                             this.comboList = data.sort((a,b)=>{
//                                return a.goods_id -  b.goods_id
//                              });
                            
//                         } 

                        resolve({
                            data: adminList,
                            meta: {
                                total: count
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            addSetMeal(){
                var obj = { "goodsId" : "zhaoliu" , "adminId" : 18,"goodsName" : "zhaoliu" , "buyMinute" : 18,"price" : "zhaoliu" , "priceShow" : 18,"Content" : "zhaoliu"  }
                var str = JSON.stringify(obj)
                console.log(str);
                
                const abc = api.admin.addorupdate(str)
                console.log(abc);
            }

        },
        data () {
            return {
                adminId:'',
                value1:false,
                filterParams: {
                    level: '',
                    account: 1,
                    status: 2
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
                addAccountModal: false,
                tableAccountModal:false,
                modifyAccountModal: false,

                columns: [
                    {
                        slot: 'status',
                        title: '账号状态',
                        width: 200,
                        align: 'center'
                    },
                    {
                        key: 'adminId',
                        title: '管理员ID',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'loginAccount',
                        title: '账号',
                        align: 'center',
                        width: 200
                    },
                    {
                        key: 'timeLogin',
                        title: '最后登录时间',
                        align: 'center',
                        minWidth: 100
                    },
                   
                    // { slot:'goodsButton',title: '操作管理员',align: 'center',fixed: 'left',width: 200},
                ],
                editGoodsModal: {
                    show: false,
                    type: 'add',
                    data: {}
                }
            }
        },
        mounted () {
            this.getList()
            this.adminId = JSON.parse(window.localStorage.getItem("user")).id
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
