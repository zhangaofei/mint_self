<template>
   <div>
       <ul class="ul_cont">
           <li v-for="item in list" class="li_cont">
               <div><a :href="getUrl(item)" target="_blank"><img :src="item.iconPath" alt="" class="aimg"></a>
               </div>
               <div class="div2">
                   <p>
                       <a :href="getUrl(item)" target="_blank">
                           <el-tooltip placement="top" effect="light">
                               <div slot="content"> {{item.name}}</div>
                               <div class="list_tooltip" >{{item.name}}</div>
                           </el-tooltip>
                       </a>
                   </p>
                   <!--<P >WEB&nbsp;应用</P>-->
                   <p >应用</p>
                   <p>
                       <img :src="red" alt="" @click="collection(item)" v-if="'1'==item.is_collect">
                       <img :src="grey" alt="" @click="collection(item)" v-else>
                       <!--<span style="color:#e02222" v-if="'1'==item.is_collect">已收藏</span>-->
                       <!--<span style="color:#9b9b9b" v-else>未收藏</span>-->
                   </p>
               </div>
           </li>
       </ul>
       <div class="block" style=""  v-if="bsPages.pages>16?true:false">
           <el-pagination
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="bsPages.page"
                   :page-size="bsPages.page_size"
                   :page-sizes="[16]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="bsPages.pages">
           </el-pagination>
       </div>
   </div>
</template>

<script>
    import circleChart from 'components/Charts/circleChart';
    import {loginType,getAllMsg} from  'api/myAcount/myAcount'
    import {getResourceList, getCollectList, collectModify, getFlow,getCsList,getRdpList,getback,modCSparam,allFavorites} from 'api/web/web';
    import {mapGetters} from 'vuex'
    import store from "../../../../../store/index";
    import {formatSeconds2} from '../../../../../utils/dateUtil'
    import { Base64 } from 'js-base64';

    export default {
        components: {
            circleChart
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
                'lowVersion'
            ]),
        },
        data() {
            return {
                flag: true,//默认调一次
                list: null,
                http: null,
                isShow: true,
                activeName: 'first',
                appFnId: null,
                bsPages: {
                    page: 1,
                    page_size: 16,
                    pages: null// 总条数
                },
                protocol: {
                    HTTP: '',
                    HTTPS: ''
                },
                grey: require('assets/client_home/grey_heart.png'),
                red: require("assets/client_home/red_heart.png"),
            };
        },
        props:['bsData'],
        mounted(){
            let that=this;
            this.$nextTick(function () {
                setTimeout(function () {
                    that.getList();
                },500)

            });
        },
        methods: {
            // **********分页************
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.bsPages.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页bs: ${val}`);
                this.bsPages.page = val;
                this.getList();
            },
            // *******end***************
            getUrl(item) {
                let url = this.protocol[item.protocol] + item.url
                return url
            },
            setProtocol(http, https) {
                this.protocol['HTTP'] = http;
                this.protocol['HTTPS'] = https;
            },
            getList() {
                getResourceList(this.bsPages).then((resp) => {
                    this.bsPages.pages = resp.data.items.page_count;
                    // this.http = resp.http;
                    this.list = resp.data.items.res;
                    this.setProtocol(resp.http, resp.https);

                }).catch((err) => {
                    console.log(err);
                });
            },
            collection(item) {
                this.$emit('bsShowCollection',item)
            },
            collectionHome(n) {
                let app_type;
                n.is_collect = '0';
                console.log(n.hasOwnProperty('width'), 'home', n.width);
                if (n.app_type == 'TCP' || n.app_type == 'Web') {
                    app_type = 2;
                } else if (n.hasOwnProperty('width')) {
                    app_type = 1;
                } else {
                    app_type = 0;
                }
                collectModify({
                    user_id: this.uid,
                    resource_id: n.id,
                    is_collect: n.is_collect,
                    app_type: app_type
                }).then((resp) => {
                    this.getList();
                }).catch((err) => {
                    console.log(err);
                });
            }
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