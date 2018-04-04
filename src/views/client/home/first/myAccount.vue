<template>
    <div style="height: 100%;overflow:hidden;">
        <div class="web" style="">
            <img src="../../../../assets/nav/account.png" alt="" class="tab_img"
                 style="">
            <el-tabs v-model="activeName" @tab-click="handleClick" style="min-width: 269px;">
                <el-tab-pane label="我的账号" name="" :disabled="true" style="margin-left: 10px;color: #438AFE;"></el-tab-pane>
                <el-tab-pane label="登录安全" name="first">
                    <loginSafety ></loginSafety>
                    <!--:safaData=""-->
                </el-tab-pane>
                <el-tab-pane label="个人信息" name="second">
                    <personInfo></personInfo>

                </el-tab-pane>
            </el-tabs>
        </div>


    </div>
</template>
<script>
    import circleChart from 'components/Charts/circleChart';
    import flowChart from 'components/Charts/flowChart';
    import flowChartMid from 'components/Charts/flowChartMid';
    import flowChartRight from 'components/Charts/flowChartRight';

    import loginSafety from './loginSafety/loginSafety';
    import personInfo from './personInfo/personInfo';

    import {getResourceList, getCollectList, collectModify} from 'api/web/web';
    import {emailModPsw,telModPsw,loginType,getCodeMsg, modName,logout,modEmail,getAllMsg,getTelCodeMsg,getPackageInfo,getPackageDetail} from 'api/myAcount/myAcount'
    import {modifyPsw, getStrategy} from "../../../../api/login";
    import {mapGetters} from 'vuex'
    import {format, formatTime, formatGetTime} from "../../../../api/timedFun";
    import {formatSeconds2} from '../../../../utils/dateUtil'

    export default ({
        components: {
            circleChart,
            flowChart,
            flowChartMid,
            flowChartRight,
            loginSafety,
            personInfo
        },
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'login_timestamp',
                'mail',
                'full_name',
                'modPsw',
                'login_msg',
            ]),
        },

        data() {
            //********规则 原密码**********************
            let oldPsw2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    if (/^[A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                        callback(new Error("请输入6-20位字母、数字、英文字符"));
                    } else {
                        callback();
                    }
                }
            };
            // ****************start1*********************
            let newPsw2 = (rule, value, callback) => {
                let num=/[0-9]*/.test(value);
                let letter=/[A-Za-z]$/.test(value);
                let symbol=/[~!@#$%^&*()_+{}|:;"',.<>?\/]*/.test(value);

                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==0){
                        if (/^[0-9]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^[a-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^[~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\d~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[a-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位字母、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else{
                        if (/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\da-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位数字、字母、英文符号"+value.length));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }
                }
            };
            //                    ^(?=.*\d)(?=.*[a-z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/]).{6,20}$
            //  **********end1****************
            let confirmPsw2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.ruleForm2.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let newPswTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==0){
                        if (value.length>5&&value.length<21 ) {
                            callback(new Error("密码长度在6-20之间"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==0){
                        if (/^[0-9]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^[a-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^[~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\d~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[a-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位字母、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else{
                        if (/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\da-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位数字、字母、英文符号"+value.length));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }
                }
            };
            let confirmPswTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.formTel.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            // ********邮箱密码--规则**********************
            let oldPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    if (/^[A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                        callback(new Error("请输入6-20位字母、数字、英文字符"));
                    } else {
                        callback();
                    }
                }
            };
            let newPswMail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==0){
                        if (/^[0-9]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^[a-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^[~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==0){
                        if (/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、字母"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==1 && this.ruleObj.is_letter==0 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\d~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false) {
                            callback(new Error("请输入6-20位数字、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else if(this.ruleObj.is_number==0 && this.ruleObj.is_letter==1 && this.ruleObj.is_special_symbol==1){
                        if (/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[a-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位字母、英文符号"));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }else{
                        if (/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/])[\da-zA-Z~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value)==false) {
                            callback(new Error("请输入6-20位数字、字母、英文符号"+value.length));
                        }
                        if (this.ruleForm.confirm_password !== '') {
                            this.$refs.ruleForm.validateField('confirm_password');
                        }
                        callback();
                    }
                }
            };
            let confirmPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.ruleForm.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                mealList: [],//套餐数组列表,
                activeName: 'first',
              //**********************************
                userName: this.c_name,
                tel: this.$store.getters.tel,
                //**************************
                mailVisible: false,
                pswVisible: false,
                ruleObj: {},
                telVisible:false,
               //*********原密码修改密码***********
                rules2: {
                    old_password: [
                        {required: true, validator: oldPsw2, trigger: 'blur'}
                    ],
                    new_password: [
                        {required: true, validator: newPsw2, trigger: 'blur'}
                    ],
                    confirm_password: [
                        {required: true, validator: confirmPsw2, trigger: 'blur'}
                    ],
                },
                ruleForm2: {
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                },
//                *********邮箱修改密码***********
                rules: {
                    old_password: [
                        {required: true, validator: oldPsw, trigger: 'blur'}
                    ],
                    new_password: [
                        {required: true, validator: newPswMail, trigger: 'blur'}
                    ],
                    confirm_password: [
                        {required: true, validator: confirmPsw, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    email: '',
                    code: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                },
//                ***********手机短信修改密码*************
                formTel:{
                    tel: '',
                    code: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                },

            };
        },
        created() {
            if (this.$route.fullPath.indexOf('url_type=3')>0) {
                this.activeName='first'
            }
            if (this.$route.fullPath.indexOf('url_type=4')>0){
                this.activeName='second'; //url_type=4
            }
            this.getList();
            this.getListMod();
        },
        filters: {//过滤时间戳
            format_test: function (value) {
                return formatTime(value)
            },
            format_msg: function (value) {
                    return formatGetTime(value)
            },
        },
        methods: {
            readyInform() {
                // 调用导航栏里的非父子组件
                this.$root.Bus.$emit('informTipmsg', 123)
            },
            getListMod(){
                this.user_name = this.$store.getters.c_name
                this.user_fullname = this.$store.getters.full_name;
                this.user_email = this.$store.getters.mail;
                this.ruleForm.email = this.mail;
                this.formTel.tel=this.$store.getters.tel;
                this.user_tel=this.$store.getters.tel;
            },
//            ************手机号修改*************************
            getTelCode(){
                getTelCodeMsg(this.user_name).then((resp) => {
                    console.log(this.tel, 'this.mail')
                    console.log(resp, 'getTelCode--');
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitFormTel(formName) {
                this.$refs.formTel.validate((valid) => {
                    if (valid) {
                        let ruleFormPsw = {
                            name: this.user_name,
                            new_password: this.formTel.new_password,
                            passwd_len: this.formTel.new_password.length,
                            auth_code: this.formTel.code
                        };
                        console.log("formTel-mail", ruleFormPsw, this.name);

                        if(this.ruleObj.is_username_equal_pw!=1){//启动用户名和密码相同
                            if(ruleFormPsw.name==ruleFormPsw.new_password){
                                this.$message({
                                    type: 'warning',
                                    message: '用户名和密码不能相同'
                                });
                            }else{
                                telModPsw(ruleFormPsw).then((resp) => {
                                    console.log(resp, 'resp');
                                    if (resp.status == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功'
                                        });
                                        this.mailVisible = false;
                                        this.logout();
                                        this.$refs[formName].resetFields();
                                    } else if(resp.status == -1){
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
                        }else {//不同
                            telModPsw(ruleFormPsw).then((resp) => {
                                console.log(resp, 'resp');
                                if (resp.status == 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    });
                                    this.mailVisible = false;
                                    this.logout();
                                    this.$refs[formName].resetFields();
                                } else if(resp.status == -1){
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


                    } else {
                        return false;
                    }
                });
            },
            canleRead() {
                this.msgVisible = false;
            },
            getName(value) {
                if (/^[A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{1,20}$/.test(value) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法用户名！'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            getFullName(value) {
                if (/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{1,20}$/.test(value) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法全称！'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            getEmail(value) {
                console.log(value,'val--')
                if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法邮箱！'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            getTel(value) {
                if (/^(13|14|15|18|17)[0-9]{9}$/.test(value) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法手机号！'
                    });
                    return false;
                } else {
                    return true;
                }
            },
            canleName() {
                this.nameShow = true;
                this.userName = ''
            },
            canleFullName() {
                this.fullNameShow = true;
                this.fullName = ''
            },
            canleEmail() {
                this.emailShow = true;
                this.e_mail = ''
            },
            canleTel() {
                this.telShow = true;
                this.tel = ''
            },
            submitName() {
                if (this.getName(this.userName) == true) {
                    modName({id: this.uid, name: this.userName}).then((resp) => {
                        console.log({id: this.uid, name: this.userName}, 'obj');
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法用户名！'
                    });
                }
            },
            submitFullName() {
                if (this.getFullName(this.fullName) == true) {

                    modName({id: this.uid, full_name: this.fullName}).then((resp) => {
                        if (resp.status == 1) {
                            this.$store.dispatch('modPerMsg',{full_name: this.fullName}).then((res) => {
                                console.log(res,'modget11')

                            }).catch(err => {
                                this.loading = false;
                                console.log(err);
                            });
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
                            });
                            this.fullNameShow = true;
                            this.getListMod()
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法用户名！'
                    });
                }
            },
            submitEmail() {
                if (this.getEmail(this.e_mail) == true) {
                    modEmail({id: this.uid, email: this.e_mail}).then((resp) => {
                        if (resp.status == 1) {
                            this.$store.dispatch('modPerMsg',{email: this.e_mail}).then((res) => {
                                console.log(res,'modget11')

                            }).catch(err => {
                                this.loading = false;
                                console.log(err);
                            });
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
                            });
                            this.emailShow = true;
                            this.getListMod()
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法邮箱！'
                    });
                }
            },
            submitTel() {
                if (this.getTel(this.tel) == true) {
                    modEmail({id: this.uid, tel: this.tel}).then((resp) => {
                        if (resp.status == 1) {

                            this.$store.dispatch('modPerMsg',{tel: this.tel}).then((res) => {
                                console.log(res,'modget11')

                            }).catch(err => {
                                this.loading = false;
                                console.log(err);
                            });
                            this.telShow = true;
                            this.getListMod()
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入合法手机号！'
                    });
                }
            },
//            ************公共退出接口********************
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
//            **********************************************
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getList() {
                getPackageInfo({userId: this.uid}).then((resp) => {

                }).catch((err) => {
                    console.log(err);
                });
                getPackageDetail({userId: this.uid}).then((resp) => {
                    console.log(resp, 'PackageDetail');
                    this.mealList=resp.data;
                }).catch((err) => {
                    console.log(err);
                });
                /*管理端控制的密码策略*/
                getStrategy({id: this.uid}).then((resp) => {
                    this.ruleObj=resp.data.items[0];
                }).catch((err) => {
                    console.log(err);
                });
            },
//            **********原密码修改密码提交****************
            submitForm2(formName) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        let ruleFormPsw2 = {
                            name: this.user_name,//登录用户名
                            old_password: this.ruleForm2.old_password,
                            new_password: this.ruleForm2.new_password,
                            passwd_len: this.ruleForm2.new_password.length
                        };
                        if(this.ruleObj.is_username_equal_pw!=1) {
                            if (ruleFormPsw2.name == ruleFormPsw2.new_password) {
                                this.$message({
                                    type: 'warning',
                                    message: '用户名和密码不能相同'
                                });
                            } else {
                                modifyPsw(ruleFormPsw2).then((resp) => {
                                    console.log(resp, 'resp')
                                    if (resp.status == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功！'
                                        });
                                        this.pswVisible = false;
                                        this.$refs[formName].resetFields();
                                        this.logout();//修改后退出
                                    } else if (resp.status == -1) {
                                        this.$message({
                                            type: 'warning',
                                            message: resp.msg
                                        });
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: '其他错误'
                                        });
                                    }
                                }).catch(e => {
                                    console.log("原密码错误，请重新输入", e);
                                });
                            }
                        }else {
                            modifyPsw(ruleFormPsw2).then((resp) => {
                                console.log(resp, 'resp')
                                if (resp.status == 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功！'
                                    });
                                    this.pswVisible = false;
                                    this.$refs[formName].resetFields();
                                    this.logout();//修改后退出
                                } else if (resp.status == -1) {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.msg
                                    });
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '其他错误'
                                    });
                                }
                            }).catch(e => {
                                console.log("原密码错误，请重新输入", e);
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
//            **********邮箱修改密码提交****************
            getCode() {
                getCodeMsg(this.mail).then((resp) => {
                    console.log(this.mail, 'this.mail')
                    console.log(resp, 'getCode--');
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitForm(formName) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let ruleFormPsw = {
                            name: this.user_name,
                            new_password: this.ruleForm.new_password,
                            passwd_len: this.ruleForm.new_password.length,
                            auth_code: this.ruleForm.code
                        };
                        if(this.ruleObj.is_username_equal_pw!=1) {
                            if (ruleFormPsw.name == ruleFormPsw.new_password) {
                                this.$message({
                                    type: 'warning',
                                    message: '用户名和密码不能相同'
                                });
                            } else {
                                emailModPsw(ruleFormPsw).then((resp) => {
                                    console.log(resp, 'resp')
                                    if (resp.status == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改成功！'
                                        });
                                        this.mailVisible = false;
                                        this.$refs[formName].resetFields();
                                        this.logout();//修改后退出
                                    } else if (resp.status == -1) {
                                        this.$message({
                                            type: 'warning',
                                            message: resp.msg
                                        });
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: '其他错误'
                                        });
                                    }
                                }).catch(e => {
                                    console.log("修改出错", e);
                                });
                            }
                        }else {
                            emailModPsw(ruleFormPsw).then((resp) => {
                                console.log(resp, 'resp')
                                if (resp.status == 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功！'
                                    });
                                    this.mailVisible = false;
                                    this.$refs[formName].resetFields();
                                    this.logout();//修改后退出
                                } else if (resp.status == -1) {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.msg
                                    });
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '其他错误'
                                    });
                                }
                            }).catch(e => {
                                console.log("修改出错", e);
                            });
                        }

                    } else {
                        return false;
                    }
                });
            },
//            ****************************************************
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log('1 == this.$route.query.need')
                        //1 表示启动了首次登录，必须修改密码功能
                        if (1 == this.$route.query.need) {
                            console.log('need logout')
                            this.logout()
                        }
                        done();
                    })
                    .catch(_ => {
                    });
            },
            resetForm(formName) {
                this.pswVisible = false;
                this.mailVisible = false;
                this.telVisible=false;
                this.$refs[formName].resetFields();
                //1 表示启动了首次登录，必须修改密码功能
                if (1 == this.$route.query.need) {
                    console.log('need logout')
                    this.logout()
                }
            },
        }
    })
