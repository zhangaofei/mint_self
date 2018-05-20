<template>
    <!--<keep-alive include="test-keep-alive">-->


    <div class="apply">
        <div class="page-tabbar">
            <div class="page-wrap">
                <div class="page-title">
                    <mt-header title="应用中心" v-if="selected=='应用'">
                        <router-link to="/login" slot="left">
                            <mt-button icon="back">返回</mt-button>
                        </router-link>
                        <mt-button icon="more" slot="right" @click="toSearch"></mt-button>
                    </mt-header>
                    <mt-header title="云盘" v-if="selected=='云盘'">
                        <router-link to="/login" slot="left">
                            <mt-button icon="back">返回</mt-button>
                        </router-link>
                        <mt-button icon="more" slot="right"></mt-button>
                    </mt-header>
                    <mt-header title="账号" v-if="selected=='账号'">
                        <router-link to="/login" slot="left">
                            <mt-button icon="back">返回</mt-button>
                        </router-link>
                        <mt-button icon="more" slot="right"></mt-button>
                    </mt-header>
                </div>



                <mt-tab-container class="page-tabbar-container" v-model="selected" swipeable style="padding-bottom: 64px;">
                    <mt-tab-container-item id="应用">
                        <mt-navbar v-model="actived1" style="margin-bottom: 15px">
                            <mt-tab-item id="1">我的收藏</mt-tab-item>
                            <mt-tab-item id="2">全部应用</mt-tab-item>
                            <mt-tab-item id="3">应用</mt-tab-item>
                        </mt-navbar>

                        <mt-tab-container v-model="actived1" swipeable>
                            <mt-tab-container-item id="1">
                                <ul class="ula" >
                                    <li v-for="(item,index) in collectList"  :key="index">
                                        <img slot="icon" :src='item.iconPath' width="30" height="30">
                                        <span class="spa_top" v-if="item.hasOwnProperty('name')">{{item.name}}</span>
                                        <span class="spa_top" v-else-if="item.hasOwnProperty('app_name')">{{item.app_name}}</span>
                                        <!--<span class="spa_bottom">33</span>-->
                                        <span class="spa_right" v-if="'1'==item.is_collect"> <img slot="icon" :src=red width="18" height="18" @click="favoriteCollection(item)" ></span>
                                        <!--<span class="spa_right" v-else> <img slot="icon" :src=red width="18" height="18" @click="collection(item)"></span>-->
                                    </li>
                                </ul>

                            </mt-tab-container-item>

                            <mt-tab-container-item id="2">
                                <bs :bsList="bsList" @bsCollection="collection"></bs>

                                <rdp :rdpList="rdpList" @rdpCollection="collection"></rdp>

                                <cs :csList="csList" @csCollection="collection"></cs>
                            </mt-tab-container-item>

                            <mt-tab-container-item id="3">
                                <ul class="ula" >
                                    <li>
                                        <p class="p_left">推荐应用</p>
                                        <p class="p_right">查看更多</p>
                                    </li>
                                    <li v-for="(n,index) in 3" :key="index">
                                        <img slot="icon" :src=footImg width="30" height="30">
                                        <span class="spa_top">name</span>
                                        <span class="spa_bottom">text</span>
                                        <span class="spa_right"> <img slot="icon" :src=grey width="18" height="18"></span>
                                    </li>
                                </ul>
                                <ul class="ula" >
                                    <li>
                                        <p class="p_left">BS应用</p>
                                        <p class="p_right">查看更多</p>
                                    </li>
                                    <li v-for="(n,index) in 3" :key="index">
                                        <img slot="icon" :src=footImg  width="30" height="30">
                                        <span class="spa_top">22</span>
                                        <span class="spa_bottom">33</span>
                                        <span class="spa_right"> <img slot="icon" :src=grey width="18" height="18"></span>
                                    </li>
                                </ul>
                                <ul class="ula" >
                                    <li>
                                        <p class="p_left">CS应用</p>
                                        <p class="p_right">查看更多</p>
                                    </li>
                                    <li v-for="(n,index) in 3" :key="index">
                                        <img slot="icon" :src=footImg width="30" height="30">
                                        <span class="spa_top">22</span>
                                        <span class="spa_bottom">33</span>
                                        <span class="spa_right"> <img slot="icon" :src=grey width="18" height="18"></span>
                                    </li>
                                </ul>
                            </mt-tab-container-item>
                        </mt-tab-container>

                    </mt-tab-container-item>
                    <mt-tab-container-item id="云盘">
                        <mt-cell v-for="(n,index) in 5"  :key="index" :title="'云盘' + n" />
                    </mt-tab-container-item>

                    <keep-alive include="test-keep-alive">
                    </keep-alive>
                    <mt-tab-container-item id="账号">
                        <ul class="ula" >
                            <li style="height: 70px;line-height: 70px;background:aliceblue">
                                <img slot="icon" :src=footImg  width="30" height="30">
                                <span class="spa_top" style="top: -9px;">{{c_name}}</span>
                                <span class="spa_bottom" style="position: relative;top: 10px;left: -23px;">{{full_name}}</span>
                                <span class="spa_right"> ></span>
                            </li>
                        </ul>
                        <mt-cell
                                title="我的钱包"
                                is-link
                                value="">
                        </mt-cell>
                        <mt-cell
                                title="套餐管理"
                                is-link
                                value="">
                        </mt-cell>
                        <br>
                        <mt-cell
                                title="服务状态"
                                :to="severStatus"
                                is-link
                                value="">
                        </mt-cell>
                        <mt-cell
                                title="安全保护"
                                :to="safeProtect"
                                is-link
                                value="">
                        </mt-cell>
                        <mt-cell
                                title="系统设置"
                                is-link
                                value="">
                        </mt-cell>
                        <mt-cell
                                style="margin-top: 10px;"
                                title="关于与帮助"
                                is-link
                                value="">
                        </mt-cell>
                        <br>
                        <mt-button type="danger" size="large" @click="logout">退出</mt-button>
                    </mt-tab-container-item>

                </mt-tab-container>

            </div>

            <mt-tabbar v-model="selected" fixed>
                <mt-tab-item id="应用">
                    <img slot="icon" :src=footImg>
                    应用
                </mt-tab-item>
                <mt-tab-item id="云盘">
                    <img slot="icon" :src=footImg>
                    云盘
                </mt-tab-item>
                <mt-tab-item id="账号">
                    <img slot="icon" :src=footImg>
                    账号
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
    <!--</keep-alive>-->
