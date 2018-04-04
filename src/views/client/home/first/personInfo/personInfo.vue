<template>
    <div>
        <ul class="ul_per ">
            <li class="lia">
                <h3>个人信息</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    您可以设置您的个人信息，方便管理员给您更好的划分权限。
                </p>
            </li>
            <li class="lia">
                <div class="div_one">
                    <div class="div_a" v-if="fullNameShow">
                        <span class="sp_wid0">用户全名</span> <span>{{user_fullname}}</span>
                        <img :src="edit_grey" alt="" class="img_a" @click="editFullName(user_fullname)" style="margin-left:5px">
                    </div>
                    <div class="div_b" v-if="!fullNameShow">
                        <span class="sp_wid">用户全名 </span><input type="text" v-model="fullName" @blur="getFullName(fullName)">
                        <img :src="edit_confirm" alt="" class="img_a" @click="submitFullName" style="margin-left: 3%;">
                        <img :src="edit_canle" alt="" class="img_a" @click="canleFullName">
                    </div>
                </div>
            </li>
            <li class="lia">
                <div class="div_one">
                    <div class="div_a" v-if="emailShow">
                        <span class="sp_wid0">电子邮箱</span> <span>{{user_email}}</span>
                        <img :src="edit_grey" alt="" class="img_a" @click="editEmail(user_email)" style="margin-left:5px">
                    </div>
                    <div class="div_b" v-if="!emailShow">
                        <span class="sp_wid">电子邮箱</span><input type="text" v-model="e_mail" @blur="getEmail(e_mail)">
                        <img :src="edit_confirm" alt="" class="img_a" @click="submitEmail" style="margin-left: 3%;">
                        <img :src="edit_canle" alt="" class="img_a" @click="canleEmail">
                    </div>
                </div>
            </li>
            <li class="lia">
                <div class="div_one">
                    <div class="div_a" v-if="telShow">
                        <span class="sp_wid0">手机号</span> <span>{{user_tel}}</span>
                        <img :src="edit_grey" alt="" class="img_a" @click="editTel(user_tel)" style="margin-left:5px">
                    </div>
                    <div class="div_b" v-if="!telShow">
                        <!--<p class="p_a">-->
                        <span class="sp_wid" style="width:57px;">手机号</span> <input type="text" v-model="tel" @blur="getTel(tel)">
                        <!--</p>-->
                        <!--<img src="../../../../assets/myAccount/edit_yellow.png" alt="" class="img_a">-->
                        <img :src="edit_confirm" alt="" class="img_a" @click="submitTel" style="margin-left: 3%;">
                        <img :src="edit_canle" alt="" class="img_a" @click="canleTel">
                    </div>
                </div>
            </li>
        </ul>
        <ul class="ul_per" v-if="true">
            <li class="lic">
                <h3>套餐使用情况</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    查看您账号下所有套餐使用情况。
                </p>
            </li>
            <li class="lia " style="border: none">
                <!--*********仪表组件**********-->
                <!--<circleChart id="flowchart" v-if="firstShow"></circleChart>-->
                <flowChartMid id="flowchart2" v-if="secondShow"></flowChartMid>
                <flowChartRight id="flowchart3" v-if="thirdShow"></flowChartRight>
                <p style="text-align: center;">
                    <!--<span @click="firstFun" :class="{blueColor:firstShow}" class="act_span  act_span1"></span>-->
                    <span @click="secondFun" :class="{blueColor:secondShow}" class="act_span act_span2"></span>
                    <span @click="thirdFun" :class="{blueColor:thirdShow}" class="act_span act_span3"></span>
                </p>
                <div class="div_one">

                </div>
            </li>
        </ul>
        <ul class="ul_per per_package" v-if="true" style="overflow-y: auto;">
            <li class="lic">
                <h3>个人套餐信息</h3>
                <p style="font-size: 14px;color: #7e7e7e;">
                    查看您账号下所有套餐信息。
                </p>
            </li>
            <li class="lic" v-for="item in mealList">
                <div class="div_thir">
                    <div class="div_a">
                        <p class="p1" style="font-size: 12px">
                            <span>{{item.packageName}}（<span v-if="item.state==1">已生效</span><span v-else-if="item.state==0">未生效</span><span v-else>已用完</span></span>）
                            <span class="span2" v-if="item.startUseTime==null?false:true"> 生效期:{{item.startUseTime | format_time}}</span>
                            <!--<span class="span1"> 剩余{{item.leftToUse}} <span v-if="item.packageName=='包月套餐'">天</span><span v-else>MB</span> </span>-->
                            <span class="span1"> 剩余{{item.remain.toFixed(1)|format_dayOrFlow}}{{item.remainUnit}}</span>
                        </p>
                        <p class="p2">
                            <span class="span1">
                                <!--<span>个月</span>-->
                                <span v-if="item.packageName=='包月套餐'">
                                    {{item.packagePrice * item.num}}元/{{item.packageValue}}{{item.packageUnit}}
                                </span>
                                <span  v-else-if="item.packageName=='包年套餐'">
                                    {{item.packagePrice * item.num}}元/{{item.packageValue}}{{item.packageUnit}}
                                </span>
                                <span v-else>
                                    {{item.sum}}{{item.remainUnit}}（{{item.money}}元）
                                </span>
                                <!--<span v-else>年</span>（{{item.packagePrice}}元/{{item.packagePeriodNum}}{{item.packagePeriodType}}）-->
                            </span>
                            <span class="span2" v-if="item.endUseTime==null?false:true"> 有效期:{{item.endUseTime | format_time}}</span>
                        </p>
                        <template v-if="(item.remain/item.sum)*100<50">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="percent(Number((item.remain/item.sum)*100))" status="exception"
                            ></el-progress>
                        </template>
                        <template v-if="(item.remain/item.sum)*100>50||(item.remain/item.sum)*100==50">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="percent(Number(((item.remain/item.sum)*100).toFixed(0)))"
                            ></el-progress>
                        </template>
                    </div>
                </div>
            </li>
            <!--<li class="lic">-->
            <!--<div class="div_thir">-->
            <!--<div class="div_a">-->
            <!--<p class="p1">-->
            <!--<span>包月套餐（当时使用）</span><span class="span1"> 剩余21天</span>-->
            <!--</p>-->
            <!--<p class="p2">-->
            <!--<span>1个月（20元/月）</span><span class="span2"> 有效期:2017/7/1</span>-->
            <!--</p>-->
            <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="90"></el-progress>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
    import circleChart from 'components/Charts/circleChart';
    import flowChart from 'components/Charts/flowChart';
    import flowChartMid from 'components/Charts/flowChartMid';
    import flowChartRight from 'components/Charts/flowChartRight';
    import {getResourceList, getCollectList, collectModify} from 'api/web/web';
    import {emailModPsw,telModPsw,loginType,getCodeMsg, modName,logout,modEmail,getAllMsg,
        getTelCodeMsg,getPackageInfo,getPackageDetail} from 'api/myAcount/myAcount'
    import {modifyPsw, getStrategy} from "../../../../../api/login";
    import {mapGetters} from 'vuex'
    import {format, formatTime, formatGetTime} from "../../../../../api/timedFun";
    import {formatSeconds2} from '../../../../../utils/dateUtil'
    export default ({
        components: {
            circleChart,
            flowChart,
            flowChartMid,
            flowChartRight
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
            return {
                // firstShow: true,
                // isShowDate:false,
                secondShow: true,
                thirdShow: false,
                mealList: [],//套餐数组列表
                content: '',
                contentTime: '',
                msgId: null,
                msgs: null,
                //**********************************
                user_name: '',
                user_fullname: '',
                user_email: '',
                user_tel: '',
                nameShow: true,
                fullNameShow: true,
                emailShow: true,
                telShow: true,
                userName: this.c_name,
                fullName: '',
                e_mail: this.mail,
                tel: this.$store.getters.tel,
                edit_canle:require('@/assets/myAccount/edit_canle.png'),
                edit_confirm:require('@/assets/myAccount/edit_confirm.png'),
                edit_grey:require('@/assets/myAccount/edit_grey.png')
            };
        },
        created() {
            this.getList();
            this.getListMod();
        },
        //过滤时间戳
        filters: {
            format_time: function (value) {
                return formatTime(value)
            },
            format_msg: function (value) {
                return formatGetTime(value)
            },
            format_dayOrFlow:function (value) {
              if(Number(value)<0){
                  return '0.0';
              }else {
                  return value
              }
            }
        },
        methods: {
            percent(item){
                if(item<0){
                    return 0;
                }else {
                    return item
                }
            },
            getListMod(){
                console.log(this.$store.getters,'modget','getters==',this.c_name)
                this.user_name = this.$store.getters.c_name;
                this.user_fullname = this.$store.getters.full_name;
                this.user_email = this.$store.getters.mail;
                this.user_tel=this.$store.getters.tel;

            },
//            ******编辑---用户信息********************
            editName(val){
                this.nameShow=!this.nameShow;
                this.userName=val;
            },
            editFullName(val){
                this.fullNameShow=!this.fullNameShow;
                this.fullName=val;
            },
            editEmail(val){
                this.emailShow=!this.emailShow;
                this.e_mail=val;
            },
            editTel(val){
                this.telShow=!this.telShow;
                this.tel=val;
            },
//            *********************end********
            firstFun() {
                this.firstShow = true;
                this.secondShow = false;
                this.thirdShow = false;
                console.log('first1',this.firstShow)
            },
            secondFun() {
                this.firstShow = false;
                this.secondShow = true;
                this.thirdShow = false;
                console.log('first2',this.secondShow)
            },
            thirdFun() {
                this.firstShow = false;
                this.secondShow = false;
                this.thirdShow = true;
                console.log('first3',this.thirdShow)
            },
            getFullName(value) {
                if (/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{1,20}$/.test(value) == false) {
                    return false;
                } else {
                    return true;
                }
            },
            getEmail(value) {
                console.log(value,'val--')
                if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                    return false;
                } else {
                    return true;
                }
            },
            getTel(value) {
                if (/^(13|14|15|18|17)[0-9]{9}$/.test(value) == false) {
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
            submitFullName() {
                if (this.getFullName(this.fullName) == true) {

                    modName({id: this.uid, full_name: this.fullName}).then((resp) => {
                        if (resp.status == 1) {
//                            this.fullName = '';
//                            this.$store.dispatch('modPerMsg',this.fullName).then((res) => {
//
//                            })
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
            },
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
        }
    })
</script>

<style rel="stylesheet/scss" lang="scss">
    .ul_per {
        width: 31%;
        /*max-width: 387px;*/
        height: 560px; //高度固定
        /*overflow: auto;*/
        background-color: #FBFBFB;
        padding: 40px;
        float: left;
        margin-right: 2%;
        border-bottom: 2px solid #e9e9e9;
        h3 {
            color: #1d7eb2;
            font-size: 18px;
            margin: 0 0 20px 0;
        }
        .lia {
            padding: 20px 0;
            border-bottom: 2px solid #e9e9e9;
            .div_one {
                height:30px;
                .div_a {
                    span {
                        /*margin-left: 7%;*/
                    }
                    .img_a {
                        /*margin-left: 2%;*/
                    }
                }
            }
        }

    }

    .ul_per {
        .lic {
            padding: 20px 0;
            border-bottom: 2px solid #e9e9e9;
        }
    }

    .ul_per {
        .lic {
            padding: 20px 0;
            border-bottom: 2px solid #e9e9e9;
            .div_thir {
                .div_a {
                    p {
                        overflow: hidden;
                        font-size: 14px;
                    }
                    .p1 {
                        .span1 {
                            /*float: right;*/
                            /*float: ;*/
                        }
                    }
                    .p2 {
                        font-size: 12px;
                        text-align: center;
                        .span1 {
                            float: left;
                        }
                        .span2 {
                            float: right;
                        }
                    }
                }
            }
        }

    }
</style>