</script>
<style>
    .read {
        /*已读消息字体颜色*/
        color: #C52C2C !important;
    }

    .blueColor {
        /*表盘轮播颜色*/
        background: #228B22;
    }

    /********************************/
    .act_span {
        display: inline-block;
        width: 20px;
        height: 20px;
        /*margin-left: 5px;*/
        border-radius: 50%;
        border: 1px solid lightgrey;
    }

    .act_span2 {
        margin: 0 5px;
    }

    .block .el-pagination .el-pagination span {
        display: none;
    }

    .block .el-pagination span {
        display: none;
    }

    .block .el-pagination .el-pager li {
        border-radius: 50%;
        color: rgb(209, 219, 229);
        margin-right: 20px;
        background-color: rgb(209, 219, 229);
    }

    .block .el-pagination .el-pager li.active {
        background-color: #20a0ff;
        color: #20a0ff;
    }

    .block .el-pagination .btn-prev {
        display: none;
    }

    .block .el-pagination .btn-next {
        display: none;
    }

    /**************************/
    .el-tabs__header {
        background-color: #f5f5f5;
    }

    .el-tabs__header .el-tabs__nav {
        height: 60px;
    }

    .el-tabs__active-bar {
        background-color: #438AFE;
        margin-left: 83px;
    }

    .el-tabs__header .is-active {
        color: #438AFE;
        line-height: 60px;
    }

    .el-tabs__item.is-disabled {
        margin-left: 43px;
        margin-right: 43px;
        color: #438AFE;
        font-size: 16px;
        font-weight: bold;
    }


    .el-tabs__content {
        margin-left: 150px;
        margin-top: 80px;
    }

    .web {
        min-width: 1006px;
        min-height: 714px;
        width: calc(100% - 350px);
        width: -moz-calc(100% - 350px);
        width: -webkit-calc(100% - 350px);
        /*min-height: 100%;*/
        padding-top: 80px;
        /*height: calc(100% - 80px);*/
        float: left;
        position: absolute;
        background: #fff;
    }
    .web .tab_img{
        position: absolute;
        top: 100px;
        left: 34px;
        width: 19px;
        z-index:100
    }
    /***************tab_right****************/
    .tab_right_header {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        overflow: hidden;
        width: 170px;
        height: 64px;
        line-height: 27px;
        border-bottom: 1px solid #f5f5f5;
        /*background-color: #f5f5fd;*/
    }

    .tab_right_header > div {
        float: left;
    }

    .tab_right_header > div:nth-child(1) {
        margin-right: 9px;
    }

    .tab_right_header > div:nth-child(1) img {
        width: 60px;
        border-radius: 30px;
    }

    .tab_right_header > div:nth-child(2) img {
        width: 20px;
        vertical-align: middle;
        color: green;
    }

    .tab_ul li {
        overflow: hidden;
        height: 70px;
        line-height: 70px;
    }

    .tab_ul li:nth-child(even) {
        background: #f0f0f0;
    }

    .tab_ul li:nth-child(odd) {
        background: #f5f5f5;
    }

    .tab_ul li div img {
        width: 35px;
    }

    .tab_ul li:first-child {
        border-top: 1px solid grey;
    }

    .tab_ul li:last-child {
        border-bottom: 1px solid grey;
    }

    .tab_ul li > div:nth-child(1) {
        float: left;
        margin-left: 20px;
    }

    .tab_ul li > div:nth-child(1) > span:nth-of-type(1) {
        color: #7e7e7e;
    }

    .tab_ul li > div:nth-child(2) {
        width: 100px;
        float: right;
        color: #adadad;
        font-size: 18px;
        text-align: center;
        /*background-color: #f7f7f7;*/
    }

    .tab_ul li > div:nth-child(2):hover {
        background-color: green;
    }

    .tab_ul li > div:nth-child(1) > span:nth-of-type(1) {
        position: relative;
        top: -6px;
        left: 5px;
    }

    .tab_ul li > div:nth-child(1) > span:nth-of-type(2) {
        position: relative;
        top: 8px;
        left: -44px;
        font-size: 10px;
        color: green;
    }

    /*********ele-ui**********/

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-light {
        background: #f5f5f5;
    }

    .grid-content {
        /*border-radius: 4px;*/
        min-height: 75px;
        background: #f5f5f5;
        /*height: 110px;*/
    }

    .row-bg {
        padding: 10px 0;
    }
