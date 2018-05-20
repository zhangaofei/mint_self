<template>
    <div class="safeProtect">
        <mt-header title="安全保护">
            <router-link to="/apply" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <mt-cell
                title="个人资料"
                is-link
                value="">
        </mt-cell>
        <mt-cell
                title="修改密码"
                :to="modPsw"
                is-link
                value="">
        </mt-cell>
        <mt-cell
                title="登录"
                is-link
                value="">
            <mt-switch v-model="value"></mt-switch>
        </mt-cell>
        <mt-cell
                title="设备管理"
                is-link
                value="">
        </mt-cell>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "safe-protect",
        data(){
            return{
                value:true,
                modPsw:'/safeProtect/modPsw'
            }
        }

    }
</script>

<style lang="scss" >
    .safeProtect{
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