<template>
    <div>
        <div class="main_reg" v-show="regStatus">
            <div class="head">
                <p class="p_left"><span>用户注册</span></p>
                <p class="p_right"><span @click="backLog" class="pointer">登录</span><span @click="quickReg" class="pointer">注册</span></p>
            </div>
            <div class="form_reg">
                <el-form :model="regForm" status-icon :rules="rulesRegForm" ref="regForm" label-width="0px" class="demo-ruleForm form_sub">
                    <el-form-item label="" prop="userName" class="item_sub">
                        <span class="user_reg reg_name"></span>
                        <span class="dot">*</span>
                        <el-input v-model="regForm.userName" placeholder="输入名称" class="reg_put"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input type="password" v-model="regForm.password" class="reg_put" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="checkPass">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input type="password" v-model="regForm.checkPass" class="reg_put" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="fullName">
                        <span class="user_reg reg_fullName"></span>
                        <span class="dot">*</span>
                        <el-input v-model="regForm.fullName" placeholder="输入用户全名" class="reg_put"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="groupId">
                        <span class="user_reg reg_group" style="top: 10px;"></span>
                        <span class="dot" >*</span>
                        <el-select v-model="regForm.groupId" placeholder="请选择组" style="width: 100%;" class="groupId" >
                            <el-option
                                    v-for="item in list"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <span class="user_reg reg_num" style="top: 10px;"></span>
                        <el-input placeholder="请输入内容" v-model="regForm.code" class="input-with-select">
                            <el-select v-model="regForm.auditType" slot="prepend" placeholder="请选择" class="reg_sel" style="width:120px;">
                                <el-option label="学号" value="studentId"></el-option>
                                <el-option label="工号" value="jobId"></el-option>
                            </el-select>
                            <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item label="" prop="email">
                        <span class="user_reg reg_mail" style="top: 10px;"></span>
                        <span class="dot">*</span>
                        <el-input type="text" v-model="regForm.email" class="reg_put" placeholder="输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="tel">
                        <span class="user_reg reg_phone"></span>
                        <span class="dot">*</span>
                        <el-input type="text" v-model="regForm.tel" class="reg_put" placeholder="输入手机"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <el-checkbox v-model="checked" class="agreed"></el-checkbox>
                        <span style="font-size: 12px;color: #f1f1f1;">阅读<span style="color: #3498DB; cursor: pointer;"><span @click="showAgreementDialog('regist')">
                            《易安联用户注册协议》</span><span @click="showAgreementDialog('privacy')">《隐私政策》</span></span></span></el-form-item>
                    <button type="button" class="btn" @click="confirmReg('regForm')" style="outline: 0;margin-top: -10px;">立即注册</button>
                </el-form>
            </div>
        </div>

        <div class="main_reg_ok" v-show="succStatus">
            <!--<div class="main_reg_ok" v-show="true">-->
            <div class="head">
                <p class="p_left"><span>用户注册</span></p>
                <p class="p_right">
                    <span @click="backLog">登录</span>
                    <span @click="quickReg">注册</span>
                </p>
            </div>
            <div class="reg_ok">

                <h3 style="position: relative;"><span style="position: relative;"><img src="../../assets/client_reg/new_reg/reg_success.png" alt="" style="">注册申请提交成功</span></h3>
                <p class="reg_p1">您可以通过 <span style="color: #3babf6;">短信、邮箱</span>查看审核结果！</p>
                <el-button type="primary" @click="backLog" class="el_btn" style="background:#20a0ff">返回登录</el-button>
            </div>
        </div>
        <!--协议弹框-->
        <termsAgreement :visibleDialog="isShowDialog" :seedType="type" @closeDialog="closeDialog"></termsAgreement>
    </div>
</template>

