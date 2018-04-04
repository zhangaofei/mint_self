<template>
    <div style="height: 100%;overflow:hidden;">
        <div class="web" style="">
            <img src="../../../../assets/nav/app_ok.png" alt="" class="img_left tab_img" style="">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="应用中心" name="" :disabled="true" style="margin-left: 10px;color: #438AFE;" class="sky"></el-tab-pane>
                <el-tab-pane label="我的收藏" name="first">
                    <ul class="ul_cont">
                        <li v-for="n in collectList" v-if="'1'==n.is_collect" class="li_cont">
                            <div>
                               <span v-if="n.hasOwnProperty('width')">
                                    <a @click="parentRdpOpen(n)" v-if="n.icon_path?true:false"><img :src="n.icon_path" alt="" class="aimg"></a>
                                    <a @click="parentRdpOpen(n)" v-if="n.iconPath?true:false"><img :src="n.iconPath" alt="" class="aimg"></a>
                                </span>
                                <span v-else-if="n.hasOwnProperty('if_modify')">
                                    <a @click="parentCsOpen(n)" v-if="n.icon_path?true:false"><img :src="n.icon_path" alt="" class="aimg"></a>
                                    <a @click="parentCsOpen(n)" v-if="n.iconPath?true:false"><img :src="n.iconPath" alt="" class="aimg"></a>
                                </span>
                                <span v-else>
                                    <a :href="getUrl(n)" target="_blank"  v-if="n.icon_path?true:false"><img :src="n.icon_path" alt="" class="aimg"></a>
                                    <a :href="getUrl(n)" target="_blank"  v-if="n.iconPath?true:false"><img :src="n.iconPath" alt="" class="aimg"></a>
                                </span>
                            </div>
                            <div class="div2">
                                <p>
                                    <a @click="parentRdpOpen(n)" v-if="n.hasOwnProperty('width')">
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content"> {{n.name}}{{n.app_name}}</div>
                                            <div class="list_tooltip">{{n.name}}{{n.app_name}}</div>
                                        </el-tooltip>
                                    </a>
                                    <a @click="parentCsOpen(n)"  v-else-if="n.hasOwnProperty('if_modify')">
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content"> {{n.name}}{{n.app_name}}</div>
                                            <div class="list_tooltip">{{n.name}}{{n.app_name}}</div>
                                        </el-tooltip>
                                    </a>
                                    <a :href="getUrl(n)" target="_blank" v-else>
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content"> {{n.name}}{{n.app_name}}</div>
                                            <div class="list_tooltip">{{n.name}}{{n.app_name}}</div>
                                        </el-tooltip>
                                    </a>
                                </p>
                                <p>{{n.app_type}}应用</p>
                                <p>
                                    <img :src="red" alt="" @click="favoriteCollection(n)" v-if="'1'==n.is_collect">
                                    <span v-if="n.hasOwnProperty('if_modify')"><img :src="map" @click="showCS(n)" alt="" style="width:20px;margin-left:-2px" ></span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="BS应用" name="second" >
                  <bs  @bsShowCollection="collection" @doPage="getList" ref="bs"></bs>
                </el-tab-pane>
                <el-tab-pane label="Client应用" name="third"  :disabled="vpnAppvisible">
                    <cs  @csShowCollection="collection" ref="cs"></cs>
                </el-tab-pane>
                <el-tab-pane label="RDP应用" name="four"  :disabled="vpnAppvisible">
                    <rdp  @rdpShowCollection="collection" ref="rdp"></rdp>
                </el-tab-pane>
            </el-tabs>
            <div class="csDialog  public mobileDialog">
                <el-dialog
                        title="提示"
                        v-model="vpnVisible"
                        size="small"
                        custom-class="dialog public"
                        top="10%"
                        :show-close="true"
                        :close-on-click-modal="false">

                    <div class="mail-form pay-form" style="margin-left: 100px;position: relative;" v-if="vpnStatus=='1'&&isForceUpdate==0?true:false">
                        <div>
                            &nbsp;<img src="../../../../assets/client_login/warning.png" alt="">
                            当前版客户端本过低，请及时更新<span style="color: lightblue;">ENLINK CASB客户端程序</span>
                            ，以免以免影响功能的正常使用。
                        </div>
                    </div>
                    <div class="mail-form pay-form" style="margin-left: 100px;position: relative;" v-else-if="vpnStatus=='1'&&isForceUpdate==1?true:false">
                        <div>
                            &nbsp;<img src="../../../../assets/client_login/warning.png" alt="">
                            当前版客户端本过低，请及时更新<span style="color: lightblue;">ENLINK CASB客户端程序</span>
                            ，以免以免影响功能的正常使用。
                        </div>
                    </div>
                     <div class="mail-form pay-form" style="margin-left: 100px;position: relative;" v-else>
                        <div>
                            <p>&nbsp;<img src="../../../../assets/client_login/err.png" alt="">&nbsp; 未检测您安装 <span style="color: lightblue;">ENLINK CASB客户端程序</span>，请下载安装后重试。</p>
                            <p>&nbsp;<img src="../../../../assets/client_login/err.png" alt="">&nbsp;未检测您启动 <span style="color: lightblue;">ENLINK CASB服务</span>，请启动服务后重试。</p>
                        </div>
                    </div>

                    <!--<div class='form-footer ' slot="footer" v-if="vpnStatus=='1'&&isForceUpdate==0?true:false">-->
                    <div class='form-footer ' slot="footer" v-if="vpnStatus=='1'&&isForceUpdate==0?true:false">
                        <div class="foot">
                            <!--已下载  非最新-->
                            <span class="canle" @click="cancleDownload">取消</span>
                            <el-button
                                    type="primary"
                                    class="btn_save"
                                    @click="toDownload">
                                确定
                            </el-button>

                        </div>
                    </div>
                    <!--<div class='form-footer ' slot="footer" v-else-if="vpnStatus=='1'&&isForceUpdate==1?true:false">-->
                    <div class='form-footer ' slot="footer" v-else-if="vpnStatus=='1'&&isForceUpdate==1?true:false">
                        <div  class="foot">
                            <!--未下载-->
                            <el-button
                                    type="primary"
                                    class="btn_save"
                                    @click="toDownload">
                                确定
                            </el-button>
                        </div>
                    </div>
                    <div class='form-footer ' slot="footer" v-else>
                        <div  class="foot">
                            <!--未下载-->
                            <el-button
                                    type="primary"
                                    class="btn_save"
                                    @click="toDownload">
                                确定
                            </el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
            <div class="csDialog  public">
                <el-dialog
                        title="文件路径设置"
                        v-model="csVisible"
                        size="small"
                        custom-class="dialog public tip"
                        top="10%"
                        :close-on-click-modal="false"
                >

                    <div class="mail-form pay-form" style="margin-left: 200px;position: relative;">
                        <!--<div style="position: absolute;left: -125px;top: 9px;"><img src="../../../../assets/client_home/main_app.png" alt=""></div>-->
                        <div style="position: absolute;left: -125px;top: 9px;"><img :src="csContent.icon_path" alt="" style="width: 72px;height: 59px;"></div>
                        <!--icon_path-->
                        <el-form :model="csForm"  ref="csForm" label-width="50px" class="demo-ruleForm">
                            <el-form-item label="应用名称：" prop="num" class="">
                                {{ csContent.app_name}}
                            </el-form-item>
                            <el-form-item label="应用说明：" prop="num" class="">
                                {{csContent.remark}}
                            </el-form-item>
                            <el-form-item label="应用参数：" prop="num" class="">
                                <el-input v-model="csForm.app_params" class="el_put el_check pay_sel" placeholder="应用参数" style="width:350px;" :disabled="csContent.if_modify==1?false:true"></el-input>
                            </el-form-item>
                            <el-form-item label="应用路径：" prop="" class="" >
                                <el-input v-model="csForm.program_path" class="el_put" placeholder="应用路径"  style="width:350px;" :disabled="csContent.if_modify==1?false:true"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class='form-footer ' slot="footer" >
                        <div style="" class="foot">
                            <span @click="csVisible=!csVisible" class="canle">取消</span>
                            <el-button
                                    type="primary"
                                    class="btn_save"
                                    :disabled="csContent.if_modify==1?false:true"
                                    @click="modifyCsForm('csForm')">
                                保存
                            </el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
            <!--****************-->
        </div>
    </div>
