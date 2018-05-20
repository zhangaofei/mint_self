<template>
    <div class="severStatus">
        <mt-header title="服务状态">
            <router-link to="/apply" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <mt-cell
                title="链接状态"
                value="连接">
        </mt-cell>
        <mt-cell
                title="目标服务器"
                value="连接">
        </mt-cell>
        <mt-cell
                title="当前用户"
                value="连接">
        </mt-cell>
        <mt-cell
                title="持续时间"
                value="连接">
        </mt-cell>
        <mt-cell
                title="回话流量"
                value="连接">
        </mt-cell>
    </div>
</template>

<script>
    export default {
        name: "sever-status"
    }
</script>

<style  lang="scss">
    .severStatus{
        .mint-cell{
            .mint-cell-wrapper{
                .mint-cell-value{
                    font-size: 10px!important;
                }
                .mint-cell-title{
                    font-size: 14px;
                }
            }
        }
    }
</style>