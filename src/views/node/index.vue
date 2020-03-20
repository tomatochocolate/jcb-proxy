<template>
    <Card class="list" v-if="isReady">
        <Table :data="list" :columns="columns">
            <template slot-scope="{ row }" slot="totalTransfer">
                {{ row.totalTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="usedTransfer">
                {{ row.usedTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="residualFlow">
                {{ row.totalTransfer - row.usedTransfer | numeral('0,0[.]00b') }}
            </template>
            <template slot-scope="{ row }" slot="averageOnline">
                {{ row.averageOnline | numeral('0,0') }}
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

    export default {
        name: 'Node',
        mixins: [ page ],
        methods: {
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { count, vpnNodes } = await api.node.list({
                            pageNo, pageSize
                        })

                        resolve({
                            data: vpnNodes,
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
                    { title: '节点ID', key: 'nodeId', width: 100 },
                    { title: '节点名称', key: 'nodeName', minWidth: 140, maxWidth: 200 },
                    { title: '地区', key: 'nodeLocation', minWidth: 100 },
                    { title: '节点图片', key: 'iconFlag', width: 100 },
                    { title: '节点类型', key: 'nodeType', minWidth: 100 },
                    { title: '节点状态', key: 'status', width: 100 },
                    { title: '节点域名/IP地址', key: 'ip', minWidth: 140 },
                    { title: '节点总流量', slot: 'totalTransfer', width: 110 },
                    { title: '已用流量', slot: 'usedTransfer', width: 110 },
                    { title: '剩余流量', slot: 'residualFlow', width: 110 },
                    { title: '平均在线', slot: 'averageOnline', width: 130 },
                    { title: '添加时间', key: 'timeAdd', width: 160 },
                    { title: '修改时间', key: 'timeModify', width: 160 }
                ]
            }
        },
        mounted () {
            this.getList()
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
