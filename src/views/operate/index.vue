<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            内容管理
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu>
   
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'
    import axios from 'axios'

    import AddAccount from './components/add-account'
    import TimeAccount from './components/time-account'
    import FlowAccount from './components/flow-account'
    export default {
        name: 'User',
        mixins: [ page ],
        components: { AddAccount ,TimeAccount,FlowAccount},
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleTimeAccount () {
                this.timeAccountModal = true
            },
             handleFlowAccount () {
                this.flowAccountModal = true
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            selectFun(selection){
                var checkID = selection.map(function(item){
                    return item.memberId
                })
                
                this.members_id = checkID.join(",")
            },
            handleON (e){
                
                let that = this
                // const userStatus = api.user.onoff({
                // members_id:100524,pageName:'/console/user',flag:0
                // })
                axios({
                      url: "/api-console/member/enableOrDisable", //在线跨域请求
                      method: "post", //默认是get请求
                      headers: {
                        //设置请求头
                        "Content-Type": "application/x-www-form-urlencoded",
                        'token':'000000019DEtx2NGf1adckYbJpjNrkke'
                      },
                      params: {
                        //？search后面的值写在params中
                        members_id:e.memberId,pageName:'/console/user',flag:2
                      }
                    }).then(function(val) {
                          console.log(val); // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
                          that.handleFilterQuery()
                        })
                        .catch(function(err) {
                          console.log(err);
                         });
            },
            handleOFF (e){
                // const userStatus = api.user.onoff({
                // members_id:100524,pageName:'/console/user',flag:0
                // })
                
                let that = this
                axios({
                      url: "/api-console/member/enableOrDisable", //在线跨域请求
                      method: "post", //默认是get请求
                      headers: {
                        //设置请求头
                        "Content-Type": "application/x-www-form-urlencoded",
                        'token':'000000019DEtx2NGf1adckYbJpjNrkke'
                      },
                      params: {
                        //？search后面的值写在params中
                        members_id:e.memberId,pageName:'/console/user',flag:1
                      }
                    })
                    .then(function(val) {
                      console.log(val); // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
                      that.handleFilterQuery()
                    })
                    .catch(function(err) {
                      console.log(err);
                    });
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { id, status, phone, created_at } = this.filterParams
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        const { count, members } = await api.user.list({
                            adminId,pageNo, pageSize, status, phone, id,
                            created_at: created_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(',')
                        })

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
            }
        },

        data () {
            return {
                adminId:'',
                filterParams: {
                    id: '',
                    phone: '',
                    status: '',
                    created_at: []
                },
                theme1: 'primary',
                addAccountModal: false,
                importAccountModal: false,
                timeAccountModal: false,
                flowAccountModal: false,


                 members_id : '',
                 admin_id : 1,
                 add_time : 10 ,
                 unit : 1 ,

                columns: [
                    { slot: 'status', title: '账号状态', width: 100},
                    { key: 'memberId', title: '用户ID', width: 100 },
                    { key: 'memberType', title: '注册平台', width: 100 },
                    { key: 'memberAccount', title: '会员账号', width: 140 },
                    { key: 'memberName', title: '会员名', width: 140 },
                    { key: 'experience', title: '是否体验', width: 100 },
                    { key: 'memberPaid', title: '是否付费', width: 100 },
                    { key: 'timeStart', title: '体验/续费开始时间', width: 170 },
                    { key: 'timeEnd', title: '体验/续费到期时间', width: 170 },
                    { key: 'timeAdd', title: '账号激活时间', width: 170 },
                    { key: 'timeLogin', title: '最后登录时间', width: 170 },
                    { key: 'ipLogin', title: '最近登录IP', width: 140 },
                    { key: 'versionSoft', title: '最近使用版本', width: 130 },
                    { key: 'channelReg', title: '注册渠道代码', width: 130 },
                    { key: 'ipReg', title: '注册IP', width: 140 },
                    { type:'selection',title:'选择',width:80,align:'center', fixed: 'right'},
                    { slot: 'action',title: '用户状态',width: 150,align: 'center',fixed: 'left' }
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
            this.getList();
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