</style>
<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    .main {
        overflow: hidden;
        padding-bottom: 50px;
        width: 100%;
    }

    /********标签页***********/
    .tab-head {
        overflow: hidden;
        line-height: 53px;
    }

    .tab-head li {
        width: 100px;
        margin: 0;
        float: left;
        text-align: center;
    }

    .tab-content {
        margin-left: 90px;
    }

    .tab-content div {
        display: none;
    }

    .selected {
        background-color: cornflowerblue;
    }

    .tab-content .show {
        display: block;
    }

    .deviceColor {
        color: grey;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 1366px){
        .per_package{
            width: 273px;
        }
    }
    @media (min-width: 601px) and (max-width: 1100px){
        .web_right{
            width: 40%;
            display: none;
        }
        .web{
            width: 100vw !important;
            min-width: 100vw !important;
            min-height:100%;
            .tab_img{
                position: absolute;
                top: 99px;
                left: 11px;
                z-index:100
            }
            .el-tabs__content {
                margin-left: 0 !important;
                margin-top: 0 !important;
            }
            .ul_account {
                width: 47%;
                margin:auto;
                margin-bottom: 20px;
                margin-left:10px;
            }
            .ul_account_b{
                height: 545px !important;
            }
            .ul_per {
                width: 48%;
                margin:auto;
                margin-left: 10px;
                margin-bottom: 20px;
                .div_one{
                    font-size: 12px;
                    .sp_wid{
                        width: 51px !important;
                    }
                    input{
                        width: 35vw;
                        max-width:150px;
                        border: none;
                    }
                }
            }
        }
        .mail .dialog {
            min-width: 80vw;
            margin-top: 20%;
            max-width: 700px;
        }
        .public .dialog{
            max-width: 700px;
            /*min-width: 0;*/
        }

        .mail .el-dialog__header {
            padding: 5px;
            height:55px ;
        }
        .mail .el-dialog__title {
            margin-left:11px;
            font-size: 16px;
            font-weight:100 ;
        }
        .mail .el-dialog__headerbtn, .el-pagination__rightwrapper{
            margin-right: 10px;
        }

        .mail .el_put {
            position: relative;
            display: inline-block;
            width: 67% !important;
            margin-left: 0;
            font-size: 12px;
        }

        .mail .el_sel {
            width: 65% !important;
            margin-left: 0;
        }
        .mail-form .el-form-item__label {
            float: left;
            min-width: 102px;
            font-size: 12px;
            margin-left: 0;
            font-weight: 100;
        }

        .mail-form .el-form-item {
            margin-bottom: 17px;
        }

        .mail .el-dialog__body {
            /*padding: 13px 0;*/
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
        ************************************************
        .mail .el_check{
            width: 51% !important;
        }
        .mail  .el_check_btn span{
            font-size: 10px !important;
        }
        .cal_btn{
            font-size: 10px !important;
        }
        .confirm_btn{
            font-size: 10px !important;
        }

        .msgDialog_app{
            .el-dialog--small{
                width:86%;
            }
            .el-dialog__body{
                font-size: 14px;
            }
            .el-dialog__footer{
                height: 60px !important;
            }
        }

        .el-tabs__item.is-disabled {
            margin-left: 20px;
            margin-right: 43px;
            color: #1d86c1;
            font-size: 16px;
            font-weight: bold;
        }
        .el-tabs__active-bar {
            margin-left: 78px !important;
            width: 58px!important;
        }

    }


    @media screen and (max-width: 600px){
        .web_right{
            width: 40%;
            display: none;
        }
        .web{
            width: 100vw !important;
            min-width: 100vw !important;
            min-height:100%;
            .tab_img{
                position: absolute;
                top: 99px;
                left: 11px;
                z-index:100;
                display: none;
            }
            .el-tabs__content {
                margin-left: 0 !important;
                margin-top: 0 !important;
            }
            .ul_account {
                width: 87%;
                float: none;
                margin:auto;
                margin-bottom: 20px;
            }
            .ul_account_b{
                height: 200px !important;
            }
            .ul_per {
                width: 91%;
                float: none;
                margin:auto;
                margin-bottom: 20px;
                .div_one{
                    font-size: 12px;
                    .sp_wid{
                        width: 51px !important;
                    }
                   input{
                       width: 35vw;
                       max-width:150px;
                       border: none;
                   }
                }
            }
        }
        /**************弹窗********/
        .mail .dialog {
            /*min-width: 430px;*/
            min-width: 80vw;
            /*top:30% !important;*/
            margin-top: 20%;
        }

        .mail .el-dialog__header {
            /*padding-left: 5px;*/
            padding: 5px;
            height:30px ;
        }
        .mail .el-dialog__title {
            /*padding-left: 5px;*/
            /*padding: 0;*/
            /*height:30px;*/
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
            min-width: 97px;
            font-size: 12px;
            margin-left: 0;
            font-weight: 100;
        }

        .mail-form .el-form-item {
            margin-bottom: 17px;
        }

        .mail .el-dialog__body {
            padding: 13px 0;
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
            /*line-height: 38px !important;*/
        }
        /**************************************************/
        .mail .el_check{
            width: 51% !important;
        }
        .mail  .el_check_btn span{
            font-size: 10px !important;
        }
        .cal_btn{
            font-size: 10px !important;
        }
        .confirm_btn{
            font-size: 10px !important;
        }

        .msgDialog_app{
            .el-dialog--small{
                width:86%;
            }
            .el-dialog__body{
                font-size: 14px;
            }
            .el-dialog__footer{
                height: 100px !important;
            }
        }
        .el-tabs__item{
            font-size: 12px;
        }
        .el-tabs__item.is-disabled {
            margin-left: 20px;
            margin-right: 43px;
            color: #1d86c1;
            font-size: 12px;
            font-weight: bold;
            display: none;
        }
        .el-tabs__active-bar {
            margin-left: 10px !important;
            width: 58px!important;
        }

    }
</style>
