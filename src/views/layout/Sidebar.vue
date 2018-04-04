<template>
    <div class="web_right" style="">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark"
                     style="position: relative; min-height: 75px;height: 110px; border-bottom:1px solid #d1dbe5 ;">
                    <div class="tab_right_header">
                        <div><img src="../../assets/nav/user01.png" alt=""></div>
                        <div>
                            <span style="color: #197cb1;font-size: 18px">{{user_name}}</span>
                            <p>
                                <span>
                                    <span style="color: #1dc128;">{{timeVal}}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="fn_ctrl" v-if="isHasFn">
                    <ul>
                        <li style="" class="fn_li">
                            <div style="" class="fn_li_fir"><img :src="fnIconPath" style="width: 40px;"></div>
                            <div style="" class="fn_li_sec">
                                <el-tooltip placement="top" effect="light">
                                    <div slot="content"> {{fnName}}</div>
                                    <div class="list_tooltip">{{fnName}}</div>
                                </el-tooltip>
                                <span class="sp3" v-if="fnStatus==1"><span class="sp3_1"  ></span>&nbsp;已断开</span>
                                <span class="sp2" v-else><span class="sp2_1" ></span>&nbsp;已连接</span>
                            </div>
                            <div  class="fn_li_thir_1" @click="startFn(fn_id)" v-if="fnStatus==1">
                                <span  >连接</span>
                            </div>
                            <div  class="fn_li_thir_1" @click="startFn(fn_id)" v-else>
                                <span  >断开</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div style="background-color: #f5f5f5;width:100%;">
                    <circleChart style="margin:10px auto;margin-top:140px"></circleChart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import circleChart from 'components/Charts/circleChart';
    import {getFlow,setOnFnList} from 'api/web/web';
    import {mapGetters} from 'vuex'
    import store from "../../store/index";
    import {formatSeconds2} from '../../utils/dateUtil'

    export default ({
        name: 'sidebar',
        components: {
            circleChart
        },
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'login_timestamp',
                'mail',
                'vpnStatus',
            ]),

        },
        data() {
            return {
                isHasFn:false,
                fnName:'',//fn的name
                fn_id:'',
                fnIconPath:'',
                fnStatus:1,//fn状态默认为 1 断开
                isShowFn:true,
                user_name:'',
                timer: null,
                list: null,
                collectList: null,
                http: null,
                isShow: true,
                activeName: 'first',
                protocol: {
                    HTTP: '',
                    HTTPS: ''
                },
                agentObj:{},
                HH: 0,
                mm: 0,
                ss: 0,
                str: '',
                isCollect: null,
                timeVal: '00:00:00'
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
            this.user_name=this.c_name;
            if (this.$route.fullPath.indexOf('logintime=')>0) {
                let timeSpa=Number(this.$route.fullPath.substr(this.$route.fullPath.indexOf('time=')+5));
                this.$store.dispatch('setTimestamp',{login_timestamp: Date.parse(new Date())-timeSpa}).then((res) => {
                }).catch(err => {
                    console.log(err);
                });
            }
            this.$nextTick(function () {
                this.timer = setInterval(this.doTimer, 1000)
            });
            this.getList();
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        methods: {
            // showFn(){
            //   this.isShowFn=!this.isShowFn;
            // },
            doTimer() {
                let timestamp = Date.parse(new Date());
                this.timeVal = formatSeconds2((timestamp - this.login_timestamp) / 1000)
            },
            getList(){
                setOnFnList().then((resp) => {
                    this.fnName=resp.data.user_apps_list[0].app_name;
                    this.fn_id=resp.data.user_apps_list[0].id;
                    this.fnIconPath=resp.data.user_apps_list[0].icon_path;
                    if(resp.data.user_apps_list.length>0){
                        this.isHasFn=true;
                    }

                }).catch((err) => {
                    console.log(err);
                });
            },
            startFn(id){
                if(this.agentObj.win>=0||this.agentObj.mac>=0) {
                    if (this.vpnStatus == '0'||this.vpnStatus ==undefined) {
                        this.$router.push({path: '/downLoad'});
                    } else {
                        let that=this;
                        var  fnId=id+'1';
                        $.get({
                            async: false,
                            url: "https://tx.enlink.cn:18990/api/enlink/doAppLive?appid="+fnId,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback:"callback",
                            success: function(json){
                                let fnIds=fnId;
                                setTimeout(function doGetFnAppStateByID(fnId) {

                                    $.get({
                                        async: false,
                                        url: "https://tx.enlink.cn:18990/api/enlink/getFnAppStateByID?appid="+fnIds,
                                        dataType: "jsonp",
                                        jsonp: "callback",
                                        jsonpCallback:"callback",
                                        success: function(json){
                                            let ret=json.ret;
                                            let state=json.state;
                                            let msg=json.msg;
                                            let data=json.data;
                                            that.fnStatus=json.state;
                                            if(json.msg!='success'){
                                                that.$message({
                                                    type: 'warning',
                                                    message: json.msg
                                                });
                                            }
                                        },
                                        error: function(){

                                        }
                                    });

                                },500)

                            },
                            error: function(json){
                                // console.log(JSON.stringify(json));
                            }
                        });
                    }
                }

            },
        }
    })
</script>
<style>
    .web_right{
        width:350px;
        float: left;
        background-color: #f5f5f5;
        /*height:calc(100% - 80px);*/
        border-left:1px solid #d1dbe5;
        position: absolute;
        right: 0;
        /*min-height: 100%;*/
        min-height: 100%;
        padding-top:80px;
        height: 763px;
    }
</style>
<!--<style rel="stylesheet/scss" lang="scss">-->
<style rel="stylesheet/scss" lang="scss" >
    .fn_ctrl{
        .fn_li:nth-of-type(n+1){
            overflow:hidden;
            padding-left: 30px;
            background:#F0F0f0;
            .fn_li_fir{
                float: left;
                line-height: 50px;
                img{
                    width: 40px;
                }
            }
            .fn_li_sec{
                float: left;
                margin-left: 20px;
                margin-top: 7px;
                .sp2{
                    font-size: 10px;
                    position: relative;
                    top: 19px;
                    /*left: -24px;-->*/
                    left: -103px;
                    .sp2_1{
                        background: #8dc339;//绿色
                        border-radius: 50%;
                        width: 9px;
                        height: 9px;
                        display: inline-block
                    }
                }
                .sp3{
                    font-size: 10px;
                    /*position: absolute;*/
                    position: relative;
                    top: 19px;
                    /*left: -22px;-->*/
                    left: -108px;
                    .sp3_1{
                        background: #f84945;//红色
                        border-radius: 50%;
                        width: 9px;
                        height: 9px;
                        display: inline-block
                    }
                }


            }
            .fn_li_thir_1{
                width: 50px;
                float: right;
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                background: #858b95;
                color: #fff;
            }
        }
    }
</style>
