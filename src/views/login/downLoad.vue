<template>
    <div class="body_down">
        <div class="nav_down">
            <div v-if="true"><img src="../../assets/client_login/new_login_logo.png" alt=""></div>
            <ul style="float: right;">
                <li>
                    <router-link to="/login" class="pointer">首页</router-link>
                </li>
                <li>
                    <router-link to="/downLoad" class="pointer">下载中心</router-link>
                </li>
                <li>
                    <!--<router-link to="/login">帮助中心</router-link>-->
                    <a @click="helping" class="pointer">帮助中心</a>
                </li>
                <li>
                    <!--<a @click="toWeb">回到主页</a>-->
                    <a  @click='goBack' class="pointer">返回</a>
                </li>
            </ul>
        </div>
        <div class="maind">
            <div class="main_one">
                <p  style=""><img src="../../assets/client_download/downLoad_logo.png" alt="" v-if="true"></p>
                <!--<p>让世界触手可及</p>-->
                <div style="" class="div_one">
                    <ul>
                        <li @click="onWin">
                            <span v-if="Win"><img src="../../assets/client_download/window_blue.png" alt=""></span>
                            <span v-else><img src="../../assets/client_download/window_grey.png" alt=""></span>
                        </li>
                        <li @click="onMacOS">
                            <span v-if="MacOS"><img src="../../assets/client_download/macos_blue.png" alt=""></span>
                            <span v-else="MacOS"><img src="../../assets/client_download/macos_grey.png" alt=""></span>
                        </li>
                        <li @click="onMobile" style="padding-right: 0;">
                            <span v-if="Mobile"><img src="../../assets/client_download/mobile_blue.png" alt=""></span>
                            <span v-else><img src="../../assets/client_download/mobile_grey.png" alt=""></span>
                        </li>
                    </ul>
                    <!--zaf-->
                    <div class="main_one_down" v-if="Win">
                        <div class="down_btn pointer" @click="windowDowm">立即下载</div>
                        <ul class="down_ul">
                            <li>支持windows7、8、10</li>
                            <li>&nbsp; V3.0.0&nbsp;</li>
                            <li style="border-right:0">&nbsp;2017.08.03</li>
                        </ul>
                    </div>
                    <div class="main_one_down" v-if="MacOS">
                        <div class="down_btn pointer" @click="macosDowm">立即下载</div>
                        <ul class="down_ul">
                            <li>支持macOS Sierra</li>
                            <li> &nbsp; V3.0.2&nbsp;</li>
                            <li style="border-right:0">&nbsp;2017.08.03</li>
                        </ul>
                    </div>
                    <div class="main_one_down" v-if="Mobile" >
                        <!--style="margin-left: 43px"-->
                        <!--<div class="down_btn">立即下载</div>-->
                        <div class="ewm_app">
                            <img src="../../assets/client_download/two_code.png" alt="">
                            <p style="" class="spa_down"><span>扫面下载手机版，或者直接点击下载</span></p>
                        </div>
                        <div class="apply">
                            <ul class="down_ul">
                                <li class="down_app pointer" @click="iosDown"><img src="../../assets/client_download/btn_app.png" alt=""></li>
                                <li class="down_app pointer" @click="androidDown"><img style="margin-left: -18px;"
                                                                               src="../../assets/client_download/btn_andriod.png" alt=""></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main_two" v-if="true">
                <div><img src="../../assets/client_download/windows.png" alt=""></div>
            </div>

        </div>
        <div class="footer" v-if="true">
            <span>Copyright ©{{dateYear}} 易安联网络科技有限公司保留所有权利</span>
        </div>
    </div>
