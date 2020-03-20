<template>
    <Card class="list" v-if="isReady">
        <div class="btn-group">
            <Button type="primary" @click="addModalVisible = true">上传App</Button>
        </div>
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="downUrl">
                <a :href="row.downUrl" target="_blank" title="点击下载App"><Icon type="ios-cloud-download" :size="26"/></a>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
        <Store v-model="addModalVisible" @on-success="getList"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'

    export default {
        name: 'AppVersion',
        mixins: [ page ],
        components: { Store },
        methods: {
            handleFilterQuery () {},
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { count, clients } = await api.appVersion.list({ pageNo, pageSize })

                        resolve({
                            data: clients,
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
                columns: [
                    { title: 'ID', key: 'verId', width: 100 },
                    { title: '标题', key: 'verTitle', minWidth: 160, maxWidth: 250 },
                    { title: '描述', key: 'verContent', minWidth: 160 },
                    { title: '最后版本号', key: 'verSoft', width: 160 },
                    { title: '最后版本编号', key: 'verShow', width: 160 },
                    { title: '地址', slot: 'downUrl', width: 180 },
                    { title: '平台信息', key: 'platform', width: 160 },
                    { title: '渠道代码', key: 'channel', width: 160 }
                ],
                addModalVisible: false
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
    .btn-group {
        margin-bottom: 15px;
    }
</style>
