<template>
    <div class="body" v-if="bodyVisible">
        <div class="nav_down">
            <div><img src="../../assets/client_login/new_login_logo.png" alt=""></div>
            <ul style="float: right;" v-if="true">
                <li>
                    <a @click="load()" class="pointer">首页</a>
                    <!--<a @click="twoverify">首页</a>-->
                </li>
                <li>
                    <router-link to="/downLoad" class="pointer">下载中心</router-link>
                </li>
                <li>
                    <a @click="helping" class="pointer">帮助中心</a>
                </li>
            </ul>
        </div>
        <div class="main" v-if="logStatus">
            <div class="main_one form">
                <p style="">登录</p>
                <form class=" " role="form">
                    <div class="form-group form_div">
                        <span class="user"></span>
                        <input type="text" class="log_put " name="userName" v-model="loginForm.name" style="border:none;"
                               placeholder="请输入名字">
                    </div>
                    <div class="form-group  form_div">
                        <span class="psw"></span>
                        <input type="password" class="log_put" name="password" v-model="loginForm.password" style="border:none;"
                               @keyup.enter="toLogin"
                               placeholder="请输入密码">
                    </div>
                    <div class="form-group form_div" style="border: none;">
                        <el-button type="button" class="btn" @click="handleLogin" style="outline: 0;background-color: #1f80e6;" :disabled="islogin">登录</el-button>
                    </div>
                </form>
                <ul>
                    <li style="padding-right:32px;border-right: 1px solid;" @click="forgetPsw" class="pointer">忘记密码</li>

                    <li style="padding-left:32px;" @click="quickReg" class="pointer">立即注册</li>
                </ul>
            </div>
        </div>
        <!--********* regsiter ********-->
        <register v-if="regStatus" @back="backLog" @backReg="quickReg"></register>
        <psw v-if="forgetvisible" @back="backLog" @backReg="quickReg"></psw>
        <!--*********two验证*********-->
        <twoVerify v-if="twoVerifyVisible" @verifyLog="verifyLog" @verifyReg="verifyReg" :curData="curData" :verifyType="verifyType"></twoVerify>
        <!--协议弹框-->
        <div class="footer">
            <span class="pan3">Copyright ©{{dateYear}} 易安联网络科技有限公司保留所有权利</span>
        </div>
    </div>
