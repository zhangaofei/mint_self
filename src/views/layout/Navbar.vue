<template>
    <div style="width:100%;">
        <header class="main-header">

            <!--右导航-->
            <nav class="navbar navbar-static-top" role="navigation" style="margin-left: 0;background: #438afe;">
                <!--<button @click="zafs">点击</button>-->
                    <!--<div v-show="visible" ref="main">弹出层</div>-->
                <div class="nav_left" style="float:left;">
                    <ul>
                        <li><img src="../../assets/client_login/new_login_logo.png" alt="logo"></li>
                    </ul>
                </div>
                <div class="navbar-custom-menu" style="float: right;height: 80px">
                    <ul class="nav navbar-nav" style="margin: 0;">
                        <li class="dropdown user user-menu head_li">
                            <a href="#" class="" data-toggle=""  @click.prevent="togglePanel">
                                <img src="../../assets/nav/app_no.png" class="user-image"
                                     alt="User Image">
                                <span class="hidden-xs nav_title" style="color: #FFF;">应用</span>
                            </a>
                            <ul class="sub_ul"  ref="main" v-show="visible">
                                <li class="user-body">
                                    <div class="col-xs-4 text-center sub_div first_dev">
                                        <a @click="toApply">
                                            <p class="fir_p"><img src="../../assets/nav/app_ok.png" alt=""><span>应用中心</span></p>
                                        </a>
                                    </div>
                                    <div class="col-xs-4 text-center sub_div">
                                        <a @click="toAccount">
                                            <p class="fir_p"><img src="../../assets/nav/account.png"
                                                                  alt=""><span>我的账号</span></p>
                                        </a>
                                    </div>
                                    <div class="col-xs-4 text-center sub_div" v-if="billing==1?true:false">
                                        <a @click="payVisible=!payVisible">
                                            <p class="fir_p"><img src="../../assets/nav/package_ok.png"
                                                                  alt=""><span>套餐充值</span></p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown user user-menu head_li">
                            <a href="#" class="" data-toggle="" @click.prevent="togglePanel2">
                                <img src="../../assets/nav/msg_yes.png" alt=""  v-if="hasNewMsg"  class="user-image">
                                <img src="../../assets/nav/msg_yes.png" class="user-image" alt="User Image" v-else>

                                <span class="hidden-xs nav_title" style="color: #FFF;">消息</span>
                            </a>
                            <ul class=" msg_ul" style="height: 150px;overflow-y: auto;max-height: 200px" v-show="visible2" >
                                <li class="user-body msg_li" v-for="item in msgs" style="" v-if="item.status==1">
                                    <!--1是未读 0已读-->
                                    <p  class="msg_p1" style="">{{item.msg}} </p><span>{{item.time|format_msg}}</span>
                                </li>
                                <li class="user-body msg_li"  style="color:rgb(126, 126, 126);"  v-else="">
                                    <!--<p  class="msg_p1" style="" >暂时没有消息哦！</p>-->
                                    <p  class="msg_p1" style="">{{item.msg}} </p><span>{{item.time|format_msg}}</span>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown user user-menu head_li">

                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" @click="logoutVisible=!logoutVisible">
                                <img src="../../assets/nav/logout.png" class="user-image"
                                     alt="User Image">
                                <span class="hidden-xs nav_title" style="color: #FFF;"><span>退出</span></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!--*************ele可收缩下来菜单*****-->
        <!--<el-dropdown trigger="click">-->
            <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
            <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>查看</el-dropdown-item>-->
                <!--<el-dropdown-item>新增</el-dropdown-item>-->
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--<div class="mail">-->
        <div class="public mobileDialog">
            <el-dialog
                    title="套餐充值"
                    v-model="payVisible"
                    size="small"
                    custom-class="dialog public"
                    top="10%"
                    :close-on-click-modal="false"
                    >
                <div class="mail-form pay-form">
                    <el-form :model="formPay" :rules="rulePay" ref="formPay" label-width="50px" class="demo-ruleForm">
                        <el-form-item label="当前用户" v-if="false">
                           <span style="margin-left: 20px">{{c_name}}</span>
                        </el-form-item>
                        <el-form-item label="账户余额"  v-if="false">
                            <span style="margin-left: 20px">xx&nbsp;元</span>
                        </el-form-item>
                        <el-form-item label="套餐选择" prop="packageId" class="">
                            <el-select v-model="formPay.packageId" placeholder="套餐选择" class="pay_sel el_sel">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开通周期" prop="num" class="">
                            <el-input v-model="formPay.num" class="el_put el_check pay_sel" placeholder="开通周期"></el-input>
                        </el-form-item>
                        <el-form-item label="支付现金" prop="" class="" v-if="false">
                            <el-input v-model="formPay.thir" class="el_put" placeholder="支付现金" type="password"
                                      ></el-input>
                        </el-form-item>
                        <el-form-item label="支付金额" prop="num" class="" v-if="false">
                           <span style="margin-left: 20px">xx&nbsp;元</span>
                        </el-form-item>
                        <el-form-item label="" prop="num" class="" v-if="false">
                            <el-checkbox style="margin-left: 108px"></el-checkbox><span>&nbsp;阅读并同意 <span style="color:#3484DF;">《易安联用户套餐协议》</span> </span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class='form-footer ' slot="footer">
                    <div style="" class="foot">
                        <span @click="canlePay('formPay')" class="canle">取消</span>
                        <el-button
                                type="primary"
                                class="btn_save"
                                @click="submitPay('formPay')">
                            开通
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="public  mobileDialog">
            <el-dialog
                    title="提示"
                    v-model="logoutVisible"
                    size="small"
                    custom-class="logout public"
                    top="40%"
                    :show-close="false"
                    :close-on-click-modal="false"
                    :before-close="handleClose"
            style="">
                <div class="mail-form">
                <p style="" class="p_logout"><img src="../../assets/nav/warning.png" alt=""> <span>确认退出当前账号？</span></p>
                </div>
                <div class='form-footer ' slot="footer" >
                    <div style="" class="foot">
                        <span class="canle" @click="logoutVisible=!logoutVisible">取消</span>
                        <el-button
                                type="primary"
                                class="btn_save"
                                @click="logout()">
                            确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex'
    import store from "../../store/index";
    import {modifyPsw,getStrategy} from "../../api/login";
    import {openPackage,openPackageList,getPackageDetail,getPackageInfo,loginType} from 'api/myAcount/myAcount';
    import {format,formatTime,formatGetTime} from "../../api/timedFun";
    export default {
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'login_msg',
                // 'msgs',//这个值
                'hasNewMsg',
                'billing',//是否启动计费
                'codeFlag'

            ]),

        },
        data() {
//            ****************start1*********************
            return {
                visible: false,
                visible2: false,
                logoutVisible:false,
                msgs:[],
                nomsg:false,
                leng:null,//messages的长度
//                c_name:'',
                hide: false,
                show1: true,
                img_app_b: require('../../assets/client_home/header_apply_b.png'),
                img_app_y: require('../../assets/client_home/header_apply_y.png'),
                ruleObj: {},
                is_letter: null,
                payVisible:false,
                options:[],
                rulePay:{},
                formPay:{
                    userId:null,
                    packageId:null,
                    num:null
                },
                remainDay:null,
                remainFollow:null
            }
        },
        filters: {//过滤时间戳
            format_msg: function(value){
                return formatGetTime(value)
            },
        },
        created(){
            this.getList();
            this.getListPackage();
            console.log(this.billing,'billing',this.codeFlag)
            console.log(this.uid,'getPackageInfo_uid')
            // ******首次调用设备登录提示信息***********
            this.print();
            this.$root.Bus.$on('informTipmsg', value => {
                this.print();
            })
        },
        mounted(){
            this.$nextTick(function () {

            })
        },
        methods: {
            print() {
                loginType().then((resp) => {
                    this.msgs = resp.data.msg.reverse();//数组反转
                }).catch((err) => {
                    console.log(err);
                });
            },

//            *************点击空白处 隐藏下拉菜单（应用、消息）****************
            togglePanel() {
                this.visible ? this.hided() : this.showd()
            },
            showd() {
                this.visible = true;
                document.addEventListener('click', this.hidePanel, true)
            },
            hided() {
                this.visible = false;
                document.removeEventListener('click', this.hidePanel, true)
            },
            hidePanel() {
                    this.hided()
            },
            togglePanel2() {
                this.visible2 ? this.hided2() : this.showd2()
            },
            showd2() {
                this.visible2 = true;
                document.addEventListener('click', this.hidePanel2, true)
            },
            hided2() {
                this.visible2 = false;
                document.removeEventListener('click', this.hidePanel2, true)
            },
            hidePanel2() {
                this.hided2()
            },
//            *********************end**********************

            getList(){
                getStrategy({id: this.uid}).then((resp) => {
                    console.log(resp, 'resp--List--ok',resp.data.items[0]);
                    this.ruleObj=resp.data.items[0];
                    this.is_letter=resp.data.items[0].is_letter;
                }).catch((err) => {
                    console.log(err);
                });
// 获取开通套餐的人
//                getPackageDetail({userId: this.uid}).then((resp) => {
//
//                    for(let i in resp.data){
//                        this.options.push({label:resp.data[i].packagePrice+'元/'+resp.data[i].packageValue+resp.data[i].packageUnit,value:resp.data[i].id})
//                    }
//                    console.log(resp, 'PackageDetail22',this.options);
//                }).catch((err) => {
//                    console.log(err);
//                });
                openPackageList({userId: this.uid}).then((resp) => {
                    console.log(resp, 'openPackageList==');
                    for(let i in resp.data){
                        this.options.push({label:resp.data[i].price+'元/'+resp.data[i].value+resp.data[i].unit,value:resp.data[i].id})
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getListPackage(){
                getPackageInfo({userId: this.uid}).then((resp) => {
                    this.remainDay=resp.data.remainDay;
                    this.sumFollow=resp.data.sumFollow;
                    console.log(resp, 'PackageInfo',this.uid,this.sumFollow);
                    if(this.codeFlag&&this.codeFlag==3){

                    }else {
                        if(this.billing==1){
                            if(this.remainDay==0&&this.remainFollow==0){
                               this.payVisible=true
                            }else {
                                this.payVisible=false
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            resetForm(formName) {
                this.pswVisible = false;
                this.$refs[formName].resetFields();
            },
            canlePay(formName) {
                this.payVisible = false;
                this.$refs[formName].resetFields();
                if(this.billing==1){
                    if(this.remainDay==0&&this.remainFollow==0){
                       this.logout()
                    }
                }
            },
            // logout() {
            //     console.log('logout.....................')
            //     this.$store.dispatch('LogOut').then(() => {
            //         this.$router.push({path: '/login'});
            //     }).catch(() => {
            //
            //     })
            // },
            logout() {
                let that=this;
                $.ajax({
                    type: "get",
                    async: true,
                    url: "https://tx.enlink.cn:18990/api/enlink/stop",
                    dataType: "jsonp",
                    timeout:1000,
                    jsonp: "callback",
                    jsonpCallback:"callback",
                    success: function(json){
                    },
                    error: function(){
                    },complete: function(){
                        that.doLogout()
                    }
                })
            },
            doLogout(){
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(() => {

                })
            },
            submitPay(formName) {
//                this.$refs.rulePay.validate((valid) => {
//                    if (valid) {
                        let formPay = {
                            userId:this.uid,
                            packageId:this.formPay.packageId,
                            num:Number(this.formPay.num)
                        };
                        console.log(formPay,'formPay===');
                        openPackage(formPay).then((resp)=> {
                            console.log(resp, 'resp');
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '套餐充值成功'
                                });
                                this.payVisible = false;
                                this.$refs[formName].resetFields();
                                // this.getListPackage();
                            }else if(resp.status == -1){
                                this.$message({
                                    type: 'warning',
                                    message: resp.msg
                                });
                            } else {
                                    this.$message({
                                        type: 'warning',
                                        message:  resp.msg
                                    });

                            }
                        }).catch(e=> {
                            console.log("修改出错", e);
                        });
//                    }
//                    else {
//                        return false;
//                    }
//                });
            },
            submitForm(formName) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let ruleFormPsw = {
                            name: this.c_name,
                            old_password: this.ruleForm.old_password,
                            new_password: this.ruleForm.new_password,
                            passwd_len: this.ruleForm.new_password.length
                        };
                        console.log("ruleForm", ruleFormPsw, this.c_name)
                        modifyPsw(ruleFormPsw).then((resp)=> {
                            console.log(resp, 'resp')
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                                this.pswVisible = false;
                                this.$refs[formName].resetFields();
                            }else if(resp.status == -1){
                                this.$message({
                                    type: 'warning',
                                    message: '您暂无修改密码权限'
                                });
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '修改失败'
                                });
                            }
                        }).catch(e=> {
                            console.log("修改出错", e);
                        });
                    } else {
                        return false;
                    }
                });
            },
//            *********downLoad**********
            downLoad(){
                console.log(this, '------', this.$router, 'this.$router')
                this.$router.push({path: '/downLoad'});
            },
            toApply(){
                console.log(this, 'toApply', this.$router, 'this.$router')
                this.$router.push({path: '/admin/web'});
            },
            toAccount(){
                console.log(this, '------', this.$router, 'this.$router')
                this.$router.push({path: '/admin/myAccount'});
            },
//            homeWeb(){
//                this.$router.push({path: '/admin/web'});
//            },
            handleClose() {
                this.$confirm('确认关闭？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {
                        });
            }
        }
    }
