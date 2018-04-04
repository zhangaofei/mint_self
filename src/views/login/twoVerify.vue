<template>
    <div class="mainpsw">
        <div class="main_verify" ref="main_verify">
            <div class="head">
                <p class="p_left"><span>二次认证</span></p>
                <p class="p_right"><span @click="backLogFun" class="pointer">登录</span><span @click="quickReg" class="pointer">注册</span></p>
            </div>
            <div class="form_pswFind">
                <!--<p class="" style="margin-left: 112px"><span>请输入您需要找回登陆密码的用户名</span></p>-->
                <el-form :model="verifyForm" status-icon :rules="rules"  ref="verifyForm" label-width="0px" class="demo-ruleForm form_sub">
                    <el-form-item label="" prop="" class="item_sub" v-show="verifyType.sms_type==1">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入短信验证码" class="reg_put" v-model="verifyForm.all_sec_code.sms_code"></el-input>
                        <span style="position:absolute;right:0;top:0;cursor: pointer" @click="getTelCode">{{telcheckCode}}</span>
                    </el-form-item>
                    <el-form-item label="" prop="" class="item_sub" v-show="verifyType.mail_type==1">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入邮箱验证码" class="reg_put" v-model="verifyForm.all_sec_code.mail_code"></el-input>
                        <span style="position:absolute;right:0;top:0;cursor: pointer" @click="getMailCode">{{checkCode}}</span>
                    </el-form-item>
                    <el-form-item label="" prop="" class="item_sub" v-show="verifyType.dynamic_token_type==1">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入六位动态令牌" class="reg_put" v-model="verifyForm.all_sec_code.dynamic_token_code"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" class="item_sub" v-show="verifyType.dynamic_type==1">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入右侧验证码" class="reg_put" v-model="verifyForm.all_sec_code.dynamic_code" ></el-input>
                        <span style="position:absolute;right:0;top:0;cursor: pointer" @click="getRandom">{{randomNum}}</span>
                    </el-form-item>
                    <el-button type="primary"  class="el_btn" @click="submitForm('verifyForm')" style="margin-top:30px;background:#1f80e6">确定</el-button>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register'
    import {getMailUserName,getTelUserName,getRandomNum} from 'api/login'
    export default{
        // name: 'vpnlogin',
        components: {

        },
        data(){
            return{
                rules:{},
                randomNum:this.curData.randomNum,
                telcodes:120,
                codes:120,
                checkCode:'获取验证码',
                telcheckCode:'获取验证码',

                verifyForm:{
                    name: this.curData.curName,
                    password: this.curData.curTextPsw,
                    sec_type: {
                        sms_type: null,
                        dynamic_type: null,
                        device_type: 2,
                        dynamic_token_type:null,
                        mail_type: null
                    },
                    all_sec_code: {
                        sms_code: null,
                        dynamic_code: '',
                        device_code: 2,//硬件特征客户端没有
                        dynamic_token_code: null,
                        mail_code: null
                    },
                    t:this.curData.curTextPsw
                }
            }
        },
        props:['curData','verifyType'],
        created(){
        console.log(this.verifyType,'================================',this.curData);
            let form={
                name: this.curData.curName,
                password: this.curData.curTextPsw,
                sec_type: {
                    sms_type: this.verifyType.sms_type,
                    dynamic_type: this.verifyType.dynamic_type,
                    device_type: this.verifyType.device_type,
                    dynamic_token_type: this.verifyType.dynamic_token_type,
                    mail_type: this.verifyType.mail_type
                },
                all_sec_code: {
                    sms_code: '',
                    dynamic_code: '',
                    device_code: 0,
                    dynamic_token_code: '',
                    mail_code: ''
                },
                t:this.curData.curTextPsw
            };
            this.verifyForm=form;
//            this.$router.push({path: '/login'});
        },
        methods: {
            getRandom(){
                getRandomNum({id:this.curData.id}).then((resp) => {
                    console.log(resp, 'updata----getRandomNum')
                    this.randomNum=resp.dynamic_code;
                }).catch((err) => {
                    console.log(err);
                });
            },
            quickReg(){
//                this.logStatus = false;
//                this.regStatus = true;
//                this.succStatus = false;
                this.$emit('verifyReg');
            },
            backLogFun(){
//                this.logStatus = true;
//                this.regStatus = false;
//                this.succStatus = false;
                this.$emit('verifyLog');
            },
            getMailCode(){
                if(this.codes!=120){
                    return
                }else {
                getMailUserName({name:this.curData.curName,type:2}).then((resp) => {
                    console.log(resp,'getuername');
                    if(resp.status==1){
                        console.log(this.codes,'this.codes==')
                        console.log(this.codes,'this.codes==2')
                        this.codes=120;
                        let that=this;
                        that.checkCode=that.codes+'s';
                        console.log(this.codes,'this.codes==',that.checkCode)
                        let interval = setInterval(function() {
                            that.codes--;
                            that.checkCode=that.codes+'s';
                            console.log(that.codes,'interval',that.checkCode);
                            if(that.codes<=0){
                                clearInterval(interval);
                                that.checkCode='获取验证码';
                                that.codes=120;
                            }
                        }, 1000);
                    }else {
                        this.$message({
                            type: 'warning',
                            message: resp.msg
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
                }
            },
            getTelCode(){
                getTelUserName({name:this.curData.curName,type:2}).then((resp) => {
                    if(resp.status==1){
                        if(this.telcodes!=120){
                            return
                        }
                        this.telcodes=120;
                        let that=this;
                        that.telcheckCode=that.telcodes+'s';
                        let interval = setInterval(function() {
                            that.telcodes--;
                            that.telcheckCode=that.telcodes+'s';
                            if(that.telcodes<=0){
                                clearInterval(interval);
                                that.telcheckCode='获取验证码';
                                that.telcodes=120;
                            }
                        }, 1000);
                    }else {
                        this.$message({
                            type: 'warning',
                            message: resp.msg
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });

            },
            submitForm(formName) {
                this.$store.dispatch('login', this.verifyForm).then((res) => {
                    console.log(res, "login---id")
                    if (res.status == 1) {
                        //2  表示密码即将过期
                        if (res.code && 2 == res.code) {
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                            this.$router.push({path: '/admin/web'});

                        }
                        //3  表示启动了首次登录，必须修改密码功能
                        else if(res.code && 3 == res.code){
                            this.$router.push({path: '/admin/myAccount?need=1'});
                        }
                        else {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功，欢迎您！'
                                });
                                this.$router.push({path: '/admin/web'});
                        }
                    }
                    else if (res.status == -1) {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '用户名或密码错误，请重试！'
                        });
                    }
                }).catch(err => {
                    this.loading = false;
                    console.log(err);
                });

            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .head {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid  rgba(255, 255, 255, 0.2);
        overflow: hidden;
        .p_left {
            float: left;
            padding-left: 35px;
            span {
                font-size: 20px;
                font-weight: 700;
            }
        }
        .p_right {
            float: right;
            padding-right: 35px;
            span:nth-child(1) {
                border-right: 1px solid #fff;
                padding-right: 9px;
            }
            span:nth-child(2) {
                padding-left: 9px;
            }
        }
    }
    .main_verify {
        color: #fff;
        overflow: hidden;
        margin: auto;
        background: url("../../assets/client_reg/div003.png");

        background-size: cover;
        /*************************/
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        /*width: 80vw !important;*/
        /*max-width: 336px;*/
        width: 750px;
        height:auto;
        max-height: 400px;
        border-radius: 10px;
        .form_pswFind {
            margin: 10px auto;
            padding-top: 20px;
            .dv_set {
                margin: auto;
                width: 75%;
                line-height: 16px;
                margin-bottom: 35px;
                .dv_pub {
                    display: inline-block;
                    vertical-align: middle;
                }
                .dv_left {
                    width: 10%;
                }
                .dv_mid {
                    width: 66%;
                }
                .dv_right {

                }
            }
            .form_sub {
                width: 61%;
                margin: 10px auto;
                padding-top: 20px;
                .el-form-item {
                    margin-bottom: 14px;
                    .el-form-item__content {
                        width: 80%;
                        border-bottom: 1px solid;
                        margin-left: auto !important;
                        margin-right: auto
                    }
                }
                .el_btn {
                    width: 80%;
                    margin: 10px auto;
                    display: block;
                    border-radius: 10px;
                    border:none;
                }
                .dot {
                    position: absolute;
                    left: 31px;
                    top: -10px;
                    color: red;
                }
                .el-input-group {
                    border-bottom: 1px solid #fff;
                    .el-input__inner {
                        border: none !important;
                        /*border:none;*/
                        padding-left: 40px;
                    }
                    .reg_put .el-input {
                        /*width:149px;*/
                    }
                }
                .el-input-group__prepend {
                    position: relative;
                    left: 50px;
                }
                .el-input-group__append, .el-input-group__prepend {
                    background-color: transparent;
                    border: none;
                }
                /*}*/
                .reg_put {
                    /*width:80%;*/

                }
                .el-input__inner {
                    border: none;
                    background-color: transparent;
                    /*border-bottom: 1px solid #fff;*/
                    border-radius: 0;
                    color: #fff;
                    width: 80%;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                    text-align: center;
                    /*padding-left: 52px;*/
                }
                .el-input__inner::-webkit-input-placeholder {
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                }
                .el-input__inner::-moz-placeholder {
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                }
                .user_reg {
                    position: absolute;
                    top: 3px;
                    left: 9px;
                    width: 23px;
                    height: 28px;
                }
                .dot {
                    position: absolute;
                    left: 31px;
                    top: -10px;
                    color: red;
                }
                .reg_name {
                    background: url("../../assets/client_reg/reg_name.png") no-repeat;
                    background-size: contain;
                }
                .reg_fullName {
                    background: url("../../assets/client_reg/reg_fullName.png") no-repeat;
                    background-size: contain;
                }
                .reg_group {
                    background: url("../../assets/client_reg/reg_group.png") no-repeat;
                    background-size: contain;
                }
                .reg_num {
                    background: url("../../assets/client_reg/reg_nums.png") no-repeat;
                    background-size: contain;
                }
                .reg_psw {
                    background: url("../../assets/client_reg/new_reg/reg_psw.png") no-repeat;
                    background-size: contain;
                }
                .reg_mail {
                    background: url("../../assets/client_reg/new_reg/reg_mail.png") no-repeat;
                    background-size: contain;
                }
                .reg_phone {
                    background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat;
                    background-size: contain;
                }
            }
        }
    }
</style>