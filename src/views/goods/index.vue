<template>
    <Card class="list" v-if="adminId == 1">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
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
                        <Button type="info" @click="handleAddAccount">添加套餐</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row, index }" slot="goodsButton">
                <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="">启用</Button> -->
                <!-- <Button type="error" size="small" @click="">禁用</Button> -->
                <Button type="success" size="small" @click="handlemodifyAccount(row)">修改套餐</Button>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                    {{row.status == 1?'正常':'禁用'}}
            </template>
            <template slot-scope="{ row, index }" slot="goodsType">
                    {{row.goodsType == 1?'包时':'流量'}}
            </template>
            <template slot-scope="{ row, index }" slot="buyMinute">
                    {{row.buyMinute}}
                    {{row.goodsType == 1?'天':'G'}}
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" @on-refresh="handleFilterQuery"/>
        <!-- <add-setmeal v-model="addSetMealModal" @on-refresh="handleFilterQuery" /> -->
        <modify-account v-model="modifyAccountModal" @on-refresh="handleFilterQuery"  ref="child"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'
    import { datePicker } from '@/config'
    import { log } from 'util';
    import axios from 'axios'

    import AddAccount from './components/add-account'
    import AddSetMeal from './components/add-setmeal'
    import modifyAccount from './components/modify-account'

    export default {
        name: 'Goods',
        mixins: [ page ],
        components: {AddSetMeal,AddAccount,modifyAccount},
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleAddSetMeal () {
                this.addSetMealModal = true
            },
            handleTableAccount () {
                this.tableAccountModal = true
            }, 
            handlemodifyAccount (row) {
                this.modifyAccountModal = true
                const v1 = JSON.parse(JSON.stringify(row))
                const v2 = JSON.parse(JSON.stringify(row))
                this.$refs.child.childMethods(v1,v2)
                
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
                        
                        const { count, goods } = await api.goods.list({
                            pageNo, pageSize,adminId,status,account
                        })

                        const { code,data,message } = await api.agent.queryCNum({
                            adminId
                        })

                        if (code == 200){
                            this.comboList = data.sort((a,b)=>{
                               return a.goods_id -  b.goods_id
                             });
                        } 

                        resolve({
                            data: goods,
                            meta: {
                                total: count
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            setMeal(e){
                var obj = { goodsId : 123 , adminId : 1  }
                var str = JSON.stringify(obj)
                
                let that = this
                axios({
                      url: "/api-console/goods/addorupdate", //在线跨域请求
                      method: "post", //默认是get请求
                      //   dataType:'JSON',
                      headers: {
                        //设置请求头
                        // "Content-Type": "application/x-www-form-urlencoded",
                        'token':'000000019DEtx2NGf1adckYbJpjNrkke',
                        'Access-Control-Allow-Origin':'*',
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        'Content-Type': 'application/json'
                      },
                      data: {
                        //？search后面的值写在params中
                        // members_id:e.memberId,pageName:'/console/user',flag:1
                        goodsId : 123 , adminId : 1
                      }
                    })
                    .then(function(val) {
                      console.log(val); // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
                      that.handleFilterQuery()
                    })
                    .catch(function(err) {
                      console.log(err);
                    });
            }

        },
        data () {
            return {
                adminId:'',
                goodId:"",
                value1:false,
                filterParams: {
                    level: '',
                    account: '',
                    status: 2
                },
                modifyparams: {
                    adminId:1,
                    goodsId: 1,
                    goodsName: 1,
                    buyMinute: 1,
                    priceShow:1,
                    price:1,
                    content:1,
                    status:1,
                    goodsType:1,
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
                addAccountModal:false,
                addSetMealModal: false,
                tableAccountModal:false,
                modifyAccountModal: false,

                columns: [
                    { slot:'goodsButton',title: '套餐启用/禁用',align: 'center',fixed: 'left',width: 150},
                    { slot: 'status',title: '账号状态',width: 200,align: 'center'},
                     { key: 'goodsId',title: '套餐ID',align: 'center',width: 150},
                    { key: 'goodsName',title: '套餐名称',align: 'center',width: 150},
                    { slot: 'goodsType',title: '套餐类型',align: 'center',width: 150},
                    { slot: 'buyMinute',title: '套餐数值（天/G）',align: 'center',width: 180},
                    { key: 'priceShow',title: '原价',align: 'center',width: 150},
                    { key: 'price',title: '销售价格',align: 'center',width: 150},
                    { key: 'content',title: '套餐描述',align: 'center',minwidth: 250}
    
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
