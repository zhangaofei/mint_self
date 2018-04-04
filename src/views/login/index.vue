<template>
    <div class="body login" >

        <div class="top">
            <img :src="logo" alt="00000" class="pointer">
        </div>
        <div class="middle">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

        </div>
        <div class="bottom">
            <p class="p1 pointer">注册</p>
            <p class="p2 pointer">忘记密码</p>
        </div>

    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register'
    export default{
        components: {

        },
        computed:{

        },
        data() {
            return {
                logo:require('@/assets/imgs/git.png'),
                username:'',
                password:''
            }

        },
        created(){

        },
        methods: {
            handleClose(){
                console.log('关闭')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .pointer{
        cursor: pointer;
    }
    .login{
        .top{
            text-align: center;
            /*height: 100px;*/
            padding: 100px 10px;
            img{
                /*height: 100px;*/
            }
        }
        .middle{

        }
        .bottom{
            overflow: hidden;
            position: fixed;
            width: 100%;
            bottom: 37px;
            .p1{
                padding-left: 10px;
                float: left;
            }
            .p2{
                padding-right: 10px;
                float: right;
            }
        }
    }
</style>




