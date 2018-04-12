<template>
    <div class="forget_psw">
       <div class="top">
           <mt-header title="短信找回">
               <router-link to="/" slot="left">
                   <mt-button icon="back"></mt-button>
               </router-link>
               <!--<mt-button icon="more" slot="right"></mt-button>-->
           </mt-header>
       </div>
        <div class="middle">
            <p>密码找回</p>
            <p>正在使用</p>

            <mt-field label="" placeholder="请输入用户名" v-model="username">
                <img :src="logo" alt="" style="width: 30px;">
            </mt-field>
            <mt-field label="" placeholder="请输入密码" type="password" v-model="password">
                <img :src="logo" alt="" style="width: 30px;">
            </mt-field>
            <mt-field label="邮箱" state="success" v-model="email"></mt-field>
            <mt-field label="邮箱" state="error" v-model="email"></mt-field>
            <mt-field label="邮箱" state="warning" v-model="email"></mt-field>

        </div>
    </div>
</template>

<script>
    export default {
        name: "forget-psw",
        data(){
            return{
                logo:require('@/assets/imgs/git.png'),
                username:'',
                password:'',
                email:''
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .forget_psw{
        .middle{
            .mint-field .mint-cell-value{
                padding-left:26px ;
            }
            .mint-field-other{
                position: absolute;
                left: 0;
                top: 10px;
                width: 30px;
            }
        }
}
</style>