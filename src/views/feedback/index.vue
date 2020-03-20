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
        name: 'Feedback',
        mixins: [ page ],
        methods: {
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { count, feedbacks } = await api.feedback.list({
                            pageNo, pageSize
                        })

                        resolve({
                            data: feedbacks,
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
                    { key: 'feedbackId', title: 'ID', width: 100 },
                    { key: 'memberId', title: '用户ID', width: 150 },
                    { key: 'content', title: '反馈内容', minWidth: 300, ellipsis: true, tooltip: true },
                    { key: 'status', title: '状态', width: 100 },
                    { key: 'adminId', title: '回复用户ID', width: 150 },
                    { key: 'replyContent', title: '回复内容', minWidth: 300, ellipsis: true, tooltip: true },
                    { key: 'remark', title: '备注', minWidth: 300, ellipsis: true, tooltip: true },
                    { key: 'timeReply', title: '回复时间', width: 160 },
                    { key: 'timeAdd', title: '反馈时间', width: 160 }
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