<script>
    import termsAgreement from './termsTgreement'
    import {getGrounpName,userReg} from 'api/register'
    export default {
        name: "register",
        components: {
            termsAgreement,

        },
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^[\da-zA-Z~!@#$%^&*()_+{};':",.\/|<>?]{6,20}$/.test(value) == false){
                        callback(new Error("请输入6-20位字母、数字、英文符号"));
                    }
                    if (this.regForm.checkPass !== '') {
                        this.$refs.regForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_~!#$^&().]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、中文、数字及英文符号"));
                }else {
                    callback();
                }
            };
            let  fullname = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、中文、英文符号"));
                }else {
                    callback();
                }
            };
            let tel = (rule, value, callback) => {
                // if (/^(13|14|15|18|17)[0-9]{9}$/.test(value) == false) {
                if (value==''||value==null||value.length!=11) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            let email = (rule, value, callback) => {
                if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) == false) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            return {
                regStatus:true,
                succStatus:false,
                checked:false,
                rulesRegForm: {
                    userName: [
                        {required: true, validator: name, trigger: 'blur'},
                    ],
                    fullName: [
                        {required: true, validator: fullname, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                    email: [
                        {required: true,validator: email, trigger: 'blur'}
                    ],
                    tel: [
                        {required: true,validator: tel, trigger: 'blur'}
                    ],
                    groupId:[
//                        {required:true,trigger: 'blur',message:'请选择组名'}
                    ],
                },
                regForm:{
                    userName:'',
                    fullName:'',
                    password:'',
                    groupId:'',
                    auditType:'',
                    email:'',
                    tel:'',
                    code:'',
                    checkPass:'',
                },
                list:null,
                isShowDialog: false,
                type: '',
            };
        },
        created(){
            this.getList();
        },
        methods: {
            showAgreementDialog (type) {
                this.type = type
                this.isShowDialog = true
            },
            closeDialog () {
                this.isShowDialog = false
            },
            quickReg(){
                this.$emit('back');
            },
            backLog(){
                this.$emit('back');
            },
            confirmReg(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if( $('.groupId input').val()==''){
                            this.$message({
                                type: 'warning',
                                message: '请选择用户组!'
                            });
                        }else{
                            if(this.checked==true){
                                userReg(this.regForm).then((resp) => {
                                    console.log(resp,'resp-reg')
                                    if(resp.status=='SUCCESS'){
                                        // this.logStatus=false;
                                        this.regStatus=false;
                                        this.succStatus=true;
                                        this.$refs[formName].resetFields();
                                        this.regForm.code='';
                                    }else {
                                        this.$message({
                                            type: 'warning',
                                            message: resp.code.info
                                        });
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                });
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '请勾选阅读同意!'
                                });
                            }
                        }
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getList(){
                getGrounpName().then((resp) => {
                    console.log(resp,'resp-reg')
                    this.list=resp.data
                }).catch((err) => {
                    console.log(err);
                });
            },
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" >
    .pointer{
        cursor: pointer;
    }
    .main_reg_ok{
        /*color: #fff;*/
        overflow: hidden;
        margin: auto;
        /*border: 1px solid;*/
        background: url("../../assets/client_reg/div002.png") ;
        background-size: cover;
        /*************************/
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        /*width: 80vw !important;*/
        /*max-width: 336px;*/
        height: 267px !important;
        border-radius: 10px;
        .head{
            height: 50px;
            line-height:50px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            overflow: hidden;
            color: #fff;
            .p_left{
                float: left;
                padding-left: 35px;
                span{
                    font-size: 20px;
                    font-weight: 700;
                }
            }
            .p_right{
                float: right;
                padding-right: 35px;
                span:nth-child(1){
                    border-right:1px solid;
                    padding-right: 9px;
                }
                span:nth-child(2){
                    padding-left: 9px;
                }
            }
        }
        .reg_ok{
            width:64%;
            margin:10px auto;
            color: #F1F1F1;
            text-align: center;
            h3{
                position: relative;
                img{
                    vertical-align:top;
                    margin-right: 10px;
                    width:30px;

                }
            }
            .reg_p1{
                span{
                    color: #F1F1F1;
                }
            }
            .reg_p2{
                text-align: center;
                border-bottom:1px solid #f1f1f1;
                padding-bottom: 5px;
                overflow: hidden;
            }
            .reg_p3{
                border-bottom:1px solid #f1f1f1;
                padding-bottom: 5px;
            }
            .el-button{
                /*width: 100%;*/
                width: 230px;
                border-radius: 10px;
                margin-top:30px;
            }
        }
    }
    .main_reg{
        /*color: #fff;*/
        overflow: hidden;
        margin: auto;
        /*border: 1px solid;*/
        background: url("../../assets/client_reg/div003.png") ;
        background-size: cover;
        /*************************/
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        /*width: 80vw !important;*/
        /*max-width: 336px;*/
        width: 700px;;
        height: 591px !important;
        border-radius: 10px;
        .head{
            height: 50px;
            line-height:50px;
            border-bottom: 1px solid #f1f1f1;
            color: #fff;
            overflow: hidden;
            .p_left{
                float: left;
                padding-left: 35px;
                span{
                    font-size: 20px;
                    font-weight: 700;
                }
            }
            .p_right{
                float: right;
                padding-right: 35px;
                span:nth-child(1){
                    border-right:1px solid;
                    padding-right: 9px;
                }
                span:nth-child(2){
                    padding-left: 9px;
                }
            }
        }
        .form_reg {
            /*background: url("../../assets/login/center_bg.png");*/
            margin: 10px auto;
            .form_sub {
                width: 44%;
                margin: 10px auto;
                .el-form-item{
                    margin-bottom: 14px;
                }

                .dot{
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
                .el-select .el-input .el-input__icon{
                    color: #fff;
                }
                .el-input__inner {
                    border: none;
                    background-color: transparent;
                    border-bottom: 1px solid #f1f1f1;
                    border-radius: 0;
                    color: #fff;
                    padding-left: 52px;
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
                .dot{
                    position: absolute;
                    left: 31px;
                    top: -10px;
                    color: red;
                }
                .reg_name{
                    background: url("../../assets/client_reg/new_reg/reg_user.png") no-repeat;
                    background-size: contain;
                }
                .reg_fullName{
                    background: url("../../assets/client_reg/new_reg/reg_fullName.png") no-repeat;
                    background-size: contain;
                }
                .reg_group{
                    background: url("../../assets/client_reg/new_reg/reg_group.png") no-repeat;
                    background-size: contain;
                }
                .reg_num{
                    background: url("../../assets/client_reg/new_reg/reg_work.png")no-repeat;
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
                    background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat ;
                    background-size: contain;
                }
            }
        }
    }

    @media screen and (max-width: 1100px) {
        /*@media screen and (max-width: 600px) {*/
        .body {
            height: 100%;
            width: 100vw;
            /*min-height: 100%;*/
            background: url("../../assets/client_login/new_bg.jpg");
            background-position: left top;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: cover;
            position: relative;
            min-height: 540px !important;
            min-width: 50vw !important;
            .nav_down {
                width:100vw;
                div {
                    float: left;
                    margin-left: 10px !important;
                }
            }
            .main_reg{
                /*margin-top: 70px;*/
                overflow: hidden;
                background: url("../../assets/client_reg/div003.png") ;
                background-size: cover;
                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                /*max-width: 336px;*/
                /*width: 700px;*/
                /*height: 591px !important;*/
                width: 90vw !important;
                height: 78% !important;
                min-height: 549px;
                max-height: 565px;
                max-width: 660px;
                border-radius: 10px;
                .head{
                    height: 40px;
                    line-height:40px;
                    border-bottom: 1px solid #f1f1f1;
                    color: #fff;
                    font-size: 12px;
                    overflow: hidden;
                    .p_left{
                        float: left;
                        padding-left: 35px;
                        span{
                            font-size: 12px;
                            font-weight: 700;
                        }
                    }
                    .p_right{
                        float: right;
                        padding-right: 35px;
                        span:nth-child(1){
                            border-right:1px solid;
                            padding-right: 9px;
                        }
                        span:nth-child(2){
                            padding-left: 9px;
                        }
                    }
                }
                .form_reg {
                    /*background: url("../../assets/login/center_bg.png");*/
                    margin: 10px auto;
                    .form_sub {
                        width:78%;
                        max-width: 300px;
                        margin: 10px auto;
                        .btn{
                            margin-top: -15px !important;
                            width: 100%;
                            height: 34px;
                        }
                        .el-form-item{
                            margin-bottom: 15px;
                        }

                        .dot{
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
                        .el-select .el-input .el-input__icon{
                            color: #fff;
                        }
                        .el-input__inner {
                            border: none;
                            background-color: transparent;
                            border-bottom: 1px solid #f1f1f1;
                            border-radius: 0;
                            color: #fff;
                            padding-left: 52px;
                        }
                        .el-input__inner::-webkit-input-placeholder {
                            color: #fff;
                            /*font-size: 14px;*/
                            font-size: 12px;
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
                            width: 22px;
                            height: 28px;
                        }
                        .dot{
                            position: absolute;
                            left: 31px;
                            top: -10px;
                            color: red;
                        }
                        .reg_name{
                            background: url("../../assets/client_reg/new_reg/reg_user.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_fullName{
                            background: url("../../assets/client_reg/new_reg/reg_fullName.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_group{
                            background: url("../../assets/client_reg/new_reg/reg_group.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_num{
                            background: url("../../assets/client_reg/new_reg/reg_work.png")no-repeat;
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
                            background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat ;
                            background-size: contain;
                        }
                    }
                }
            }
            .main_reg_ok{
                /*color: #fff;*/
                overflow: hidden;
                margin: auto;
                /*border: 1px solid;*/
                background: url("../../assets/client_reg/div002.png") ;
                background-size: cover;
                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                /*width: 80vw !important;*/
                /*max-width: 336px;*/

                /*width: 650px;;*/
                height: 267px !important;
                width: 80vw;
                max-width: 715px;
                border-radius: 10px;
                .head{
                    height: 40px;
                    line-height:40px;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    overflow: hidden;
                    color: #fff;
                    font-size: 12px;
                    .p_left{
                        float: left;
                        padding-left: 35px;
                        span{
                            font-size: 12px;
                            font-weight: 700;
                        }
                    }
                    .p_right{
                        float: right;
                        padding-right: 35px;
                        span:nth-child(1){
                            border-right:1px solid;
                            padding-right: 9px;
                        }
                        span:nth-child(2){
                            padding-left: 9px;
                        }
                    }
                }
                .reg_ok{
                    width:78%;
                    margin:10px auto;
                    color: #F1F1F1;
                    text-align: center;
                    h3{
                        position: relative;
                        font-size: 16px;
                        /*position: absolute;width:30px;left:75px;*/
                        span{
                            position: relative;
                            img{
                                vertical-align:top;
                                margin-right: 10px;
                                width:25px;
                                position: absolute;
                                top: -1px;
                                left: -31px;
                            }
                        }
                    }
                    .el_btn{
                        width: 50%;
                        min-width: 205px;
                    }
                    .reg_p1{
                        font-size: 12px;
                        span{
                            color: #F1F1F1;
                        }
                    }
                    .reg_p2{
                        text-align: center;
                        border-bottom:1px solid #f1f1f1;
                        padding-bottom: 5px;
                        overflow: hidden;
                    }
                    .reg_p3{
                        border-bottom:1px solid #f1f1f1;
                        padding-bottom: 5px;
                    }
                    .el-button{
                        /*width: 100%;*/
                        border-radius: 10px;
                        margin-top:30px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 600px) {
        /*@media screen and (max-width: 600px) {*/
        .body {
            height: 100%;
            width: 100vw;
            /*min-height: 100%;*/
            background: url("../../assets/client_login/new_bg.jpg");
            background-position: left top;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: cover;
            position: relative;
            /*min-height: 540px !important;*/
            min-width: 50vw !important;
            overflow-y: auto;
            min-height: 625px !important;
            .nav_down {
                width:100vw;
                div {
                    float: left;
                    margin-left: 10px !important;
                    img{
                        width: 180px;
                    }
                }
                ul{
                    li{
                        font-size: 12px;
                        margin-right: 0;
                    }
                    .down_center{
                        /*display: none;*/
                    }
                    li:last-child{
                        margin-right: 0;
                    }
                }
            }
            .main_reg{
                /*color: #fff;*/
                margin-top: 70px;
                overflow: hidden;
                /*margin: auto;*/
                /*border: 1px solid;*/
                background: url("../../assets/client_reg/div003.png") ;
                background-size: cover;
                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                /*max-width: 336px;*/
                /*width: 700px;*/
                /*height: 591px !important;*/
                width: 90vw !important;
                height: 78% !important;
                min-height: 495px;
                max-height: 565px;
                border-radius: 10px;
                .head{
                    height: 40px;
                    line-height:40px;
                    border-bottom: 1px solid #f1f1f1;
                    color: #fff;
                    font-size: 12px;
                    overflow: hidden;
                    .p_left{
                        float: left;
                        padding-left: 35px;
                        span{
                            font-size: 12px;
                            font-weight: 700;
                        }
                    }
                    .p_right{
                        float: right;
                        padding-right: 35px;
                        span:nth-child(1){
                            border-right:1px solid;
                            padding-right: 9px;
                        }
                        span:nth-child(2){
                            padding-left: 9px;
                        }
                    }
                }
                .form_reg {
                    /*background: url("../../assets/login/center_bg.png");*/
                    margin: 10px auto;
                    .form_sub {
                        width:78%;
                        max-width: 300px;
                        margin: 10px auto;
                        .btn{
                            margin-top: -15px !important;
                            width: 100%;
                            height: 34px;
                        }
                        .el-form-item{
                            margin-bottom: 9px;
                        }

                        .dot{
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
                        .el-select .el-input .el-input__icon{
                            color: #fff;
                        }
                        .el-input__inner {
                            border: none;
                            background-color: transparent;
                            border-bottom: 1px solid #f1f1f1;
                            border-radius: 0;
                            color: #fff;
                            padding-left: 52px;
                        }
                        .el-input__inner::-webkit-input-placeholder {
                            color: #fff;
                            /*font-size: 14px;*/
                            font-size: 12px;
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
                            width: 22px;
                            height: 28px;
                        }
                        .dot{
                            position: absolute;
                            left: 31px;
                            top: -10px;
                            color: red;
                        }
                        .reg_name{
                            background: url("../../assets/client_reg/new_reg/reg_user.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_fullName{
                            background: url("../../assets/client_reg/new_reg/reg_fullName.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_group{
                            background: url("../../assets/client_reg/new_reg/reg_group.png") no-repeat;
                            background-size: contain;
                        }
                        .reg_num{
                            background: url("../../assets/client_reg/new_reg/reg_work.png")no-repeat;
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
                            background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat ;
                            background-size: contain;
                        }
                    }
                }
            }
            .main_reg_ok{
                /*color: #fff;*/
                overflow-y: auto;
                margin: auto;
                /*border: 1px solid;*/
                background: url("../../assets/client_reg/div002.png") ;
                background-size: cover;
                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                /*width: 80vw !important;*/
                /*max-width: 336px;*/

                /*width: 650px;;*/
                height: 267px !important;
                width: 90vw;
                border-radius: 10px;
                .head{
                    height: 40px;
                    line-height:40px;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    overflow: hidden;
                    color: #fff;
                    font-size: 12px;
                    .p_left{
                        float: left;
                        padding-left: 35px;
                        span{
                            font-size: 12px;
                            font-weight: 700;
                        }
                    }
                    .p_right{
                        float: right;
                        padding-right: 35px;
                        span:nth-child(1){
                            border-right:1px solid;
                            padding-right: 9px;
                        }
                        span:nth-child(2){
                            padding-left: 9px;
                        }
                    }
                }
                .reg_ok{
                    width:78%;
                    margin:10px auto;
                    color: #F1F1F1;
                    text-align: center;
                    h3{
                        position: relative;
                        font-size: 16px;
                        img{
                            vertical-align:top;
                            margin-right: 10px;
                            width:20px;
                            position: absolute;
                            top: -4px;
                        }
                    }
                    .el_btn{
                        width: 50%;
                        min-width: 205px;
                    }
                    .reg_p1{
                        font-size: 12px;
                        span{
                            color: #F1F1F1;
                        }
                    }
                    .reg_p2{
                        text-align: center;
                        border-bottom:1px solid #f1f1f1;
                        padding-bottom: 5px;
                        overflow: hidden;
                    }
                    .reg_p3{
                        border-bottom:1px solid #f1f1f1;
                        padding-bottom: 5px;
                    }
                    .el-button{
                        /*width: 100%;*/
                        width: 230px;
                        border-radius: 10px;
                        margin-top:30px;
                    }
                }
            }
        }
    }
</style>