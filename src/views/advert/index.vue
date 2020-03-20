<template>
    <Card class="list" v-if="isReady">
        <Table :data="list" :columns="columns" />
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'

    export default {
        name: 'Advert',
        mixins: [ page ],
        methods: {
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { count, adverts } = await api.advert.list({
                            pageNo, pageSize
                        })

                        resolve({
                            data: adverts,
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
                    { title: '广告ID', key: 'adId', width: 100 },
                    { title: '广告内容', key: 'content', minWidth: 300, ellipsis: true, tooltip: true },
                    { title: '状态', key: 'status', width: 100 },
                    { title: '增加时间', key: 'timeAdd', width: 160 },
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
