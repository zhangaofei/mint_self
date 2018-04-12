<template>
    <div class="logined" >

        <div class="top">
            <img :src="logo" alt="00000" class="pointer">
        </div>
        <div class="middle">
<<<<<<< HEAD
           <div >
               <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
               <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
           </div>
            <div class="login">
                <mt-button size="normal" type="primary" @click="handLogin">登录</mt-button>
            </div>
=======
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <!---->
            <mt-field label="邮箱" state="success" v-model="email"></mt-field>
            <mt-field label="邮箱" state="error" v-model="email"></mt-field>
            <mt-field label="邮箱" state="warning" v-model="email"></mt-field>
>>>>>>> ef3544854a5feaf0b05a2732bd19048634670ab2
        </div>
        <div class="bottom">
            <p class="p1 pointer">
                <span  >注册</span>
            </p>
            <p class="p2 pointer">
                <span @click="actionSheet">忘记密码</span>
            </p>
        </div>
<<<<<<< HEAD
    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register';
    import { Toast } from 'mint-ui';

=======
        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
        <!--MessageBox.prompt('请输入姓名').then(({ value, action }) => {-->
        <!--...-->
        <!--});-->
        <div>
            <button @click="show">alert</button>
            <button @click="show2">alert2</button>

        </div>
    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register'
    import { MessageBox } from 'mint-ui';
>>>>>>> ef3544854a5feaf0b05a2732bd19048634670ab2
    export default{
        components: {

        },
        computed:{

        },
        data() {
            return {
                logo:require('@/assets/imgs/git.png'),
<<<<<<< HEAD
               form:{
                   username:'',
                   password:''
               }
=======
                username:'',
                password:'',
                email:'',
                actions: [{
                    name: '短信找回',
                    method : this.getCamera // 调用methods中的函数
                }, {
                    name: '邮件找回',
                    method : this.getLibrary // 调用methods中的函数
                }],
                sheetVisible: false,

>>>>>>> ef3544854a5feaf0b05a2732bd19048634670ab2
            }

        },
        created(){

        },
        methods: {
            handleClose(){
                console.log('关闭')
            },
<<<<<<< HEAD
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

=======
            actionSheet: function(){
            // <span style="white-space:pre;">   </span>/// 打开action sheet
                this.sheetVisible = true;
            },
            getCamera: function(){
                this.$router.push({path:'./forgetPsw'})
                console.log("打开照相机")
            },
            getLibrary: function(){
                console.log("打开相册")
            },
            show(){
                MessageBox({
                    title: '提示',
                    message: '确定执行此操作?',
                    showCancelButton: true
                });
            },
            show2(){
                MessageBox.prompt('请输入姓名').then(({ value, action }) => {
                // ...
                })
            }
>>>>>>> ef3544854a5feaf0b05a2732bd19048634670ab2
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




