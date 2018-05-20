<template>
    <div class="safeProtect">
        <mt-header title="修改密码">
            <router-link to="/safeProtect" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div >
            <mt-field label="用户名" placeholder="请输入用户名" ></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" ></mt-field>
        </div>
        <div class="login">
            <mt-button size="normal" type="primary" @click="">确定修改</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
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