</template>
<script>
    import circleChart from 'components/Charts/circleChart';
    import {loginType,getAllMsg} from  'api/myAcount/myAcount'
    import {getResourceList, getCollectList, collectModify, getFlow,getCsList,getRdpList,getback,modCSparam,allFavorites} from 'api/web/web';
    import {mapGetters} from 'vuex'
    import store from "../../../../store/index";
    import {formatSeconds2} from '../../../../utils/dateUtil'
    import { Base64 } from 'js-base64';
    import bs from './bsApp/bsApp';
    import cs from './clientApp/csApp';
    import rdp from './rdpApp/rdpApp';
    export default ({
        components: {
            circleChart,
            bs,
            cs,
            rdp
        },
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'login_timestamp',
                'login_msg',
                'msgs',
                'vpnStatus',
                'versionName',
                'isForceUpdate',
                'c_groupId',
                'token',
                'c_passwrod',//加密密码
                'clearPasswrod',//明文密码
                'setonVpnFlag',
                'lowVersion',
                'firstLoginFlag',
                'unInstallVpnFlag'

            ]),
        },
        data() {
            return {
                vpnAppvisible:false,//默认不显示应用
                vpnVisible:false,//
                list: null,
                collectList: null,
                http: null,
                agentObj:{},
                activeName: 'first',
                csVisible:false,
                vpnCtrl:'0',
                csForm: {
                    id: '',
                    app_params: '',
                    program_path: '',
                },
                csContent: {},
                rdpPages:{
                    page: 1,
                    page_size: 16,
                    pages: null// 总条数
                },
                bsPages: {
                    page: 1,
                    page_size: 16,
                    pages: null// 总条数
                },
                protocol: {
                    HTTP: '',
                    HTTPS: ''
                },
                grey: require('../../../../assets/client_home/grey_heart.png'),
                red: require("../../../../assets/client_home/red_heart.png"),
                map: require("../../../../assets/client_home/map.png"),
            };
        },
        created() {
            let userAgent,Android,iPhone,win,mac,iPad;
            userAgent = navigator.userAgent;
            Android = userAgent.indexOf("Android");
            iPhone = userAgent.indexOf("iPhone;");
            win = userAgent.indexOf("Windows");
            mac = userAgent.indexOf("Macintosh");
            iPad = userAgent.indexOf("iPad;");
            this.agentObj={
                Android:  Android,
                iPhone:  iPhone,
                win:  win,
                mac:  mac,
                iPad:  iPad,
            };
            if(this.agentObj.win>0||this.agentObj.mac>0){
                this.$store.dispatch('checkVpn').then((res) => {
                    console.log("checkVpn")
                }).catch(err => {
                    this.loading = false;
                    console.log(err);
                });
                if (this.$route.fullPath.indexOf('url_type=1')>0) {
                    this.activeName='third'
                }
                if (this.$route.fullPath.indexOf('url_type=2')>0){
                    this.activeName='four';
                }
                this.getList();
            }else {
                this.getList();
            }
            let that=this;
            this.$nextTick(function () {
                // setTimeout(function(){
                //     console.log(that.vpnStatus,'vpnStatus==00',that.$store,that.$store.state.user.vpnStatus)
                //     if(that.vpnStatus=='1'){
                //         that.vpnCtrl='1'
                //     }else {
                //         that.vpnCtrl='0'
                //     }
                // }, 900)

            });

        },
        methods: {
            showCS(item){
                if(this.agentObj.win>=0||this.agentObj.mac>=0){
                    if(this.vpnStatus=='0'||this.vpnStatus==undefined){
                        this.toDownload();
                    }else {
                        this.csVisible=!this.csVisible;
                        this.csContent=item;//不可修改内容
                        this.csForm.app_params=item.app_params;
                        this.csForm.program_path=item.program_path;
                        this.csForm.id=item.id;
                    }
                }else if(this.agentObj.Android>=0){
                    this.$router.push({path: '/redirectAndroidT'});

                }else if(this.agentObj.iPhone>=0){
                    console.log(this.$router,"router")
                    this.$router.push({path: '/redirectIosT'});

                }else {
                    this.$router.push({path: '/redirectIpadT'});

                }
            },
            modifyCsForm(formName) {
                modCSparam(this.csForm).then((resp)=> {
                    console.log(resp, 'resp_modCSparam')
                    if(resp.msg=='success'){
                        this.$message({
                            type: 'success',
                            message: '修改成功！'
                        });
                        this.csVisible=false;
                        this.getEnsslList()

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '修改失败！'
                        });
                    }
                }).catch(e=> {
                    console.log("修改出错", e);
                });
            },
            //调子组件方法
            parentCsOpen(item){
               this.$refs.cs.csOpen(item);
            },
            parentRdpOpen(item){
                this.$refs.rdp.rdpOpen(item);
            },
            toDownload(){
                this.$router.push({path: '/downLoad'});
            },
            cancleDownload() {
                this.vpnVisible = false;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getUrl(item){
                if(item.hasOwnProperty('url')){
                    let url = this.protocol[item.protocol] + item.url;
                    return url
                }else {
                    return
                }
            },
            setProtocol(http, https) {
                this.protocol['HTTP'] = http;
                this.protocol['HTTPS'] = https;
            },
            getList() {
                if(this.vpnStatus==undefined){
                    console.log('get')
                    let that=this;
                    $.getJSON("https://tx.enlink.cn:18990/api/enlink/state?q=javascript&count=1&callback=?", function(res,status){
                            if(status=='success'){
                                this.vpnStatus='1'

                            }else {
                                this.vpnStatus='0'
                            }
                    })
                }

                let arrCollect=[];
                // all已收藏list
                allFavorites({user_id: this.uid}).then((resp) => {
                    this.collectList = resp.data.web_res.concat(resp.data.client_res).concat(resp.data.rdp_res);
                    for(let i=0;i<this.collectList.length;i++){
                        if(this.collectList[i].is_collect==1){
                            arrCollect.push(this.collectList[i].is_collect)
                        }
                    }
                    if(arrCollect.length<=0){
                        this.activeName='second'
                    }
                }).catch((err) => {
                    console.log(err);
                });
                getResourceList(this.bsPages).then((resp) => {
                    this.setProtocol(resp.http, resp.https);

                }).catch((err) => {
                    console.log(err);
                });
                this.getEnsslList();
            },
            //检测小锁是否安装（登陆也有检测（首次反应时间较长））
            chechVpnInstall(){
                this.$store.dispatch('checkVpn').then((res) => {

                }).catch(err => {
                    console.log(err);
                });
            },
            getEnsslList(){
                //client 和rdp的集合
                getRdpList(this.rdpPages).then((resp) => {
                    this.rdpData=resp;
                    let that=this;
                    //已配置小锁应用(rdp、client)
                    if(resp.data.apps_res.res.length>0||resp.data.rdp_res.res.length>0){
                        this.vpnAppvisible=false;
                        if(this.agentObj.win >= 0||this.agentObj.mac >= 0){
                            // this.chechVpnInstall();

                            //     if(this.vpnStatus=='1'){
                            setTimeout(function () {
                                // console.log(that.vpnCtrl,'getJson','vpnStatus===:',that.vpnStatus,'skt',that.vpnCtrl,'skt','setonVpnFlag:',that.setonVpnFlag,'isForceUpdate',that.isForceUpdate)
                                if(that.vpnStatus=='1'){
                                    if('1'==that.setonVpnFlag){
                                        that.$store.dispatch('setonVpn',{setonVpnFlag: "0"}).then((res) => {
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                        that.getVersion()
                                    }
                                }else {
                                    console.log(that.unInstallVpnFlag,'vpn==yes====')
                                    if('0'==that.unInstallVpnFlag|| that.unInstallVpnFlag==undefined){
                                        // that.vpnVisible=true;
                                        that.vpnVisible=false;//工大
                                        that.$store.dispatch('unInstallVpn',{unInstallVpnFlag: "1"}).then((res) => {
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                    }else {
                                        that.vpnVisible=false;
                                    }

                                }
                            },900)


                        }else {
                            //移动版 首次登陆标志位：firstLoginFlag
                            if('1'==this.firstLoginFlag){
                                console.log(navigator.userAgent,'iPhone==agentObj2')
                                this.$store.dispatch('firstLogin',{firstLoginFlag: "0"}).then((res) => {
                                }).catch(err => {
                                    console.log(err);
                                });
                                console.log(this.firstLoginFlag,'firstLoginFlag')
                                //移动设备
                                if(this.agentObj.Android >= 0){
                                    this.$router.push({path: '/redirectAndroid'});
                                    return
                                }
                                if(this.agentObj.iPhone >= 0){

                                    this.$router.push({path: '/redirectIos'});
                                    return
                                }
                                if(this.agentObj.iPad >= 0){
                                    this.$router.push({path: '/redirectIpad'});
                                    return
                                }
                            }
                        }
                    }else {
                        //未配置小锁应用  不需要检查
                        this.vpnVisible=false;
                        this.vpnAppvisible=true;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            collection(item) {
                //类型 0:(bs类型),1:rdp,2:TCP/Web
                console.log(item, '点击app item---collect')
                let app_type;
                if ('0' == item.is_collect) {
                    item.is_collect = '1'
                } else {
                    item.is_collect = '0'
                }
                if(item.app_type=='TCP'||item.app_type=='Web'||item.app_type=='ST'){
                    app_type=2;
                }else if(item.hasOwnProperty('width')){
                    app_type=1;
                }else{
                    app_type=0;
                }
                //设备类型选择
                if(this.agentObj.win>=0||this.agentObj.mac>=0){
                    if(this.vpnStatus=='0'||this.vpnStatus==undefined){
                        if((item.hasOwnProperty('if_modify')||item.hasOwnProperty('width'))){
                            this.toDownload();
                        }else {
                            collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                                this.getList();
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }else {
                            collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                                this.getList();
                            }).catch((err) => {
                                console.log(err);
                            });
                    }
                }else if(this.agentObj.Android>=0){
                    if((item.hasOwnProperty('if_modify')||item.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectAndroidT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }

                }else if(this.agentObj.iPhone>=0){
                    if((item.hasOwnProperty('if_modify')||item.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectIosT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }else {
                    if((item.hasOwnProperty('if_modify')||item.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectIpadT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }
            },
            favoriteCollection(n) {
                let app_type;
                n.is_collect = '0';
                console.log(n.hasOwnProperty('width'), 'home',n.width);
                if(n.app_type=='TCP'||n.app_type=='Web'||n.app_type=='ST'){
                    app_type=2;
                }else if(n.hasOwnProperty('width')){
                    app_type=1;
                }else{
                    app_type=0;
                }
                //设备类型选择
                if(this.agentObj.win>=0||this.agentObj.mac>=0){
                    if(this.vpnStatus=='0'||this.vpnStatus==undefined){

                        if((n.hasOwnProperty('if_modify')||n.hasOwnProperty('width'))){
                            this.toDownload();
                        }else {
                            collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                                this.getList();
                                this.$refs.rdp.getList();
                                this.$refs.cs.getList();
                                this.$refs.bs.getList();

                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }else {

                        if((n.hasOwnProperty('if_modify')||n.hasOwnProperty('width'))){
                            collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                                this.getList();
                                this.$refs.rdp.getList();
                                this.$refs.cs.getList();
                                this.$refs.bs.getList();

                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }

                }else if(this.agentObj.Android>=0){
                    if((n.hasOwnProperty('if_modify')||n.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectAndroidT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }

                }else if(this.agentObj.iPhone>=0){
                    if((n.hasOwnProperty('if_modify')||n.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectIosT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }else {
                    if((n.hasOwnProperty('if_modify')||n.hasOwnProperty('width'))){
                        //client 和 rdp
                        this.$router.push({path: '/redirectIpadT'});
                    }else{
                        collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                            this.getList();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }
            },
            getVersion(){
                let that=this;
                $.getJSON("https://tx.enlink.cn:18990/api/enlink/getversionInt?q=javascript&count=1&callback=?", function(res,status){
                    console.log(res,status,'getJSON',that.isForceUpdate);
                    if(Number(res.state)==Number(that.versionName)){
                        // that.vpnVisible=true;
                        that.vpnVisible=false;
                        // console.log(that.vpnVisible,'that____vpnVisible');
                        //调小锁vpn
                        if (that.$route.fullPath.indexOf('web_vpn_user_token')==-1) {
                            that.doStartVpn();
                        }
                    }else if(Number(res.state)<Number(that.versionName)){
                        // 低版本
                        if (that.$route.fullPath.indexOf('web_vpn_user_token')==-1) {
                            that.doStartVpn();
                        }
                        if('1'==that.lowVersion){
                            that.vpnVisible=false;
                        }else{
                            //若版本较低，首次登陆后会执行该方法（默认lowVersion为0）
                            that.vpnVisible=true;
                            that.$store.dispatch('checkLowVersion',{lowVersion: "1"}).then((res) => {

                            }).catch(err => {
                                console.log(err);
                            });
                        }
                    }else {

                    }
                });

            },
            doStartVpn(){
                console.log(window.location.host,'window')
                let u_name=this.c_name;
                let groupId= this.c_groupId;
                let token=this.token;
                let clear_passWrod=this.clearPasswrod;
                let  accout = u_name + "@" + groupId;
                let params=Base64.encode("JSESSIONID="+ token + " PASSWORD="+ clear_passWrod+" GROUP="+groupId);
                let url="https://tx.enlink.cn:18990/api/enlink/start?target=" +window.location.host+":443"  + "&account="+accout+"&token="+params;
                console.log(url,'name:',u_name,'groupId:',groupId,'clear_passWrod:',clear_passWrod,'token:',token,'accout:',accout,'params',params);
                $.ajax({
                    type: "get",
                    async: true,
                    timeout:1000,
                    url:url,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback:"callback",
                    success: function(res){

                    },
                    error: function(){

                    }
                });
            },
        }
    })
</script>
<style>
    /************* 分页--轮播 start ****************/
    .block{
        margin-right: 2%;
        text-align: center;
        width:80%;
        position: fixed;
        bottom:10px;
        z-index: 1000
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

    /************* 分页--轮播 end ****************/
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
        /*min-height: 100%;*/
        float: left;
        position: absolute;
        min-height:714px;
        min-width:1006px;
        background: #fff;
        padding-top:80px;
        width: calc(100% - 350px);
        width: -moz-calc(100% - 350px);
        width: -webkit-calc(100% - 350px);
    }
    .tab_img{
        position: absolute;
        top: 100px;
        left: 34px;
        width: 19px;
        z-index: 100;
    }
    /***************tab_right****************/
    .tab_right_header {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
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
    .public .tip{
        width: 40%;
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

    /**********concent***************/
    .content {
        /*margin-right: 200px;*/
        float: left;
        width: 85%;
    }

    .ul_cont li {
        display: inline-block;
        overflow: hidden;
        /*margin-right: 78px;*/
        margin-bottom: 60px;
        width: 25%;
        min-width: 260px;
    }

    .ul_cont li div {
        float: left;
    }

    .ul_cont li div p {
        margin: 0;
    }

    .ul_cont li div:nth-of-type(2) {
        margin-top: 8px;
        margin-left: 20px;
    }

    .ul_cont li div:nth-of-type(2) > p:nth-child(1) {
        font-size: 18px;
        color: #7e7e7e;
        margin-bottom: 8px;
        overflow: hidden;
    }

    .ul_cont li div:nth-of-type(2) > p:nth-child(2) {
        font-size: 14px;
        color: #9b9b9b;
        margin-bottom: 6px;
    }

    .ul_cont li div:nth-of-type(2) > p:last-child > span {
        margin-left: 9px;
    }

    .ul_cont li img {
        /*width: 100px;*/
    }

    .ul_cont li span {
        /*position: absolute;*/
        /*top: 0;*/
    }
    .list_tooltip{
        width: 100px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /***slider******************/
    .slider {
        width: 14%;
        float: right;
        padding-left: 3%;
        z-index: 10;
    }

    .footer {
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .ul_ul {
        background-color: #fff;
        position: absolute;
        top: 60px;
        width: 206px;
        height: 162px;
        left: -76px;
        text-align: center;
    }

    .ul_ul li {
        padding-bottom: 26px;
    }

    .ul_ul span {
        position: relative;
        top: 26px;
        left: -31px;
    }

    .ul_ul img {
        position: relative;
        margin-left: 10px;
    }
    .li_cont .aimg{
        width: 90px;
        border-radius: 10px;
    }
</style>
<!--移动端样式 phone and ipad-->
<style rel="stylesheet/scss" lang="scss" >
    @media (min-width: 601px) and (max-width: 1100px){
        .web_right{
            width: 40%;
            display: none;
        }
        .web{
            width: 100vw;
            min-width: 100vw !important;
            min-height:100%;
            .tab_img{
                position: absolute;
                top: 99px;
                left: 11px;
                z-index:100
            }
            .block{
                margin-right: 2%;
                text-align: center;
                width:100%;
                position: fixed;
                bottom:10px;
                z-index: 1000
            }
            /*min-width: 260px;*/
            .el-tabs__content {
                margin-left: 0;
                margin-top: 0;
                .ul_cont{
                    padding: 0 20px;
                    .list_tooltip{
                        width: 60px !important;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .li_cont:nth-child(odd){//奇数
                        min-width: 20%;
                        width: 23vw;
                        margin-bottom: 30px;
                        /*margin-left: 7vw;*/
                        .aimg{
                            width:12vw;
                            min-width:45.6px;
                            max-width: 70px
                        }
                        .div2{
                            margin-top: -2px;
                            width: 17vw;
                            max-width:62px;
                            margin-left: 5px;
                            line-height: 2;
                            p{
                                margin:0;
                                font-size: 12px;
                                span{
                                    margin-left:0;
                                }
                            }

                        }
                    }
                    .li_cont:nth-child(even){//偶数
                        min-width: 20%;
                        width: 23vw;
                        margin-bottom: 30px;
                        /*float: right;*/
                        .aimg{
                            width:12vw;
                            min-width:45.6px;
                            max-width: 70px
                        }
                        .div2{
                            margin-top: -2px;
                            width: 17vw;
                            max-width:62px;
                            margin-left: 5px;
                            line-height: 2;
                            p{
                                margin:0;
                                font-size: 12px;
                                span{
                                    margin-left:0;
                                }
                            }

                        }
                    }

                }
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
        .el-tabs__nav-prev{
            display: none;
        }
        .el-tabs__nav-next, .el-tabs__nav-prev{
            display: none;
        }
    }
    @media screen and (max-width: 600px){
        .web_right{
            width: 40%;
            display: none;
        }
        .web{
            width: 100vw;
            min-width: 100vw;
            min-height:100%;
            .tab_img{
                position: absolute;
                top: 99px;
                left: 11px;
                z-index:100;
                display: none;
            }
            .block{
                margin-right: 2%;
                text-align: center;
                width:100%;
                position: fixed;
                bottom:10px;
                z-index: 1000
            }
            /*min-width: 260px;*/
            .el-tabs__content {
                margin-left: 0;
                margin-top: 0;
                .ul_cont{
                    padding: 0 20px;
                    .list_tooltip{
                        width: 60px !important;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .li_cont:nth-child(odd){//奇数
                        /*min-width:100px;*/
                        min-width: 33%;
                        width: 40vw;
                        margin-bottom: 30px;
                        margin-left: 7vw;
                        .aimg{
                            width:12vw;
                            min-width:45.6px;
                            /*max-width: 70px*/
                        }
                        .div2{
                            margin-top: -2px;
                            width: 17vw;
                            margin-left: 5px;
                            line-height: 4vw;
                            p{
                                margin:0;
                                font-size: 12px;
                                span{
                                    margin-left:0;
                                }
                            }

                        }
                    }
                    .li_cont:nth-child(even){//偶数
                        /*min-width:100px;*/
                        min-width: 33%;
                        width: 40vw;
                        margin-bottom: 30px;
                        float: right;
                        .aimg{
                            width:12vw;
                            min-width:45.6px;
                            /*max-width: 70px*/
                        }
                        .div2{
                            margin-top: -2px;
                            width: 17vw;
                            margin-left: 5px;
                            line-height: 4vw;
                            p{
                                margin:0;
                                font-size: 12px;
                                span{
                                    margin-left:0;
                                }
                            }

                        }
                    }

                }
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
        .el-tabs__nav-prev{
            display: none;
        }
        .el-tabs__nav-next, .el-tabs__nav-prev{
            display: none;
        }
    }
</style>
