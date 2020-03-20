<template>
    <Row type="flex" :justify="isSimple ? 'center' : 'end'">
        <Col>
            <IPage v-bind="$attrs" v-on="$listeners"
                   :simple="isSimple" :page-size="pageSize" :show-sizer="showSizer"
                   :show-total="showTotal" :show-elevator="showElevator" :page-size-opts="pageSizeOpts" />
        </Col>
    </Row>
</template>
<script>
    import { mapGetters } from 'vuex'
    import IPage from 'view-design/src/components/page'

    import { page } from '@/config'
    const { pageSize, showSizer, showTotal, showElevator, pageSizeOpts } = page
    export default {
        name: 'Page',
        inheritAttrs: false,
        props: {
            simple: {
                type: Boolean,
                default: false
            },
            pageSize: {
                type: Number,
                default: pageSize
            },
            showSizer: {
                type: Boolean,
                default: showSizer
            },
            showTotal: {
                type: Boolean,
                default: showTotal
            },
            showElevator: {
                type: Boolean,
                default: showElevator
            },
            pageSizeOpts: {
                type: Array,
                default () {
                    return pageSizeOpts
                }
            }
        },
        computed: {
            ...mapGetters('app', [ 'breakpoints' ]),
            isSimple () {
                const { xs, sm } = this.breakpoints

                return this.simple || (xs || sm)
            }
        },
        components: { IPage }
    }
</script>
<style lang="scss" type="text/scss">
    .ivu-page-options-elevator input {
        text-align: center;
    }
</style>
