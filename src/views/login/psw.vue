<template>
    <div class="mainpsw">
        <div class="main_pswFind" v-show="tabvisible">
            <div class="head">
                <p class="p_left"><span>密码找回</span></p>
                <p class="p_right"><span @click="backLogFun" class="pointer">登录</span><span @click="quickReg" class="pointer">注册</span></p>
            </div>
            <div class="form_pswFind" v-show="nextVisible">
                <p class="p_center" style=""><span>请输入您需要找回登陆密码的用户名</span></p>
                <el-form :model="formNext" status-icon  ref="formNext" :rules="rulesformNext" label-width="0px" class="demo-ruleForm form_sub">
                    <el-form-item label="" prop="name" class="item_sub">
                        <span class="user_reg reg_name"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="输入名称" class="reg_put" v-model="formNext.name"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="next" class="el_btn">下一步</el-button>
                </el-form>
            </div>
            <div class="form_pswFind" v-show="pswResetVisible" >
                <p class="" style="text-align: center"><span>正在为您账户重置登陆密码，请选择重置方式</span></p>
                <div class="dv_set">
                    <div class="dv_left dv_pub"><img src="../../assets/client_reg/new_reg/tel_code.png" alt="" style=""></div>
                    <div class="dv_mid dv_pub">
                        <p>通过验证短信</p>
                        <p>&nbsp;&nbsp;如果账号绑定手机号，并且还在使用，推荐使用此方式</p>
                    </div>
                    <div class="dv_right dv_pub" style="vertical-align: middle">
                        <el-button type="primary" @click="telPswReset" class="el_btn" style="background:#20a0ff">立即重置</el-button>
                    </div>
                </div>
                <div class="dv_set">
                    <div class="dv_left dv_pub"><img src="../../assets/client_reg/new_reg/mail_check.png" alt=""
                                                     style=""></div>
                    <div class="dv_mid dv_pub">
                        <p>通过验证邮箱</p>
                        <p>&nbsp;&nbsp;如果账号绑定邮箱，并且还在使用，推荐使用此方式</p>
                    </div>
                    <div class="dv_right dv_pub" style="vertical-align: middle">
                        <el-button type="primary" @click="mailPswReset" class="el_btn" style="background:#20a0ff">立即重置</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="main_modPsw mainpsw" v-show="modPswVisible">
            <div class="head">
                <p class="p_left"><span>密码找回</span></p>
                <p class="p_right"><span @click="backLogFun" class="pointer" style="cursor: pointer">登录</span><span @click="quickReg" class="pointer">注册</span></p>
            </div>
            <div class="form_pswFind" >
                <p class="" style="text-align: center" v-show="telPswVisible"><span>您正在使用"<span style="color:#1AA2F1;">验证短信</span>"校验</span></p>
                <p class="" style="text-align: center" v-show="!telPswVisible"><span>您正在使用"<span style="color:#1AA2F1;">验证邮箱</span>"校验</span></p>
                <el-form :model="formPsw" status-icon :rules="rulesPsw" ref="formPsw" label-width="0px"
                         class="demo-ruleForm form_sub">
                    <el-form-item label="" prop="" class="item_sub" v-show="telPswVisible">
                        <span class="user_reg reg_phone"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="" class="reg_put" v-model="onlyPh" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" class="item_sub" v-show="!telPswVisible">
                        <span class="user_reg reg_mail" style="top: 10px;"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入邮箱" class="reg_put" v-model="onlyMail" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="" class="item_sub" style="position: relative;" v-show="telPswVisible">
                        <span class="user_reg reg_pubcode"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="输入验证码" class="reg_put" v-model="formPsw.code"></el-input>
                        <span style="position:absolute;right:0;top:0;cursor: pointer" @click="getTelCheckCode">{{telcheckCode}}</span>
                    </el-form-item>
                    <el-form-item label="" prop="" class="item_sub" style="position: relative;" v-show="!telPswVisible">
                        <span class="user_reg reg_pubcode"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="输入验证码" class="reg_put" v-model="formPsw.code"></el-input>
                        <span style="position:absolute;right:0;top:0;cursor: pointer" @click="getCheckCode">{{checkCode}}</span>
                    </el-form-item>

                    <el-form-item label="" prop="new_password" class="item_sub">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请输入密码" class="reg_put" type="password" v-model="formPsw.new_password"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="confirm_password" class="item_sub">
                        <span class="user_reg reg_psw"></span>
                        <span class="dot">*</span>
                        <el-input placeholder="请确认密码" type="password" class="reg_put" v-model="formPsw.confirm_password"></el-input>
                    </el-form-item>
                    <div style="text-align: center">
                        <el-button type="primary" @click="submitForm('formPsw')" class="el_btn_s" v-show="telPswVisible" style="background:#20a0ff">确认修改</el-button>
                        <el-button type="primary" @click="submitForm('formPsw')" class="el_btn_s" v-show="!telPswVisible" style="background:#20a0ff">确认修改</el-button>
                        <span style="color: #3babf6;" class="pointer" @click="next">重新选择验证方式</span>
                    </div>
                </el-form>
            </div>

        </div>
    </div>
