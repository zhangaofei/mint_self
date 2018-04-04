<template>
    <div class="ios">
        <div class="headed">
            <div class="head_d1">
                <img src="../../../assets/middlePage/middle_logo.png" alt="" v-if="true">
                <span @click="goBack">返回</span>
            </div>
            <div class="head_d2">
                <img src="../../../assets/middlePage/middle_casb.png" alt="">
                <!--<img src="../../assets/middlePage/HQ.gif" alt="">-->
            </div>
        </div>
        <div class="middle" >
            <!--style="height: 317px;"-->
            <div class="" v-if="true">
                <el-carousel trigger="click" height="302px">
                    <el-carousel-item v-for="item in arrImg" :key="item">
                        <h3>
                            <img :src="item" alt="">
                        </h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="foot">
            <div class="foot_d1">
                <span>点击下载 ios版，或直接在应用市场下载</span>
            </div>
            <div style="padding-bottom: 20px" class="foot_d2">
                <el-button
                        type="primary"
                        class="btn_save btn_right"
                        style="width: 140px;background: #2474c7!important;opacity: 0.8;"
                        @click="toOpen"
                >
                    打开 CASB APP
                </el-button>
            </div>
            <div>
                <el-button
                        type="primary"
                        class="btn_save btn_left"
                        style="width: 140px;background: #2474c7!important;opacity: 0.8;"
                        @click="toDownload">
                    下载 CASB APP
                </el-button>
            </div>
            <div style="" class="foot_d4" v-if="true">
                <span class="pan3">Copyright ©{{dateYear}} 易安联网络科技有限公司保留所有权利</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "redirect-ios",
        components: {

        },
        ...mapGetters([
            'firstLoginFlag'
        ]),
        computed:{
            dateYear(){
                return new Date().getFullYear()
            }
        },
        data(){
            return{
                arrImg:[require('../../../assets/middlePage/app01.png'),require('../../../assets/middlePage/app02.png'),require('../../../assets/middlePage/app03.png')]
            }
        },
        created(){
            console.log(navigator.userAgent);
            // window.location.href = 'openCASBs://';
        },
        methods:{
            toDownload(){
                window.location.href = 'https://itunes.apple.com/cn/app/id1342952931';//new3.0
                // window.location.href = 'https://itunes.apple.com/cn/app/id1186617078';
            },
            toOpen(){
                window.location.href = 'openCASBs://';
            },
            goBack(){
                window.history.go(-1);
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .ios{
        width: 100vw;
        min-height: 100%;
        background: url("../../../assets/middlePage/middlePageS.jpg") 0 0;
        background-size: cover;
        .headed{
            padding-bottom: 48px;
            .head_d1 {
                position: relative;
                img{
                    width: 50vw;
                    max-width: 212px;
                    min-width: 186px;
                    padding-left: 17px;
                    padding-top: 17px;
                }
                span{
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    color: #FFF;
                }
            }
            .head_d2 {
                text-align: center;
                padding-top: 26px;
                img{
                    width: 46vw;
                }
            }
        }
        .middle{
            padding: 15px;
            padding-bottom:0 ;
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 150px;
                margin: 0;
                text-align: center;
            }
            h3 img{
                width: 100%;
            }
            .el-carousel__item:nth-child(2n) {
                /*background-color: #99a9bf;*/
            }

            .el-carousel__item:nth-child(2n+1) {
                /*background-color: #d3dce6;*/
            }
        }
        .foot{
            padding: 20px;
            padding-top: 0;
            text-align: center;
            font-size: 12px;
            .foot_d1{
                padding: 10px;
                color: #fff;
                font-family: SourceHanSabCN Light;
                opacity: 0.7;
            }
            .foot_d4{
                text-align: center;
                color: #fff;
                padding-top: 20px;
                opacity: 0.7;
            }
        }
    }
</style>