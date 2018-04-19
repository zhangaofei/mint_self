<template>
    <div class="logined" >

        <div class="top">
            <img :src="logo" alt="00000" class="pointer">
        </div>
        <div class="middle">
           <div >
               <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
               <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
           </div>
            <div class="login">
                <mt-button size="normal" type="primary" @click="handLogin">登录</mt-button>
            </div>
        </div>
        <div class="bottom">
            <p class="p1 pointer">
                <span  >注册</span>
            </p>
            <p class="p2 pointer">
                <span @click="actionSheet">忘记密码</span>
            </p>
        </div>
    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register';
    import { Toast } from 'mint-ui';
    export default{
        components: {

        },
        computed:{

        },
        data() {
            return {
                logo:require('@/assets/imgs/git.png'),
               form:{
                   username:'',
                   password:''
               }
            }

        },
        created(){

        },
        methods: {
            handleClose(){
                console.log('关闭')
            },
            handLogin(){
              this.$router.push({path:'./apply'});
                this.$store.dispatch('login',this.form).then((res) => {
                    if (res.status == 1) {
                        this.$router.push({path: '/apply'});
                    }else if (res.status == -1) {
                        Toast(res.msg);
                    }
                })
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .pointer{
        cursor: pointer;
    }
    .logined{
        position: relative;
        min-height: 650px;
        .top{
            text-align: center;
            /*height: 100px;*/
            padding: 50px 10px;
            img{
                /*height: 100px;*/
            }
        }
        .middle{
            .mint-button--primary{
                display: inline-block;
                margin-top: 10px;
                width: 80%;
            }
           .login{
               text-align: center;
           }
        }
        .bottom{
            overflow: hidden;
            position: absolute;
            width: 100%;
            bottom: 15px;
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