</template>
<script>

    import {getMailUserName,getTelUserName} from 'api/login'
    import {getCodeMsg,emailModPsw,telModPsw,getTelOrMail} from 'api/myAcount/myAcount'
    export default{
        name: '',
        components: {},
        data() {
            /**
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (/^[\da-zA-Z~!@#$%^&*()_+{};':",.\/|<>?]{6,20}$/.test(value) == false) {
                        callback(new Error("请输入6-20位字母、数字、英文符号"));
                    }
                    if (this.regForm.checkPass !== '') {
                        this.$refs.regForm.validateField('checkPass');
                    }
                    callback();
                }
            };
             var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
             var name = (rule, value, callback) => {
                if (/^\w{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    callback();
                }
            };
             var fullname = (rule, value, callback) => {
                if (/^\w{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    callback();
                }
            };
             var tel = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    if (/^(13|14|15|18|17)[0-9]{9}$/.test(value) == false) {
                        callback(new Error('请输入11位电话'));
                    } else {
                        callback();
                    }
                }
            };
             var email = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                        callback(new Error('请输正确输入邮箱'));
                    } else {
                        callback();
                    }
                }

            };*/
            let psw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^[\da-zA-Z~!@#$%^&*()_+{};':",.\/|<>?]{6,20}$/.test(value) == false){
                        callback(new Error("请输入6-20位字母、数字、英文符号"));
                    }
                    if (this.formPsw.confirm_password !== '') {
                        this.$refs.formPsw.validateField('confirm_password');
                    }
                    callback();
                }
            };
            let confirmPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.formPsw.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let name = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('输入用户名'));
                } else {
                    if(/^[\u4E00-\u9FA5A-Za-z0-9-_!#$^&().]{1,20}$/.test(value) == false){
                        callback(new Error("输入合法用户名"));
                    }else {
                        callback();
                    }
                }
            };
            return {
                logStatus: true,
                regStatus: false,
                succStatus: false,
                checked: false,
                forgetvisible: false,
                pswResetVisible: false,
                nextVisible: true,
                modPswVisible: false,
                telPswVisible:true,
                tabvisible:true,
                codes:120,
                telcodes:120,
                onlyPh:null,
                onlyMail:null,
                checkCode:'获取验证码',
                telcheckCode:'获取验证码',
                rules2: {
                    user_name: [
//                        {required: true, validator: name, trigger: 'blur'},
//                        {min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur'}
                    ],
                    full_name: [
//                        {required: true, validator: fullname, trigger: 'blur'},
//                        {min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur'}
                    ],
                    password: [
//                        {required: true, validator: validatePass, trigger: 'blur'},
//                        { min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur' }
                    ],
                    checkPass: [
//                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                    email: [
//                        {validator: email, trigger: 'blur'}
                    ],
                    tel: [
//                        {validator: tel, trigger: 'blur'}
                    ],
                    group_name: [
                        {required: true, trigger: 'blur', message: '请选择组名'}
                    ],
                },
                rulesformNext:{
                    name: [
                        {required: true, validator: name, trigger: 'blur'},
                    ],
                },
                formNext:{
                    name:'',
                    type:1
                },
                rulesPsw:{
                    new_password: [
                        {required: true, validator: psw, trigger: 'blur'},
                    ],
                    confirm_password: [
                        {required: true, validator: confirmPsw, trigger: 'blur'},
                    ],
                    // {required: true, validator:confirmPsw, trigger: 'blur'},
                },
                formPsw: {
                    telUserName:'',//初始Tel找回密码的用户名
                    userName:'',//初始邮箱找回密码的用户名
                    email: '',
                    code: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                }
            };
        },
        created(){
            this.getList()
        },
        methods: {
//            ****************
            quickReg(){
                this.logStatus = false;
                this.regStatus = true;
                this.succStatus = false;
                this.$emit('backReg');
            },
            backLogFun(){
                this.logStatus = true;
                this.regStatus = false;
                this.succStatus = false;
                this.$emit('back');
            },
            next(){
                getTelOrMail({name: this.formNext.name}).then((resp) => {
                    if(resp.msg=='success'){
                        this.nextVisible = false;
                        this.pswResetVisible = true;
                        this.modPswVisible = false;
                        this.tabvisible=true;

                        this.onlyPh=resp.phone;
                        this.onlyMail=resp.mail;
                    }
                    console.log(resp,'resp==',this.formNext.name)
                }).catch((err) => {
                    console.log(err);
                })
            },
            telPswReset(){
                this.nextVisible = false;
                this.pswResetVisible = false;
                this.telPswVisible = true;
                this.tabvisible=false;
                this.modPswVisible=true;
            },
            mailPswReset(){
                this.nextVisible = false;
                this.pswResetVisible = false;
                this.telPswVisible = false;
                this.tabvisible=false;
                this.modPswVisible=true;

            },
            getCheckCode(){
                console.log(this.formNext,'==========')
                if(this.codes!=120){
                    return
                }else{
                    getMailUserName(this.formNext).then((resp) => {
                        console.log(resp,'getuername');
                        if(resp.status==1){
                            this.formPsw.userName=this.formNext.name;
                            console.log(this.codes,'this.codes==')
                            // if(this.codes!=120){
                            //   return
                            // }
                            console.log(this.codes,'this.codes==2')
                            this.codes=120;
                            let that=this;
                            that.checkCode=that.codes+'s';
                            let interval = setInterval(function() {
                                that.codes--;
                                that.checkCode=that.codes+'s';
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
            getTelCheckCode(){
                if(this.telcodes!=120){
                    return
                }else {
                    getTelUserName(this.formNext).then((resp) => {
                        console.log(resp,'getuername');
                        if(resp.status==1){
                            this.formPsw.telUserName=this.formNext.name;
                            // if(this.telcodes!=120){
                            //     return
                            // }
                            this.telcodes=120;
                            let that=this;
                            that.telcheckCode=that.telcodes+'s';
                            console.log(that.telcheckCode,'telcheckCode')
                            let intervalTel = setInterval(function() {
                                that.telcodes--;
                                console.log(that.telcodes,'intervalTel')
                                that.telcheckCode=that.telcodes+'s';
                                if(that.telcodes<=0){
                                    clearInterval(intervalTel);
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
                }

            },
            submitForm(formName) {
                this.$refs.formPsw.validate((valid) => {
                    if (valid) {
                        let name=null;
                        if(this.telPswVisible){
                            name=this.formPsw.telUserName
                        }else {
                            name=this.formPsw.userName
                        }
                        let ruleFormPsw = {
                            name: name,
                            new_password: this.formPsw.new_password,
                            passwd_len: this.formPsw.new_password.length,
                            auth_code: this.formPsw.code
                        };
                        if(ruleFormPsw.new_password&&ruleFormPsw.name==ruleFormPsw.new_password){
                            this.$message({
                                type: 'warning',
                                message: '用户名和密码不能相同'
                            });
                        }else{
                            if(this.telPswVisible){
                                telModPsw(ruleFormPsw).then((resp) => {
                                    console.log(resp, 'resp')
                                    if (resp.status == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功！'
                                        });
                                        this.$emit('back');
                                        this.$refs[formName].resetFields();
                                    }else if(resp.status == -1){
                                        this.$message({
                                            type: 'warning',
                                            message: resp.msg
                                        });
                                    }else {
                                        this.$message({
                                            type: 'warning',
                                            message: '其他错误'
                                        });
                                    }
                                }).catch(e => {
                                    console.log("修改出错", e);
                                });

                            }else{
                                emailModPsw(ruleFormPsw).then((resp) => {
                                    console.log(resp, 'resp')
                                    if (resp.status == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功！'
                                        });
                                        this.$emit('back');
                                        this.$refs[formName].resetFields();
                                    }else if(resp.status == -1){
                                        this.$message({
                                            type: 'warning',
                                            message: resp.msg
                                        });
                                    }else {
                                        this.$message({
                                            type: 'warning',
                                            message: '其他错误'
                                        });
                                    }
                                }).catch(e => {
                                    console.log("修改出错", e);
                                });
                            }
                        }

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getList(){

            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .pointer{
        cursor: pointer;
    }
    .mainpsw{
        .head {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
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
                    border-radius: 10px;
                    margin: 10px auto;
                    display: block;
                    background-color: #20a0ff;
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
                    background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat;
                    background-size: contain;
                }
                .reg_pubcode {
                    background: url("../../assets/client_reg/new_reg/pub_code.png") no-repeat;
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

    .main_pswFind {
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
        height: 300px !important;
        border-radius: 10px;
        .form_pswFind {
            margin: 10px auto;
            padding-top: 20px;
            .p_center{
                text-align: center;
            }
            .dv_set {
                margin: auto;
                width: 75%;
                line-height: 16px;
                margin-bottom: 35px;
                .dv_pub {
                    display: inline-block;
                    vertical-align: middle;
                    img{
                        width:43px;
                        margin-top:-7px
                    }
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
                    margin: 20px auto;
                    display: block;
                    background-color: #20a0ff;
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
            }
        }
    }

    .main_modPsw{
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
        width: 750px;;
        height: 420px !important;
        border-radius: 10px;

    }
</style>
<!--移动适配css-->
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 1100px) {
        .mainpsw{
            .head {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid rgba(255,255,255,0.2);
                overflow: hidden;
                .p_left {
                    float: left;
                    font-size: 12px;
                    padding-left: 35px;
                    span {
                        font-size: 12px;
                        /*font-weight: 700;*/
                    }
                }
                .p_right {
                    float: right;
                    padding-right: 35px;
                    font-size: 12px;
                    span:nth-child(1) {
                        border-right: 1px solid #fff;
                        padding-right: 9px;
                    }
                    span:nth-child(2) {
                        padding-left: 9px;
                    }
                }
            }
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
                        border-radius: 10px;
                        margin: 10px auto;
                        display: block;
                        background-color: #20a0ff;
                        span{
                            font-size: 12px !important;
                        }
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
                        background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat;
                        background-size: contain;
                    }
                    .reg_pubcode {
                        background: url("../../assets/client_reg/new_reg/pub_code.png") no-repeat;
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

        .main_pswFind {
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
            /*width: 750px;*/
            height: 300px !important;
            width: 90vw ;
            max-width: 672px;
            border-radius: 10px;
            .form_pswFind {
                margin: 10px auto;
                padding-top: 20px;
                .p_center{
                    text-align: center;
                }
                .dv_set {
                    margin: auto;
                    width: 75%;
                    line-height: 16px;
                    margin-bottom: 35px;
                    font-size: 12px;
                    .dv_pub {
                        display: inline-block;
                        vertical-align: middle;
                        img{
                            width: 30px;
                        }
                    }
                    .dv_left {
                        width: 10%;
                    }
                    .dv_mid {
                        width: 52%;
                        p{
                            margin: 0;
                        }
                    }
                    .dv_right {
                        .el_btn{
                            font-size: 12px;
                        }
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
                        background-color: #20a0ff;
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
                }
            }
        }

        .main_modPsw{
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
            /*width: 750px;;*/
            height: 47% !important;
            min-height: 442px;
            width: 90vw !important;
            max-width: 560px;
            border-radius: 10px;
            .form_pswFind{
                .form_sub {
                    width: 81%;
                    margin: 10px auto;
                    padding-top: 20px;
                    font-size: 16px;
                    max-width: 329px !important;
                    .el-form-item {
                        margin-bottom: 30px;
                        .el-form-item__content {
                            width: 100%;
                            border-bottom: 1px solid;
                            margin-left: auto !important;
                            margin-right: auto
                        }
                    }
                    .el_btn {
                        width: 80%;
                        margin: 10px auto;
                        display: block;
                        background-color: #20a0ff;
                    }
                    .el_btn_s{
                        span{
                            font-size: 16px !important;
                        }
                    }
                    .dot {
                        position: absolute;
                        left: 31px;
                        top: -10px;
                        color: red;
                    }
                    .el-input-group {
                        font-size: 12px;
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
                        font-size: 16px;
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
                }
            }

        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 600px) {
        .mainpsw{
            .head {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid rgba(255,255,255,0.2);
                overflow: hidden;
                .p_left {
                    float: left;
                    font-size: 12px;
                    padding-left: 35px;
                    span {
                        font-size: 12px;
                        /*font-weight: 700;*/
                    }
                }
                .p_right {
                    float: right;
                    padding-right: 35px;
                    font-size: 12px;
                    span:nth-child(1) {
                        border-right: 1px solid #fff;
                        padding-right: 9px;
                    }
                    span:nth-child(2) {
                        padding-left: 9px;
                    }
                }
            }
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
                        border-radius: 10px;
                        margin: 10px auto;
                        display: block;
                        background-color: #20a0ff;
                        span{
                            font-size: 12px !important;
                        }
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
                        background: url("../../assets/client_reg/new_reg/reg_tel.png") no-repeat;
                        background-size: contain;
                    }
                    .reg_pubcode {
                        background: url("../../assets/client_reg/new_reg/pub_code.png") no-repeat;
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

        .main_pswFind {
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
            /*width: 750px;*/
            height: 300px !important;
            width: 90vw !important;
            border-radius: 10px;
            .form_pswFind {
                margin: 10px auto;
                padding-top: 20px;
                .p_center{
                    text-align: center;
                }
                .dv_set {
                    margin: auto;
                    width: 88%;
                    line-height: 16px;
                    margin-bottom: 35px;
                    font-size: 12px;
                    .dv_pub {
                        display: inline-block;
                        vertical-align: middle;
                        img{
                            width: 30px;
                        }
                    }
                    .dv_left {
                        width: 10%;
                    }
                    .dv_mid {
                        width: 52%;
                        p{
                            margin: 0;
                        }
                    }
                    .dv_right {
                        .el_btn{
                            font-size: 12px;
                        }
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
                        background-color: #20a0ff;
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
                }
            }
        }

        .main_modPsw{
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
            /*width: 750px;;*/
            height: 67% !important;
            min-height: 366px;
            max-height: 381px;
            width: 90vw !important;
            border-radius: 10px;
            .form_pswFind{
                .form_sub {
                    width: 81%;
                    margin: 10px auto;
                    padding-top: 20px;
                    font-size: 12px;
                    max-width: 329px !important;
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
                        background-color: #20a0ff;
                    }
                    .el_btn_s{
                        span{
                            font-size: 12px !important;
                        }
                    }
                    .dot {
                        position: absolute;
                        left: 31px;
                        top: -10px;
                        color: red;
                    }
                    .el-input-group {
                        font-size: 12px;
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
                        font-size: 12px;
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
                }
            }

        }
    }
</style>