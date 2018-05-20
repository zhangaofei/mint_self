<template>
    <div class="logined" >

        <div class="top">
            <img :src="logo" alt="00000" class="pointer">
        </div>
        <div class="middle">
           <div >
               <mt-field label="用户名" placeholder="请输入用户名" v-model="form.name"></mt-field>
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
                <span>忘记密码</span>
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
                   name:'',
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
            vailded(){
                // if (/^[0-9]{6,20}$/.test(value) == false) {
               // if(/^[0-9]*$/.test(this.form.username.trim())==false||this.form.username.trim()==''){
               //     Toast('名称为数字、字母、下划线');
               //     return false
               // }
                if(/^[0-9]*$/.test(this.form.password.trim())==false||this.form.password.trim()==''){
                    Toast('密码为数字');
                    return false
                }
                return true
            },
            handLogin(){
                console.log(this.vailded(),'mmmmn',this.form.name,'====');
<<<<<<< HEAD
                this.$router.push({path: '/apply'});
                // if(this.vailded()){
                    // this.$router.push({path:'./apply'});
=======
                if(this.vailded()){
                    this.$router.push({path:'/apply'});
>>>>>>> d1c3c27323285acb53644a73580769d82d7ab86d
                    // this.$store.dispatch('login',this.form).then((res) => {
                    //     if (res.status == 1) {
                    //         this.$router.push({path: '/apply'});
                    //     }else if (res.status == -1) {
                    //         Toast(res.msg);
                    //     }
                    // })
<<<<<<< HEAD
                // }
=======
                }
>>>>>>> d1c3c27323285acb53644a73580769d82d7ab86d
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .pointer{
        cursor: pointer;
    }
    input:-webkit-autofill{
        -webkit-box-shadow: 0 0 0px 1000px white inset;
        /*border: 1px solid #CCC!important;*/
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