</template>
<script>
    import {getGrounpName,userReg} from 'api/register'
    import psw from  './psw'
    import twoVerify from  './twoVerify'
    import register from  './register'
    import termsAgreement from './termsTgreement'
    export default{
        components: {
            psw,
            twoVerify,
            termsAgreement,
            register
        },
        computed:{
            dateYear(){
                return new Date().getFullYear()
            }
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
                if(/^[\u4E00-\u9FA5A-Za-z0-9-_!#$^&().]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、中文、数字及-_!#$^&()."));
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
                twoVerifyVisible:false,
                islogin:false,
                vpnData:'',
                curData:{
                    curName:null,
                    curPassword:null,
                    curTextPsw:null,
                    randomNum:null,
                    id:null,
                    isBilling:null
                },
                verifyType:null,
                logStatus:true,
                regStatus:false,
                succStatus:false,
                checked:false,
                forgetvisible:false,
                loginForm: {
                    name: '',
                    password: '',
                    t:''
                },
                rules2: {
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
                },
                regForm:{
                    userName:'',
                    fullName:'',
                    password:'',
                    auditType:'',
                    email:'',
                    tel:'',
                    code:'',
                    checkPass:'',
                },
                list:null,
                isShowDialog: false,
                type: '',
                bodyVisible:true
            };
        },
        created(){
            //注册
            if (1 == this.$route.query.type) {
                this.regStatus=true;
                this.logStatus=false;
                this.forgetvisible=false;
            }
            //忘记密码
            if (2 == this.$route.query.type) {
                this.regStatus=false;
                this.logStatus=false;
                this.forgetvisible=true;
            }
            if (this.$route.query.type==''||this.$route.query.type==null) {
                this.regStatus=false;
                this.forgetvisible=false;
                this.logStatus=true;
            }
        },
        methods: {
            showAgreementDialog (type) {
                this.type = type
                this.isShowDialog = true
            },
            closeDialog () {
                this.isShowDialog = false
            },
            twoverify(){
                this.twoVerifyVisible=true;
                this.logStatus=false;
            },
            verifyLog(){
                this.twoVerifyVisible=false;
                this.logStatus=true;
            },
            verifyReg(){
                this.twoVerifyVisible=false;
                this.logStatus=true;
            },
            forgetPsw(){
                this.forgetvisible=true;
                this.logStatus=false;
                this.regStatus=false;

            },
            quickReg(){
                this.logStatus=false;
                this.regStatus=true;
                this.succStatus=false;
                this.forgetvisible=false;
            },
            backLog(){
                this.logStatus=true;
                this.regStatus=false;
                this.succStatus=false;
                this.forgetvisible=false;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            load(){
                //重新加载首页
                window.location.reload();
            },
            handleLogin(){
                this.islogin=true;
                console.log( this.islogin,' this.islogin');
                // this.chechVpnInstall();
                if (this.validate()) {
                    let form={};
                    let secForm={};
                    let deviceType=1;
                    console.log(!this.loginForm.sec_type,'loginForm.sec_type')
                    if(!this.loginForm.sec_type){
                        form=this.loginForm;
                        console.log(form,'form=form')
                    } else{
                        form=secForm
                    }
                    this.$store.dispatch('login',form).then((res) => {
                        console.log(res, "login---id")
                        if (res.status == 1) {
                            //2  表示密码即将过期
                            if (res.code && 2 == res.code) {
                                this.$message({
                                    type: 'warning',
                                    message: res.msg
                                });
                                this.$router.push({path: '/admin/web'});
                                this.islogin=false;

                            }
                            //3  表示启动了首次登录，必须修改密码功能
                            else if(res.code && 3 == res.code){
                                this.$router.push({path: '/admin/web'});
                                this.$router.push({path: '/admin/myAccount?need=1'});
                                this.islogin=false;
                            }
                            else {
                                this.curData.curName=this.loginForm.name;
                                this.curData.curPassword=this.loginForm.password;
                                this.curData.curTextPsw=this.loginForm.password;//明文密码
                                this.curData.randomNum=res.data[0].dynamic_code;
                                this.curData.id=res.data[0].id;
                                this.curData.isBilling=res.data[0].is_billing;//计费模式
                                if(res.msg&&res.msg=='have AuAgn'){
                                    let checkCode=res.sec_type;
                                    console.log(checkCode,'checkCode')
                                    this.islogin=false;//置灰
                                    this.verifyType=res.sec_type;
                                    if(checkCode.device_type==1&&checkCode.dynamic_token_type==0&&checkCode.dynamic_type==0&&checkCode.mail_type==0&&checkCode.sms_type==0 ){
                                        this.$router.push({path: '/admin/web'});
                                         secForm={
                                            name: this.loginForm.name,
                                            password: this.loginForm.password,
                                            sec_type: {
                                                sms_type: res.sec_type.sms_type,
                                                dynamic_type: res.sec_type.dynamic_type,
                                                device_type: res.sec_type.device_type,
                                                dynamic_token_type: res.sec_type.dynamic_token_type,
                                                mail_type: res.sec_type.mail_type
                                            },
                                            all_sec_code: {
                                                sms_code: '',
                                                dynamic_code: '',
                                                device_code: 0,
                                                dynamic_token_code: '',
                                                mail_code: ''
                                            },
                                            t:this.loginForm.password
                                        };
                                        console.log(secForm,'secForm')
                                        this.$store.dispatch('login', secForm).then((res) => {
                                            console.log(res, "login---id")
                                            if (res.status == 1) {
                                                //2  表示密码即将过期
                                                if (res.code && 2 == res.code) {
                                                    this.$message({
                                                        type: 'warning',
                                                        message: res.msg
                                                    });
                                                    this.$router.push({path: '/admin/web'});
                                                    //登录检测小锁是否安装
                                                    this.chechVpnInstall();

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
                                                    this.chechVpnInstall();//登录检测小锁是否安装
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
                                    }else{
                                        this.twoverify()
                                    }
                                }else{
                                    //没有2次认证;  调小锁
                                    this.$router.push({path: '/admin/web'});
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功，欢迎您！'
                                    });
                                    //登录检测小锁是否安装
                                    this.chechVpnInstall();
                                }
                            }
                        } else if (res.status == -1) {
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                            this.islogin=false;
                            console.log( this.islogin,' this.islogin==22')
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '用户名或密码错误，请重试！'
                            });
                            this.islogin=false;
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            //检测是否安装 小锁（vpn）
            chechVpnInstall(){
                this.$store.dispatch('checkVpn').then((res) => {

                }).catch(err => {
                    console.log(err);
                });
            },
            toLogin(e){
                if (e.keyCode == 13) {
                    this.handleLogin()
                } else {
                    console.log("账号或者密码不正确！")
                }
            },
            validate() {
                if (this.loginForm.name == null || this.loginForm.name.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '用户名不能为空！'
                    });
                    return false;
                }
                if (this.loginForm.password == null || this.loginForm.password.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '密码不能为空！'
                    });
                    return false;
                }
                return true;
            },
            helping(){
                window.location.href='http://www.enlink.com.cn'
            }
        }
    }
</script>

<style >
    .form_div {
        /*height: 85px;*/
        position: relative;
        margin-top: 24px;

        border-bottom: 1px solid #F1F1F1;
        width: 310px;
        margin-left: auto;
        margin-right: auto;
    }
    .log_put {
        border: none;
        color: #FFF;
        padding: 5px 40px 10px 44px;
        background: transparent;
        /*******************/
        width: 310px;
        font-size: 14px;
    }
    .form_div input:focus {
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
    }

    .form_div .user {
        background: url("../../assets/client_reg/new_reg/reg_user.png") no-repeat;
        background-size: cover;
        position: absolute;
        /*top: 3px;*/
        left: 8px;
        width: 30px;
        height: 30px;
    }

    .form_div .psw {
        background: url("../../assets/client_reg/new_reg/reg_psw.png") no-repeat;
        background-size: cover;
        position: absolute;
        /*top: 3px;*/
        left: 8px;
        width: 30px;
        height: 30px;
    }

    .form_div input::-webkit-input-placeholder {
        color: #fff;
        font-size: 14px;
        text-align: center;
    }

    .form_div input::-moz-placeholder {
        color: #fff;
        font-size: 14px;
        text-align: center;
    }

    .btn {
        border-radius: 10px !important;
        margin-top: 10px !important;
        display: inline-block;
        background-color: #1f80e6 !important;
        border: none !important;
        width: 310px;
        height: 40px;
        font-size: 16px;
        color: #fff !important;
        outline: 0;
    }
    /****************/
    .body ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .body li {
        display: inline-block;
    }

    .body a {
        text-decoration: none;
        color: #fff;
    }

    * {
        box-sizing: border-box;
    }

    .body {
        height: 100%;
        /*min-height: 100%;*/
        background: url("../../assets/client_login/new_bg.jpg");
        background-position: left top;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        position: relative;
        min-height: 700px;
    }

    .body .nav_down {
        height: 75px;
        line-height: 75px;
        overflow: hidden;
        padding: 10px;
    }

    .body .nav_down div {
        float: left;
        margin-left: 40px;
    }

    .body .nav_down  ul {
        float: right;
        font-size: 16px;
        /*font-weight: bold;*/
        color: #d9d9d9;
    }

    .body .nav_down li {
        margin-right: 40px;

    }

    .body .nav_down img {
        /*width: 190px;*/
    }

    /******************************main***********************************/
    .body .main {
        color: #fff;
        overflow: hidden;
        margin: auto;
        background: url("../../assets/client_reg/div001.png") ;
        background-size: cover;
        /*************************/
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 380px;
        height: 320px;
        border-radius: 10px;
    }

    .body .main_one {
        text-align: center;
    }

    .main_one p {
        font-size: 16px;
        color: #F1F1F1;
        margin: 0;
        height: 69px;
        line-height: 69px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .main_one > ul {
        margin-top: 20px;
    }

    .main_one > ul > li {
        /*padding-right: 50px;*/
        /*height: 30px;*/
        /*margin-bottom: 15px;*/
        font-size: 12px;
        color: #f0f0f0;
    }

    /******************************footer***********************************/
    .body .footer {
        height: 60px;
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        margin: 0 auto;
        z-index: 0;
        overflow: hidden;
        color: #fff;
        font-size: 16px;
        padding: 20px 0;
        border-top: 1px solid #fff;
        opacity:0.7;
    }
</style>

<style rel="stylesheet/scss" lang="scss" >
    .pointer{
        cursor: pointer;
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
                    img{
                        width: 251px;
                    }
                }
                ul{
                    li{
                        margin-right: 17px;
                    }
                    .down_center{
                        /*display: none;*/
                    }
                    li:last-child{
                        margin-right: 0;
                    }
                }
            }
            .main {
                color: #fff;
                overflow: hidden;
                margin: auto;
                /*border: 1px solid;*/

                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                width: 80vw !important;
                max-width: 336px;
                /*height: 320px !important;*/
                border-radius: 10px;
                .form_div {
                    width:60vw;
                    max-width:307px;
                    .log_put {
                        width: 80%;
                    }
                    .btn {
                        width:60vw;
                        max-width:307px;
                    }
                    .btn:active{
                        /*background-color: #1f80e6;*/
                        /*border:none;*/
                    }
                    .btn:focus{
                        outline: 0;
                    }
                }
            }
            .footer {
                height: 60px;
                width: 100%;
                position: absolute;
                bottom: 0;
                text-align: center;
                margin: 0 auto;
                z-index: 0;
                overflow: hidden;
                color: #bdbdbd;
                font-size: 10px;
                padding: 20px 0;
                border-top: 1px solid grey;
                .pan2 {
                    word-wrap: break-word; //word-break
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
            .main {
                color: #fff;
                overflow: hidden;
                margin: auto;
                /*border: 1px solid;*/

                /*************************/
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                width: 80vw !important;
                max-width: 336px;
                /*height: 320px !important;*/
                border-radius: 10px;
                .main_log{

                }
                .form_div {
                    width:60vw;
                    max-width:307px;
                    .log_put {
                        width: 80%;
                    }
                    .btn {
                        width:60vw;
                        max-width:307px;
                    }
                    .btn:active{
                        /*background-color: #1f80e6;*/
                        /*border:none;*/
                    }
                    .btn:focus{
                        outline: 0;
                    }
                }
            }
            .footer {
                height: 55px !important;
                width: 100%;
                line-height: 55px;
                position: absolute;
                bottom: 0;
                text-align: center;
                margin: 0 auto;
                z-index: 0;
                overflow: hidden;
                color: #bdbdbd;
                font-size: 12px;
                /*padding: 20px 0;*/
                padding:  0;
                border-top: 1px solid grey;
                .pan2 {
                    word-wrap: break-word; //word-break
                }
            }
        }
    }
</style>

