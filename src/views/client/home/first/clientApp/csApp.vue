<template>
   <div>
       <ul class="ul_cont">
           <!---->
           <li v-for="item in csList" class="li_cont" v-if="item.app_type=='FN'?false:true">
               <!--<div v-if="item.icon_path==''"><a @click="csOpen(item)"><img src="../../../../assets/client_home/main_app.png" alt="" class="aimg"></a></div>-->
               <div ><a @click="csOpen(item)"><img :src="item.icon_path" alt="" class="aimg"></a></div>
               <div class="div2">
                   <p>
                       <a @click="csOpen(item)">
                           <el-tooltip placement="top" effect="light">
                               <div slot="content"> {{item.app_name}}</div>
                               <div class="list_tooltip" >{{item.app_name}}</div>
                           </el-tooltip>
                       </a>
                   </p>
                   <p >{{item.app_type}}&nbsp;应用</p>

                   <p>
                       <img :src="red" alt="" @click="collection(item)" v-if="'1'==item.is_collect">
                       <img :src="grey" alt="" @click="collection(item)" v-else>
                       <span ><img :src="map" @click="showCSMod(item)" alt="" style="width:20px;margin-left:-2px" ></span>
                   </p>
               </div>
           </li>
       </ul>
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
       <div class="block" style=""  v-if="csPages.pages>16?true:false">
           <el-pagination
                   @size-change="handleSizeChangeClient"
                   @current-change="handleCurrentChangeClient"
                   :current-page="csPages.page"
                   :page-size="csPages.page_size"
                   :page-sizes="[16]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="csPages.pages">
           </el-pagination>
       </div>
   </div>
</template>

<script>
    import {getResourceList, getCollectList, collectModify, getFlow,getCsList,getRdpList,getback,modCSparam} from 'api/web/web';
    import {mapGetters} from 'vuex'
    export default {
        name: "cs-app",
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
                flag: true,//默认调一次
                csVisible: false,
                csForm: {
                    id: '',
                    app_params: '',
                    program_path: '',
                    // icon_path:''
                },
                csContent: {},
                agentObj:{},
                csPages: {
                    page: 1,
                    page_size: 16,
                    pages: null// 总条数
                },
                csList:[],
                grey: require('assets/client_home/grey_heart.png'),
                red: require("assets/client_home/red_heart.png"),
                map: require("assets/client_home/map.png"),
            };
        },
        props:['csData'],
        created(){

        },
        mounted(){
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
            this.getList();
        },
        methods: {
            // **********分页************
            handleSizeChangeClient(val) {
                console.log(`每页 ${val} 条`);
                this.csPages.page_size = val;
                this.getList();
            },
            handleCurrentChangeClient(val) {
                console.log(`当前页: ${val}`);
                this.csPages.page = val;
                this.getList();
            },
            // *******end***************
            getList() {
                getCsList(this.csPages).then((resp) => {
                    this.csPages.pages= resp.data.user_apps_list.page_count;
                    this.csList=resp.data.user_apps_list.res;
                }).catch((err) => {
                });
            },
            showCSMod(item){
                if(this.agentObj.win>=0||this.agentObj.mac>=0){
                    console.log(this.vpnStatus,'csapp')
                    if(this.vpnStatus=='0'||this.vpnStatus==undefined){
                        this.$router.push({path: '/downLoad'});
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
            collection(item) {
                this.$emit('csShowCollection',item)
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
                        this.getList()

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
            csOpen(item){
                if(this.agentObj.win>=0||this.agentObj.mac>=0){
                    if(this.vpnStatus=='0'||this.vpnStatus==undefined){
                        this.$router.push({path: '/downLoad'});
                    }else {
                        let url=null;
                        let that=this;
                        var appId=item.id+'1';
                        let filename=item.program_path.substring(item.program_path.lastIndexOf('\\')+1);
                        let filepath=item.program_path.substring(0,item.program_path.lastIndexOf('\\')-1);
                        let argument=item.app_params;
                        if(item.app_type=='TCP'||item.app_type=='Web'){
                            url= "https://tx.enlink.cn:18990/api/enlink/doSALive?id="+appId+"&filename="+encodeURI(item.program_path)+"&path="+encodeURI("")+"&argument="+argument;
                            console.log('allPath:',item.program_path,'filepath:',encodeURI(filepath),'filename:',encodeURI(item.program_path))
                        }
                        $.get({
                            async: false,
                            url: url,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback:"callback",
                            success: function(json){

                            },
                            error: function(json){
                                console.log(JSON.stringify(json));
                            }
                        });
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
        }

    };
</script>

<style>
    /*.ul_cont li {*/
        /*display: inline-block;*/
        /*overflow: hidden;*/
        /*!*margin-right: 78px;*!*/
        /*margin-bottom: 60px;*/
        /*width: 25%;*/
        /*min-width: 260px;*/
    /*}*/

    /*.ul_cont li div {*/
        /*float: left;*/
    /*}*/

    /*.ul_cont li div p {*/
        /*margin: 0;*/
    /*}*/

    /*.ul_cont li div:nth-of-type(2) {*/
        /*margin-top: 8px;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.ul_cont li div:nth-of-type(2) > p:nth-child(1) {*/
        /*font-size: 18px;*/
        /*color: #7e7e7e;*/
        /*margin-bottom: 8px;*/
        /*overflow: hidden;*/
    /*}*/

    /*.ul_cont li div:nth-of-type(2) > p:nth-child(2) {*/
        /*font-size: 14px;*/
        /*color: #9b9b9b;*/
        /*margin-bottom: 6px;*/
    /*}*/

    /*.ul_cont li div:nth-of-type(2) > p:last-child > span {*/
        /*margin-left: 9px;*/
    /*}*/

    /*.ul_cont li img {*/
        /*!*width: 100px;*!*/
    /*}*/

    /*.ul_cont li span {*/
        /*!*position: absolute;*!*/
        /*!*top: 0;*!*/
    /*}*/
    /*.li_cont .aimg{*/
        /*width: 90px;*/
        /*border-radius: 10px;*/
    /*}*/
</style>