</template>
<script>
    import {getAddr} from 'api/web/web';
    export default({
        data() {
            return {
                androidVersion:'',
                pcVersion:'',
                Win: true,
                MacOS: false,
                Mobile: false
            };
        },
        created(){
            console.log(this.$router, "----====-----");
            this.getList();
        },
        computed:{
            dateYear(){
                return new Date().getFullYear()
            }
        },
        methods: {
            onWin(){
                this.Win = true;
                this.Mobile = false;
                this.MacOS = false;
            },
            onMacOS(){
                this.Win = false;
                this.MacOS = true;
                this.Mobile = false;
            },
            onMobile(){
                this.Win = false;
                this.MacOS = false;
                this.Mobile = true;
            },
            windowDowm(){
//                 location.href='http://192.168.5.181/package/install/Setup_V3.0.1.1.exe'
                if(this.pcVersion){
                    window.location.href = '/package/install/'+this.pcVersion;
                }else {
                    window.location.href = location.host
                }
            },
            macosDowm(){
                // location.href='http://192.168.5.181/package/install/Setup_V3.0.1.1.exe'
            },
            androidDown(){
                if(this.androidVersion){
                    window.location.href = '/package/install/'+this.androidVersion;
                }else {
                    window.location.href = location.host
                }
            },
            iosDown(){
                window.location.href = 'https://itunes.apple.com/cn/app/id1342952931';//new3.0
            },
            getList(){
                getAddr().then((resp) => {
                    if(resp.data.hasOwnProperty('pc_version') && resp.data.pc_version.hasOwnProperty('show_version')){
                        this.pcVersion=resp.data.pc_version.show_version;//"Setup_V3.0.1.1.exe"
                    }
                    if(resp.data.hasOwnProperty('android_version')&&resp.data.android_version.length>0){
                        this.androidVersion=resp.data.android_version[0].show_version;//"app-debug.apk"
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            goBack(){
                window.history.go(-1)
            },
            helping(){
                window.location.href='http://www.enlink.com.cn';
                // window.location.href='http://www.hqsec.com';
            }
        }
    })
</script>
<!--scoped-->
<style rel="stylesheet/scss" lang="scss">
    .body_down ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .body_down li {
        display: inline-block;
    }

    .body_down a {
        text-decoration: none;
        color: #fff;
    }

    * {
        box-sizing: border-box;
    }

    .body_down {
        height: 100%;
        /*min-height: 100%;*/
        background: url("../../assets/client_download/down_bg.jpg");
        background-position: left top;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        position: relative;
        min-height: 700px;
        min-width: 1200px
    }

    .body_down .nav_down {
        height: 75px;
        line-height: 75px;
        overflow: hidden;
        padding: 10px;
    }

    .body_down .nav_down div {
        float: left;
        margin-left: 40px;
    }

    .body_down .nav_down  ul {
        float: right;
        font-size: 16px;
        /*font-weight: bold;*/
        color: #d9d9d9;
    }

    .body_down .nav_down li {
        margin-right: 40px;
        float: left;

    }

    .body_down .nav_down img {
        /*width: 190px;*/
    }

    /******************************maind***********************************/
    .body_down .maind {
        color: #fff;
        overflow: hidden;
        margin: auto;

        /*************************/
        position: absolute;
        /*left: 55%;*/
        /*top: 50%;*/
        left: 0;
        right: 0;
        top: -54px;
        bottom: 0;
        /*width: 1200px;*/
        margin-top: 275px;

        width: 75%;
        min-width: 1200px;
        /*margin-left: -600px;*/
        /*text-align: center;*/
        /*margin-bottom: -170px;*/
        /*margin-right: -600px;*/

    }


    .body_down .maind .main_one {
        float: left;
        width: 42%;
        text-align: center;
        /*margin-top: 90px;*/
        /*margin-left: 30%;*/
    }

    .maind .main_one p {
        font-size: 33px;
        color: rgba(242, 242, 242, 0.698039215686274);
        margin: 15px 0;
    }
    .main_one .div_one{
        margin-left: 100px;
        margin-top: 75px;
    }
    .main_one div ul{
        margin-bottom:15px;
        overflow: hidden;
    }
    .main_one div ul  li {
        /*padding-right: 40px;*/
        padding-right: 17px;
        height: 30px;
        margin-bottom: 15px;
        float: left;
    }

    .main_one_down {
        height: 100px;
        position: relative;
    }

    .main_one_down .down_btn {
        background-color: #1f80e6;
        text-align: center;
        height: 80px;
        width: 377px;
        line-height: 80px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        font-size: 24px;
        color: #f1f1f1;
        margin-bottom: 20px;
        /*margin-left: 43px;*/
    }

    .main_one_down  ul li {
        padding-right: 10px;
        margin-left: 5px;
        /*border-right: 1px solid;*/
        float: left;
        font-size: 17px;
    }


    .main_one_down .apply {
        position: absolute;
        top: -10px;
        left: 96px;
    }

    .main_one_down .apply li {
        display: block;
    }

    .main_one_down .apply .down_app {
        background-color: #1f80e6;
        width: 240px;
        height: 54px;
        text-align: center;
        line-height: 54px;
        margin-bottom: 12px;
        border-radius: 10px;
    }

    .ewm_app {
        position: absolute;
        top: -6px;
        left: -127px;
        /*.spa_down{*/
        /*font-size: 14px;*/
        /*margin-left: 107px*/
        /*}*/
    }

    .ewm_app p{
        font-size: 14px;
        color:#d3d3d3;
        margin-left: 96px;
    }

    .ewm_app img {
        height: 113px;
        /*margin-left: 91px;*/
    }
    .main_one_down .ewm_app .spa_down{
        font-size: 14px;
        margin-left: 107px
    }

    .main_two {
        float: left;
        width: 44%;
        margin-left: 10%;
        min-width: 500px;
    }

    .main_two img {
        width: 100%;
    }

    /******************************footer***********************************/
    .body_down .footer {
        height: 60px;
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        margin: 0 auto;
        z-index: 0;
        overflow: hidden;
        color: #fff;
        font-size: 16px;
        padding: 20px 0;
        border-top: 1px solid #fff;
        opacity:0.7;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    /*ipad*/
    @media screen and (min-width: 601px) and (max-width:1100px){
        .body_down {
            height: 100%;
            /*min-height: 100%;*/
            width: 100vw;
            background: url("../../assets/client_download/down_bg.jpg");
            background-position: left top;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: cover;
            position: relative;
            min-height: 540px !important;
            min-width: 50vw !important;
            .nav_down {
                /*height: 75px;*/
                /*line-height: 75px;*/
                width:100vw;
                overflow: hidden;
                padding: 10px;
                div {
                    float: left;
                    margin-left: 0;
                    img{
                        width: 251px;
                        margin-top: -4px;
                    }
                }
                ul {
                    float: right;
                    font-size: 16px;
                    /*font-weight: bold;*/
                    color: #d9d9d9;
                    li {
                        margin-right: 17px;
                        float: left;
                    }
                }
            }
            .maind {
                color: #fff;
                overflow: hidden;
                margin: auto;
                font-size: 12px;
                /*************************/
                position: absolute;
                left: 0;
                right: 0;
                top: -54px;
                bottom: 0;
                margin-top: 275px;
                /*width: 75%;*/
                min-width: 100vw !important;
                .main_one {
                    float: left;
                    width: 50vw;
                    /*width: 42%;*/
                    text-align: center;
                    .div_one{
                        margin: 0;
                        ul{
                            margin-bottom:15px;
                            overflow: hidden;
                            li {
                                /*height: 30px;*/
                                /*margin-bottom: 15px;*/
                            }
                            li {
                                padding-right: 10px;
                                margin-left: 5px;
                                margin-bottom: 15px;

                                /*border-right: 1px solid;*/
                                float: none;
                                font-size: 17px;
                                span{
                                    img{
                                        width: 12vw;
                                        max-width: 68px;
                                    }
                                }
                            }
                        }
                    }
                    p {
                        font-size: 33px;
                        color: rgba(242, 242, 242, 0.698039215686274);
                        margin: 15px 0;
                        margin-top: 0;
                        img{
                            width: 40vw;
                        }
                    }
                    /*zaf*/
                    .main_one_down{
                        height: 100px;
                        position: relative;
                        .down_btn {
                            background-color: #1f80e6;
                            text-align: center;
                            height: 30px;
                            /*width: 240px;*/
                            width: 40vw;
                            max-width: 210px;
                            line-height: 30px;
                            -webkit-border-radius: 10px;
                            -moz-border-radius: 10px;
                            border-radius: 10px;
                            font-size: 12px;
                            color: #f1f1f1;
                            margin: auto;
                            margin-bottom: 20px;
                        }
                        .down_ul{
                            /*line-height: 30px;*/
                            li{
                                font-size: 12px;
                                padding-right: 2px;
                                border-right: 0;
                            }
                        }

                        .apply {
                            position: absolute;
                            top: -10px;
                            left: 190px;
                            li {
                                display: block;
                            }
                            .down_app {
                                background-color: #1f80e6;
                                /*width: 240px;*/
                                /*height: 54px;*/
                                text-align: center;
                                /*line-height: 54px;*/
                                margin-bottom: 12px;
                                border-radius: 10px;
                                font-size: 12px;
                                width: 20vw;
                                height: 41px;
                                line-height: 41px;
                                max-width: 179px;
                                img{
                                    width: 19vw;
                                    max-width: 78px;
                                }
                            }
                        }
                        .ewm_app {
                            position: absolute;
                            top: -6px;
                            left: -3px;
                            img {
                                /*height: 113px;*/
                                width: 15vw;
                                height: 100%;
                                max-width: 78px;
                            }
                            p{
                                span{
                                    font-size: 8px;
                                    margin-left: 40px;
                                }
                            }
                        }
                    }

                }
                .main_two {
                    float: left;
                    margin-left: 0;
                    width: 50vw;
                    min-width: 50vw;
                    img {
                        /*width: 100%;*/
                        width: 42vw;
                    }
                }

            }
        }
        /******************************footer***********************************/
        .body_down .footer {
            height: 60px;
            width: 100%;
            position: absolute;
            bottom: 0;
            text-align: center;
            margin: 0 auto;
            z-index: 0;
            overflow: hidden;
            color: #fff;
            font-size: 12px;
            padding: 20px 0;
            border-top: 1px solid #fff;
            opacity:0.7;
        }
    }

</style>
<!--移动适配-->
<style rel="stylesheet/scss" lang="scss">
    @media screen and (max-width: 600px){
        .body_down {
            height: 100%;
            width: 100vw;
            background: url("../../assets/client_download/down_bg.jpg");
            background-position: left top;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: cover;
            position: relative;
            min-height: 540px !important;
            min-width: 50vw !important;
            .nav_down {
                /*height: 75px;*/
                /*line-height: 75px;*/
                width:100vw;
                overflow: hidden;
                padding: 10px;
                div {
                    float: left;
                    margin-left: 0;
                    img{
                        width: 180px;
                        margin-top: -4px;
                    }
                }
                ul {
                    float: right;
                    font-size: 12px;
                    /*font-weight: bold;*/
                    color: #d9d9d9;
                    li {
                        margin-right: 3px;
                        float: left;
                    }
                }
            }
            .maind {
                color: #fff;
                overflow: hidden;
                margin: auto;
                font-size: 12px;
                /*************************/
                position: absolute;
                left: 0;
                right: 0;
                top: -54px;
                bottom: 0;
                margin-top: 275px;
                /*width: 75%;*/
                min-width: 100vw !important;
                .main_one {
                    float: left;
                    width: 50vw;
                    max-width: 231px;
                    /*width: 42%;*/
                    text-align: center;
                    .div_one{
                        margin: 0;
                        ul{
                            margin-bottom:15px;
                            overflow: hidden;
                            margin-left: 16px;
                            li {
                                /*height: 30px;*/
                                /*margin-bottom: 15px;*/
                            }
                            li {
                                padding-right: 5px;
                                margin-left: 5px;
                                margin-bottom: 15px;

                                /*border-right: 1px solid;*/
                                float: left;
                                font-size: 17px;
                                span{
                                    img{
                                        width: 12vw;
                                        max-width: 51px;
                                    }
                                }
                            }
                        }
                    }
                    p {
                        font-size: 33px;
                        color: rgba(242, 242, 242, 0.698039215686274);
                        margin: 15px 0;
                        margin-top: 0;
                        img{
                            width: 40vw;
                            max-width: 173px;
                        }
                    }
                    /*zaf*/
                    .main_one_down{
                        height: 100px;
                        position: relative;
                        .down_btn {
                            background-color: #1f80e6;
                            text-align: center;
                            height: 30px;
                            /*width: 240px;*/
                            width: 40vw;
                            max-width: 161px;
                            line-height: 30px;
                            -webkit-border-radius: 10px;
                            -moz-border-radius: 10px;
                            border-radius: 10px;
                            font-size: 12px;
                            color: #f1f1f1;
                            margin: auto;
                            margin-bottom: 20px;
                        }
                        .down_ul{
                            /*line-height: 30px;*/
                            li{
                                font-size: 7px;
                                padding-right: 2px;
                                border-right: 0;
                            }
                        }

                        .apply {
                            position: absolute;
                            top: -10px;
                            left: 98px;
                            li {
                                display: block;
                            }
                            .down_app {
                                background-color: #1f80e6;
                                /*width: 240px;*/
                                /*height: 54px;*/
                                text-align: center;
                                /*line-height: 54px;*/
                                margin-bottom: 12px;
                                border-radius: 10px;
                                font-size: 12px;
                                width: 20vw;
                                height: 30px;
                                line-height: 30px;
                                img{
                                    width: 13vw;
                                }
                            }
                        }
                        .ewm_app {
                            position: absolute;
                            top: -6px;
                            left: -35px;
                            img {
                                width: 15vw;
                                height: 100%;
                                max-width: 63px;
                            }
                            p{
                                span{
                                    font-size: 8px;
                                    margin-left: 40px;
                                }
                            }
                        }
                    }

                }
                .main_two {
                    float: left;
                    margin-left: 0;
                    width: 50vw;
                    min-width: 50vw;
                    img {
                        /*width: 100%;*/
                        width: 42vw;
                    }
                }

            }
        }
        /******************************footer***********************************/
        .body_down .footer {
            height: 60px;
            width: 100%;
            position: absolute;
            bottom: 0;
            text-align: center;
            margin: 0 auto;
            z-index: 0;
            overflow: hidden;
            color: #fff;
            font-size: 12px;
            padding: 20px 0;
            border-top: 1px solid #fff;
            opacity:0.7;
        }
    }

</style>
