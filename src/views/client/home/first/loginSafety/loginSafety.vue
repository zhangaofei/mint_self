<template>
    <div>
        <ul class="ul_account" style="min-width: 269px;">
            <li class="li_a">
                <h3>密码修改</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    您可以使用密码来保护自己的账号，也可以通过两部验证功能为账号增
                    加一道安全保障（当您登录账号时，该功能将向您的手机发送需要输入知道一次
                    性验证码）。这样，即使有人盗取您的密码，也无法登录您的账号。
                </p>
                <p style="font-size: 14px;color: #c11d1d;">请注意:要更改这些设置，您需要确认自己的密码。</p>
            </li>
            <li class="li_a">
                <div class="div_fir">
                    <div class="div_a">
                        <img src="../../../../../assets/myAccount/psw_g.png" alt="" class="img_a">
                        <p class="p_a">
                            <span>通过原密码修改</span><br>
                        </p>
                    </div>
                    <div class="div_b" @click="pswVisible=!pswVisible">
                        <img src="../../../../../assets/myAccount/psw_y.png" alt="" class="img_a">
                        <p class="p_a">
                            <span>通过原密码修改</span><br>
                        </p>
                    </div>
                </div>
            </li>
            <li class="li_a">
                <div class="div_fir">
                    <div class="div_a">
                        <img src="../../../../../assets/myAccount/mail_g.png" alt="" class="img_a img_ab">
                        <p class="p_a">
                            <span>通过电子邮箱修改</span><br>
                        </p>
                    </div>
                    <div class="div_b" @click="mailVisible=!mailVisible">
                        <img src="../../../../../assets/myAccount/mail_y.png" alt="" class="img_a img_ab">
                        <p class="p_a">
                            <span>通过电子邮箱修改</span><br>
                        </p>
                    </div>
                </div>
            </li>
            <li class="li_a">
                <div class="div_fir">
                    <div class="div_a">
                        <img src="../../../../../assets/myAccount/phone_g.png" alt="" class="img_a">
                        <p class="p_a">
                            <span>通过手机短信修改</span><br>
                        </p>
                    </div>
                    <div class="div_b" @click="telVisible=!telVisible">
                        <img src="../../../../../assets/myAccount/phone_y.png" alt="" class="img_a">
                        <p class="p_a" >
                            <span>通过手机短信修改</span><br>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="ul_account ul_account_b">
            <li class="lia">
                <h3>近期消息记录</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    查看过去30天内的消息记录
                </p>
            </li>
            <li class="lia" v-for="item in msgs">
                <div class="div_sec" ref="msgTime" :class="[item.status==0?'':'read']">
                    <!--//zaf-->
                    <p class="p_a" @click="zaf(item)">{{item.msg}}</p>
                    <p class="p_b">
                        <span>{{item.time | format_msg}}</span>
                        <span @click="lookMsg(item.msg,item.id,item.time,$event)"><b v-if="item.status" style="cursor:pointer">未读</b>
                                        <b v-else style="cursor:pointer">已读</b></span>
                    </p>
                </div>
            </li>
        </ul>
        <ul class="ul_account ul_account_c">
            <li class="lic">
                <h3>最近使用过设备</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    查看特定设备在何时何处访问过您的账号
                </p>
            </li>
            <li class="lic">
                <div class="div_thir">
                    <div class="img_c"><img src="../../../../../assets/myAccount/mac.png" alt=""></div>
                    <p class="p_c">
                        <span>MAC</span><br>
                        <span ref="deviceRef1">{{device1}}</span>
                    </p>
                </div>
            </li>
            <li class="lic">
                <div class="div_thir">

                    <div class="img_c"><img src="../../../../../assets/myAccount/img_win.png" alt=""></div>
                    <p class="p_c">
                        <span>Windows</span>
                        <br>
                        <!--<span :class="[appType0=='Windows PC'?classA:'']">{{device0}}</span>-->
                        <span ref="deviceRef0">{{device0}}</span>
                        <!--<span :class="[appType2=='Windows PC'?classA:'']" v-if="appType2=='Windows PC'">{{device3}}3</span>-->
                    </p>
                </div>
            </li>
            <li class="lic">
                <div class="div_thir">
                    <div class="img_c" style=""><img src="../../../.././../assets/myAccount/img_iPhone.png"
                                                     alt=""></div>
                    <p class="p_c">
                        <span>iPhone</span><br>
                        <span ref="deviceRef3">{{device3}}</span>
                    </p>
                </div>
            </li>
            <li class="lic">
                <div class="div_thir">
                    <div class="img_c"><img src="../../../../../assets/myAccount/img_iPAD.png" alt=""></div>
                    <p class="p_c">
                        <span>iPad</span><br>
                        <span ref="deviceRef2">{{device2}}</span>
                    </p>
                </div>
            </li>
            <li class="lic">
                <div class="div_thir">
                    <div class="img_c"><img src="../../../../../assets/myAccount/img_android.png" alt=""></div>
                    <p class="p_c">
                        <span>Android</span><br>
                        <span ref="deviceRef4">{{device4}}</span>
                    </p>
                </div>
            </li>
        </ul>
        <div class="msgDialog msgDialog_app public mobileDialog mail">
            <el-dialog
                    title="消息记录"
                    v-model="msgVisible"
                    size="small"
                    custom-class="dialog"
                    top="10%"
                    >
                <!--:before-close="handleClose"-->
                <div class="mail-form">
                    {{content}}
                    <p class="p1" style="position: absolute;right: 25px;"><span>{{contentTime | format_msg}}</span></p>
                </div>
                <div class='form-footer 'slot="footer">
                    <div class="foot">
                        <!--<p class="p1"><span>{{contentTime | format_msg}}</span></p>-->
                        <p class="p2" style="float: right;margin-left: 20px" @click="confirmRead"><img src="../../../../../assets/myAccount/confirm.png" alt=""><span class="readed"> 已读</span></p>
                        <p class="p2" @click="canleRead"><img src="../../../../../assets/myAccount/noRead.png" alt=""> <span class="readed">未读</span></p>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--*********通过手机号修改密码*****************************************************-->
        <div class="mail public">
            <el-dialog
                    title="通过手机号修改密码"
                    v-model="telVisible"
                    size="small"
                    custom-class="dialog public"
                    top="10%">
                <div class="mail-form">
                    <el-form :model="formTel" :rules="rulesTel" ref="formTel" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="手机号" prop="tel" class="">
                            <el-input v-model="formTel.tel" class="el_put" :disabled="true" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="获取验证码" prop="code" class="">
                            <el-input v-model="formTel.code" class="el_put el_check" placeholder="验证码"></el-input>
                            <el-button type="primary" @click="getTelCode" class="el_check_btn btn_save">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password" class="">
                            <el-input v-model="formTel.new_password" class="el_put" placeholder="新密码" type="password"
                                      value="formTel.new_password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirm_password" class="">
                            <el-input v-model="formTel.confirm_password" class="el_put" placeholder="确认密码"
                                      type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class='form-footer ' slot="footer">
                    <div style="" class="foot">
                        <!--<el-button-->
                        <!--@click="resetForm('formTel')"-->
                        <!--class="cal_btn"-->
                        <!--style="margin-right: 40px;background-color: #fff">-->
                        <!--取消-->
                        <!--</el-button>-->
                        <span @click="resetForm('ruleForm')" class="canle">取消</span>
                        <el-button
                                type="primary"
                                class="btn_save"
                                @click="submitFormTel('formTel')">
                            确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--*********通过邮箱修改密码*****************************************************-->
        <div class="mail public">
            <el-dialog
                    title="通过邮箱修改密码"
                    v-model="mailVisible"
                    size="small"
                    custom-class="dialog public"
                    top="10%"
                    :close-on-click-modal="true"
                    >
                <div class="mail-form">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="邮箱" prop="email" class="">
                            <el-input v-model="ruleForm.email" class="el_put" :disabled="true" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="获取验证码" prop="code" class="">
                            <el-input v-model="ruleForm.code" class="el_put el_check " placeholder="验证码"></el-input>
                            <el-button type="primary" @click="getCode" class="el_check_btn btn_save">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password" class="">
                            <el-input v-model="ruleForm.new_password" class="el_put" placeholder="新密码" type="password"
                                      value="ruleForm.new_password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirm_password" class="">
                            <el-input v-model="ruleForm.confirm_password" class="el_put" placeholder="确认密码"
                                      type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class='form-footer ' slot="footer">
                    <div style="" class="foot">
                        <!--<el-button-->
                        <!--@click="resetForm('ruleForm')"-->
                        <!--style="margin-right: 40px;background-color: #fff">-->
                        <!--取消-->
                        <!--</el-button>-->
                        <span @click="resetForm('ruleForm')" class="canle">取消</span>
                        <el-button
                                type="primary"
                                class="btn_save"
                                @click="submitForm('ruleForm')">
                            确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--*********通过原密码修改*****************************************************-->
        <div class="mail public">
            <el-dialog
                    title="通过原密码修改"
                    v-model="pswVisible"
                    size="small"
                    custom-class="dialog public"
                    :close-on-click-modal="false"
                    :show-close=false
                    top="10%"
                    >
                <div class="mail-form">
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"
                             label-width="100px" class="demo-ruleForm2">
                        <el-form-item label="原密码" prop="old_password" class="item_content">
                            <el-input v-model="ruleForm2.old_password" class="el_put" id="pswPut" type="password"
                                      placeholder="原密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password" class="item_content">
                            <el-input v-model="ruleForm2.new_password" class="el_put" placeholder="新密码" type="password"
                                      value="ruleForm2.new_password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirm_password" class="item_content">
                            <el-input v-model="ruleForm2.confirm_password" class="el_put" placeholder="确认密码" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class='form-footer ' slot="footer">
                    <div style="" class="foot">
                        <span @click="resetForm('ruleForm2')" class="canle">取消</span>
                        <el-button
                                type="primary"
                                class="btn_save"
                                @click="submitForm2('ruleForm2')">
                            确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getResourceList, getCollectList, collectModify} from 'api/web/web';
    import {emailModPsw,telModPsw,loginType,getCodeMsg, modName,logout,modEmail,getAllMsg,
        getTelCodeMsg,getPackageInfo,getPackageDetail} from 'api/myAcount/myAcount'
    import {modifyPsw, getStrategy} from "../../../../../api/login";
    import {mapGetters} from 'vuex'
    import {format, formatTime, formatGetTime} from "../../../../../api/timedFun";
    import {formatSeconds2} from '../../../../../utils/dateUtil'
    export default {
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'mail',
                'full_name',
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
            //  ^(?=.*\d)(?=.*[a-z])(?=.*[~!@#$%^&*()_+{}|:;"',.<>?\/]).{6,20}$
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
                msgVisible: false,
                content: '',
                contentTime: '',
                msgId: null,
                msgs: null,
                appType4: '',
                appType3: '',
                appType2: '',
                appType1: '',
                appType0: '',
                device4: '',
                device3: '',
                device2: '',
                device1: '',
                device0: null,
                activeName: 'first',
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
                rulesTel:{
                    old_password: [
                        {required: true, validator: oldPsw2, trigger: 'blur'}
                    ],
                    new_password: [
                        {required: true, validator: newPswTel, trigger: 'blur'}
                    ],
                    confirm_password: [
                        {required: true, validator: confirmPswTel, trigger: 'blur'}
                    ]
                },

            };
        },
        created() {
            console.log('modPsw11',this.full_name,this.mail,this.tel,this.$store);
            //登录后，如果密码即将过期，则会跳转到本页面，直接弹出密码修改框
            console.log(this.$route,'router==')
            if (1 == this.$route.query.need) {
                console.log('need show modify psw')
                this.pswVisible = !this.pswVisible
            }
            else {
                console.log('no need show modify psw')
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
                this.ruleForm.email = this.mail;
                this.formTel.tel=this.$store.getters.tel;
            },
//            ************手机号修改*************************
            getTelCode(){
                getTelCodeMsg(this.c_name).then((resp) => {
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
                            name: this.c_name,
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
//            *********************end********
            lookMsg(val, id, time) {
                this.msgVisible = true;
                this.content = val;
                this.contentTime = time;
                this.msgId = id;

            },
            confirmRead() {
                console.log(this.msgId,'con_msgId2')
                getAllMsg({id: this.uid, msg_id: this.msgId}).then((resp) => {
                    let accMsg=[];
                    let useLen=[];
                    if (resp.status == 1) {
                        this.getList();
                        this.msgVisible = false;
                        console.log(this.$store,'$store')
                        // this.$store.dispatch('loginTyped').then((res) => {
                        //
                        // }).catch(err => {
                        //     console.log(err);
                        // });
                        this.readyInform();
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            canleRead() {
                this.msgVisible = false;
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
                /*管理端控制的密码策略*/
                getStrategy({id: this.uid}).then((resp) => {
                    this.ruleObj=resp.data.items[0];
                }).catch((err) => {
                    console.log(err);
                });
                /*登录的设备类型*/
                loginType().then((resp) => {
                    let items = resp.data.login_type;
                    let userAgent = navigator.userAgent;
                    let Android = userAgent.indexOf("Android");
                    let Win= userAgent.indexOf("Windows");
                    let iPhone = userAgent.indexOf("iPhone;");
                    let iPad = userAgent.indexOf("iPad");
                    let Mac = userAgent.indexOf("Mac");
                    this.msgs = resp.data.msg.reverse();//数组反转
                    let timeArr = [];
                    for (let i = 0; i < items.length; i++) {
                        timeArr.push(items[i].time)
                    }

                    this.appType4 = items[4].login_type;//andriod
                    this.appType3 = items[3].login_type;//iPhone
                    this.appType2 = items[2].login_type;//iPad
                    this.appType1 = items[1].login_type;//Mac
                    this.appType0 = items[0].login_type;//Win
                    if (items[4].time != '' && items[4].time != null) {
                        this.device4 = format(items[4].time * 1000);
                        /*Math.max.apply(null, timeArr) 获取数组中的最大时间戳*/
                        if(Android >= 0){
                            this.device4 = '当前使用设备';
                            this.$refs.deviceRef4.style.color = 'green'
                        }
                    }
                    if (items[3].time != '' && items[3].time != null) {
                        this.device3 = format(items[3].time * 1000);
                        if(iPhone >= 0){
                            this.device3 = '当前使用设备';
                            this.$refs.deviceRef3.style.color = 'green'
                        }
                    }
                    if (items[2].time != '' && items[2].time != null) {
                        this.device2 = format(items[2].time * 1000);
                        if(iPad >= 0){
                            this.device2 = '当前使用设备';
                            this.$refs.deviceRef2.style.color = 'green'
                        }
                    }
                    if (items[1].time != '' && items[1].time != null) {
                        this.device1 = format(items[1].time * 1000);
                        if(Mac >= 0){
                            this.device1 = '当前使用设备';
                            this.$refs.deviceRef1.style.color = 'green'
                        }
                    }
                    if (items[0].time != null && items[0].time != '') {
                        this.device0 = format(items[0].time * 1000);
                        if(Win >= 0){
                            this.$refs.deviceRef0.style.color = 'green'
                            this.device0 = '当前使用设备';
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
//            **********原密码修改密码提交****************
            submitForm2(formName) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        let ruleFormPsw2 = {
                            name: this.c_name,//登录用户名
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
                            name: this.c_name,
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
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             console.log('1 == this.$route.query.need')
            //             //1 表示启动了首次登录，必须修改密码功能
            //             if (1 == this.$route.query.need) {
            //                 console.log('need logout')
            //                 this.logout()
            //             }
            //             done();
            //         })
            //         .catch(_ => {
            //         });
            // },
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
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .green {
        color: green;
    }
    .sp_wid0{
        width: 60px;
        display: inline-block;
    }
    .sp_wid{
        width: 60px;
        display: inline-block;
    }
    .ul_account {
        width: 31%;
        background-color: #FBFBFB;
        padding: 30px;
        min-width:267px;
        float: left;
        margin-right: 2%;
        height: 545px; //高度固定
        .li_a {
            border-bottom: 2px solid #e9e9e9;
            padding: 10px 0;
            h3 {
                color: #1d7eb2;
                font-size: 18px;
                margin: 0 0 20px 0;
            }
            .div_fir {
                .div_a {
                    overflow: hidden;
                    height: 50px;
                    line-height:50px;
                    .img_a {
                        float: left;
                        width: 43px;
                    }
                    .img_ab {
                        margin-top: 11px;
                    }
                    .p_a {
                        margin-left: 5%;
                        float: left;
                        span:nth-child(1) {
                            font-size: 16px;
                        }
                        span:nth-child(2) {
                            position: relative;
                            top: 21px;
                            left: -115px;
                            font-size: 12px;
                        }
                    }
                }
                .div_b {
                    display: none;
                }
            }
            .div_fir:hover {
                .div_a {
                    display: none;
                }
                .div_b {
                    cursor: pointer;
                    overflow: hidden;
                    height: 50px;
                    line-height: 50px;
                    color: orange;
                    display: block;
                    .img_a {
                        float: left;
                        width: 43px;
                    }
                    .img_ab {
                        margin-top: 11px;
                    }
                    .p_a {
                        margin-left: 5%;
                        float: left;
                        span:nth-child(1) {
                            font-size: 16px;
                        }
                        span:nth-child(2) {
                            position: relative;
                            top: 21px;
                            left: -115px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .ul_account_b {
        overflow-y: auto;
        .lia {
            border-bottom: 2px solid #e9e9e9;
            padding: 10px 0;
            h3 {
                color: #1d7eb2;
                font-size: 18px;
                margin: 0 0 20px 0;
            }
            .div_sec {
                color: #7e7e7e;
                .p_a {
                    font-size: 14px;
                    /*color: #7e7e7e;*/
                }
                .p_b {
                    font-size: 12px;
                    /*color: #7e7e7e;*/
                    text-align: center;
                    span:nth-child(1) {
                        float: left;
                        width: 52px;
                        height:17px;
                    }
                    span:nth-child(2) {
                        margin-left: -56px;
                    }
                }
            }
            .div_sec:hover {
                /*color: orange;*/
                h3 {
                    color: #1d7eb2;
                    font-size: 18px;
                    margin: 0 0 20px 0;
                }
                .p_a {
                    font-size: 14px;
                    /*color: #7e7e7e;*/
                    color: orange;
                }
                .p_b {
                    font-size: 12px;
                    /*color: #7e7e7e;*/
                    color: orange;
                    text-align: center;
                    span:nth-child(1) {
                        float: left;
                    }
                }
            }
        }
    }

    .ul_account_c {
        /*border-bottom: 2px solid #e9e9e9;*/
        h3 {
            color: #1d7eb2;
            font-size: 18px;
            margin: 0 0 20px 0;
        }
        .lic {
            /*overflow: hidden;*/
            /*height: 50px;*/
            padding: 10px 0px;
            border-bottom: 2px solid #e9e9e9;
            .div_thir {
                overflow: hidden;
                height: 50px;
                .img_c {
                    width: 50px;
                    text-align: center;
                    float: left;
                    position: relative;
                    top: 4px;
                }
                .p_c {
                    float: left;
                    margin-left: 9%;
                    span:nth-child(1) {
                        font-size: 14px;
                    }
                    span:nth-child(2) {
                        position: relative;
                        top: 21px;
                        left: -115px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

</style>
<!--移动版-->
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 600px){
        .mail{
            .el_check_btn{
                width: 70px;
                padding: 3px 3px ;
            }
        }

    }

</style>