</script>
<style>
    .main-header{
        position: absolute;
        width:100%;
    }
    .nav_left {
        float: left;
        margin-left: 40px;
        height: 80px;
        line-height: 80px;
    }
    /*小屏幕*/
    @media screen and (max-width: 600px) {
        .navbar{

        }
        .navbar-custom-menu>.navbar-nav>li{
            /*定位*/
            position: relative;
        }
        .nav_left {
            display: none;
        }
    }

    .nav_left ul li {
        display: inline-block;
        color: #FFF;
    }

    .nav_left li img {
        /*width: 80px;*/

    }

    .nav_left li:nth-child(1) {
        padding-right: 15px;
    }

    .nav_left li:nth-child(2) {
        padding-top: 2px;
    }

    .nav_left li:nth-child(2) span {
        border-left: 1px solid #fff;
        padding-left: 15px;
    }

    .navbar-nav > .user-menu .user-image {
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        width:25px;
        height:25px;
    }

    .head_li {
        height: 80px;
        line-height: 80px;
        width: 88px;
    }

    .head_li > a {
        display: inline-block !important;
    }

    .head_li > a:hover {
        background-color: #438afe !important;
    }

    .head_li > a:focus {
        background-color: #438afe !important;
    }


</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .msg_ul{
        width: 250px !important;
        position: absolute;
        left: -88px;
        background: #fff;
        .msg_li{
            height: 65px;
            line-height: 65px;
            border-bottom: 1px solid #9b9b9b;
            padding: 0 0 0 10px !important;

            color: #D97B7B;
            .msg_p1{
                text-overflow: ellipsis;
                overflow: hidden;
                width: 155px;
                white-space: nowrap;
                display: inline-block;
                vertical-align: top;
            }
        }
    }
    .sub_ul {
        width: 160px !important;
        left: -53px !important;
        position: absolute;
        background-color: #fff;
        li {
            padding: 0 !important;
            margin-bottom: 23px;
            .sub_div {
                width: 100%;
                height: 50px;
                line-height: 50px;
                a {
                    display: inline-block;
                    width: 100%;
                    border-bottom: 1px solid #f3f3f3;
                    p {
                        margin: 0;
                        span {
                            margin-left: 8px;
                            color: #197cb1;
                            font-size: 16px;
                            vertical-align: middle;
                        }
                    }
                    .sec_p {
                        display: none;
                    }
                }

            }
            .sub_div:hover {
                background-color: #f0f0f0;
                /*p {*/
                    /*span {*/
                        /*margin-left: 8px;*/
                        /*color: #ed8a14;*/
                    /*}*/
                /*}*/
                /*.fir_p {*/
                    /*display: none;*/
                /*}*/
                /*.sec_p {*/
                    /*display: block;*/
                /*}*/
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .el-dialog--tiny {
        width: 25%;
    }
    .logout{
        width: 40%;
    }
    .p_logout{
        margin-left: 10%;
        span{
            margin-left: 20px;
        }
    }

    /* 设置弹出框大小*/
    /*.mail .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.mail .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.mail .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 50% !important;*/
        /*margin-left: 80px;*/
    /*}*/

    /*.mail .el_sel {*/
        /*width: 65% !important;*/
        /*margin-left: 80px;*/
    /*}*/

    /*.mail .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.mail-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 102px;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/

    /*.mail-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.mail .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/
    /*!**!*/
    /*.pay-form .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.mail-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    /*}*/
    /*.el-dialog__footer{*/
        /*line-height: 77px;*/
    /*}*/
    /*.mail-form .foot{*/
        /*margin-top: 20px;*/
        /*margin-right: 151px;*/
    /*}*/
</style>
<style rel="stylesheet/scss" lang="scss">
    /*logDialog*/
    /* 设置弹出框大小*/
    /*.logDialog .dialog {*/
        /*!*min-width: 830px;*!*/
    /*}*/

    /*.logDialog .el-dialog--small {*/
        /*width: 25%;*/
        /*min-width: 380px;*/
    /*}*/

    /*.logDialog .el-dialog__header {*/
        /*!*padding-left: 5px;*!*/
        /*height: 40px;*/
        /*background: #197CB1;*/
        /*padding: 0;*/
        /*line-height: 40px;*/
    /*}*/

    /*.logDialog .el-dialog__headerbtn {*/
        /*margin-right: 10px;*/
    /*}*/

    /*.logDialog .el-dialog__title {*/
        /*margin-left: 20px;*/
        /*color: #fff;*/
    /*}*/

    /*.logDialog .el-dialog__body {*/
        /*padding: 20px 20px 0;*/
        /*color: #48576a;*/
        /*font-size: 18px;*/
        /*.pay_sel{*/
            /*input{*/
                /*border: 1px solid #bfcbd9 !important;*/
            /*}*/
            /*input:hover{*/
                /*border: 1px solid #bfcbd9 !important;*/
            /*}*/
            /*input:active{*/
                /*border: 1px solid #bfcbd9 !important;*/
            /*}*/
        /*}*/
    /*}*/

    /*.logDialog .el-dialog__footer {*/
        /*!*line-height: 30px;*!*/
        /*height: 95px;*/
        /*background: #fff;*/
        /*border: none;*/
        /*padding-left: 20px;*/
        /*text-align: left;*/
        /*.p1 {*/
            /*text-align: right;*/
        /*}*/
        /*.p2 {*/
            /*display: inline-block;*/
            /*.readed {*/
                /*color: orange;*/
                /*font-size: 18px;*/
                /*vertical-align: middle;*/
                /*margin-left: 13px;*/
                /*margin-right: 30px;*/
            /*}*/
        /*}*/
    /*}*/
    .mail-form .foot {
        /*margin-top: 20px;*/
        /*margin-right: 151px;*/
    }
    .pay-form  .el-form-item__label{
        margin-left: 0!important;
    }
</style>
<style>
    @media (min-width: 601px) and (max-width: 1100px){
        .nav_left{
            margin-left: 12px;
        }
        .nav_title{
            display: none;
        }
        .head_li{
            float: left;
            width: 70px;
        }
    }
    @media screen and (max-width: 600px) {
        .head_li{
            float: left;
            width: 75px;
        }
        .el-dialog--tiny {
            width: 25%;
        }
        /* 设置弹出框大小*/
        .mail .dialog {
            /*min-width: 430px;*/
            min-width: 80vw;
            /*top:30% !important;*/
            margin-top: 20%;
        }

        .mail .el-dialog__header {
            padding: 5px;
            height:30px ;
        }
        .mail .el-dialog__title {
            margin-left:11px;
            font-size: 12px;
            font-weight:100 ;
        }
        .mail .el-dialog__headerbtn, .el-pagination__rightwrapper{
            margin-right: 10px;
        }

        .mail .el_put {
            position: relative;
            display: inline-block;
            width: 86% !important;
            margin-left: 0;
            font-size: 12px;
        }

        .mail .el_sel {
            width: 65% !important;
            margin-left: 0;
        }
        .mail-form .el-form-item__label {
            float: left;
            min-width: 66px;
            font-size: 12px;
            margin-left: 0;
            font-weight: 100;
        }

        .mail-form .el-form-item {
            margin-bottom: 17px;
        }

        .mail .el-dialog__body {
            padding: 13px 0px;
            color: #48576a;
            font-size: 14px;
        }

        .mail-form .el-form-item__error {
            color: #ff4949;
            font-size: 10px;
            line-height: 1;
            padding-top: 0;
            position: absolute;
            top: 100%;
            left: 1px;
        }
        .mail-form .foot{
            margin-top: 0;
            margin-right: 0;
        }
        .el-dialog__footer{
            height:55px !important;
            line-height: 38px !important;
        }
        .logDialog .dialog{
            top:40% !important;
            min-width: 80vw;
            margin-top: 20%;
        }
    }
</style>
<!--移动版-->
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 1100px){
        .mobileDialog{
            .el-dialog{
                width: 70vw !important;
                min-width: 80vw !important;
                max-width: 400px !important;
                /*margin-top: 20%;*/
            }
        }
    }
    @media screen and (max-width: 600px){
        .mobileDialog{
            .el-dialog{
                width: 70vw !important;
                min-width: 80vw !important;
                max-width: 400px !important;
                margin-top: 20%;
            }
            .el-dialog__body{
                padding: 20px;
            }
            .el-dialog__header{
                height: 39px;
                padding: 10px 10px 0 10px;
                .el-dialog__title{
                    margin-left: 10px;
                }
            }
            .el-dialog__footer{
                height: 56px !important;
            }
        }
    }

</style>



