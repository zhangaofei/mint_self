<template>
    <div>
        <ul class="ul_cont">
            <li v-for="item in rdpList" class="li_cont">
                <div @click="rdpOpen(item)"><a ><img :src="item.icon_path" alt="" class="aimg"></a>
                </div>
                <div class="div2">
                    <p>
                        <a @click="rdpOpen(item)">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content"> {{item.app_name}}</div>
                                <div class="list_tooltip" >{{item.app_name}}</div>
                            </el-tooltip>
                        </a>
                    </p>
                    <p>应用</p>
                    <p>
                        <img :src="red" alt="" @click="collection(item)" v-if="'1'==item.is_collect">
                        <img :src="grey" alt="" @click="collection(item)" v-else>
                        <!--<span style="color:#e02222" v-if="'1'==item.is_collect">已收藏</span>-->
                        <!--<span style="color:#9b9b9b" v-else>未收藏</span>-->
                    </p>
                </div>
            </li>
        </ul>
        <div class="block" style=""  v-if="rdpPages.pages>16?true:false">
            <el-pagination
                    @size-change="handleSizeChangeRdp"
                    @current-change="handleCurrentChangeRdp"
                    :current-page="rdpPages.page"
                    :page-size="rdpPages.page_size"
                    :page-sizes="[16]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="rdpPages.pages">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { getRdpList} from 'api/web/web';
    import {mapGetters} from 'vuex'
    var qs = require('qs');
    export default {
        name: "rdp-app",
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
                list: null,
                agentObj:{},
                rdpPages: {
                    page: 1,
                    page_size: 16,
                    pages: null // 总条数
                },
                rdpList:[],
                grey: require('assets/client_home/grey_heart.png'),
                red: require("assets/client_home/red_heart.png"),
            };
        },
        props:['rdpData'],
        created(){
            this.getList();
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
        },
        methods: {
            handleSizeChangeRdp(val) {
                this.rdpPages.page_size = val;
                this.getList();
            },
            handleCurrentChangeRdp(val) {
                this.rdpPages.page = val;
                this.getList();
            },

            getList() {
                getRdpList(this.rdpPages).then((resp) => {//client 和rdp的集合
                    this.rdpPages.pages= resp.data.rdp_res.page_count;
                    this.rdpList=resp.data.rdp_res.res;
                }).catch((err) => {
                    console.log(err);
                });
            },
            rdpOpen(item) {
                console.log(item.id + '2', 'rdpid==');
                if(this.agentObj.win>=0||this.agentObj.mac>=0) {
                    if (this.vpnStatus == '0'||this.vpnStatus ==undefined) {
                        this.$router.push({path: '/downLoad'});
                    } else {
                        let rdpId = item.id + '2';
                        let argument = 'url=' + item.host_or_ip + ':' + item.port + ';' + 'name=' + item.user_name + ';' + 'domain=' + item.domain + ';' + 'width=' + item.width + ';' + 'pass=' + item.password + ';'
                            + 'height=' + item.height + ';' + 'programpath=' + item.program_path + ';' + 'workdir=' + item.program_name;
                        $.ajax({
                            type: "get",
                            async: false,
                            url: "https://tx.enlink.cn:18990/api/enlink/doRDPLive?id=" + rdpId + "&argument=" + argument,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "callback",
                            success: function (json) {
                            },
                            error: function () {

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
            collection(item) {
                this.$emit('rdpShowCollection',item)
            }
        }
    }
</script>

<style scoped>

</style>