</template>

<script>
    import {getResourceList, getCollectList, collectModify, getFlow,getCsList,getRdpList,getback,modCSparam,allFavorites} from 'api/web/web';
    import {mapGetters} from 'vuex';
    import bs  from './subApply/bs';
    import rdp from './subApply/rdp';
    import cs from './subApply/cs';
    export default {
        name:'test-keep-alive',
        components: {
            bs,
            rdp,
            cs
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
                'full_name'
            ]),
        },
        data(){
            return{
                // includedComponents: "test-keep-alive",
                footImg:require('@/assets/imgs/git.png'),
                grey:require('@/assets/client_home/grey_heart.png'),
                red:require('@/assets/client_home/red_heart.png'),
                selected:'应用',
                actived1:'1',
                actived2:'2',
                actived3:'3',
                bsList:[],
                rdpList:[],
                csList:[],
                collectList:[],
                bsPages: {
                    page: 1,
                    page_size: 16,
                    pages: null// 总条数
                },
                severStatus:'/severStatus',
                safeProtect:'/safeProtect'
            }
        },
        created(){
            this.getList();
        },
        methods: {
            toSearch(){
                this.$router.push({path:'./searchPage'})
            },
            getList() {
                getResourceList(this.bsPages).then((resp) => {
                    this.bsList = resp.data.items.res;
                    console.log(this.bsList,'lsit==')
                    // this.setProtocol(resp.http, resp.https);

                }).catch((err) => {
                    console.log(err);
                });
                getRdpList(this.bsPages).then((resp) => {//client 和rdp的集合
                    this.rdpList=resp.data.rdp_res.res;
                    this.csList=resp.data.apps_res.res;
                    console.log(this.csList,'csList==')
                }).catch((err) => {
                    console.log(err);
                });
                allFavorites({user_id: this.uid}).then((resp) => {
                    this.collectList = resp.data.web_res.concat(resp.data.client_res).concat(resp.data.rdp_res);

                }).catch((err) => {
                    console.log(err);
                });
            },
            collection(item) {
                //类型 0:(bs类型),1:rdp,2:TCP/Web
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
                if((item.hasOwnProperty('if_modify')||item.hasOwnProperty('width'))){
                    this.toDownload();
                }else {
                    collectModify({user_id: this.uid, resource_id: item.id, is_collect: item.is_collect,app_type:app_type}).then((resp) => {
                        this.getList();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            favoriteCollection(n) {
                console.log(n,'item')
                let app_type;
                n.is_collect = '0';
                if(n.app_type=='TCP'||n.app_type=='Web'||n.app_type=='ST'){
                    app_type=2;
                }else if(n.hasOwnProperty('width')){
                    app_type=1;
                }else{
                    app_type=0;
                }
                collectModify({user_id: this.uid, resource_id: n.id, is_collect: n.is_collect,app_type:app_type}).then((resp) => {
                    this.getList();
                }).catch((err) => {
                    console.log(err);
                });
            },
            logout(){
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(() => {

                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    a{
        color: #000;
    }
    p{
        margin: 0;
    }
    .apply{
        background-color: #fafafa;
        .mint-cell-value{
            /*flex: 6;*/
        }
        .spa_right{
            position: absolute;
            right: 13px;
        }
        .spa_top{
            position: relative;
            top: -14px
        }
        .spa_bottom{
            position: absolute;
            /*top: 53px;*/
            left: 44px;
        }
        .ula{
            margin-bottom: 10px;
            .p_left{
                float: left;
            }
            .p_right{
                float: right;
                color: cornflowerblue;
            }
            li{
                height: 50px;
                line-height: 50px;
                background: #fff;
                border-bottom: 1px solid lightgray;
                padding: 0 10px;
                color:#ccc
            }
        }
    }
    /*.apply{*/
        /*.footer{*/
            /*.mint-tab-item{*/
                /*height: 40px;*/
                /*padding: 17px 0;*/
            /*}*/
        /*}*/
    /*}*/

    /*.page-tabbar {*/
        /*overflow: hidden;*/
        /*height: 100vh;*/
    /*}*/

    /*.page-wrap {*/
        /*overflow: auto;*/
        /*height: 100%;*/
        /*padding-bottom: 100px;*/
    /*}*/
</style>






















