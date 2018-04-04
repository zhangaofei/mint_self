<template>
    <div class="ipad">
        <div class="headed">
            <div class="head_d1" v-if="true">
                <img src="../../../assets/middlePage/middle_logo.png" alt="">
            </div>
            <div class="head_d2">
                <img src="../../../assets/middlePage/middle_casb.png" alt="">
                <!--<img src="../../assets/middlePage/HQ.gif" alt="">-->
            </div>
        </div>
        <div class="middle">
            <div class="">
                <el-carousel trigger="click" height="408px">
                    <el-carousel-item v-for="item in arrImg" :key="item" v-if="true">
                        <h3>
                            <img :src="item" alt="">
                        </h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="foot">
            <div class="foot_d1">
                <span>点击下载 Andorid版 / ios版，或直接在应用市场下载</span>
            </div>
            <div style="padding-bottom: 15px" class="foot_d2">
                <el-button
                        type="primary"
                        class="btn_save btn_right"
                        style=""
                        @click="toOpen"
                >
                    打开 CASB APP
                </el-button>
            </div>
            <div>
                <el-button
                        type="primary"
                        class="btn_save btn_left"
                        style=""
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
                arrImg:[require('@/assets/middlePage/app01.png'),require('@/assets/middlePage/app02.png'),require('@/assets/middlePage/app03.png')]
            }
        },
        created(){
            console.log(navigator.userAgent);
            window.location.href = 'openCASBs://';
        },
        methods:{
            toDownload(){
                window.location.href = 'https://itunes.apple.com/cn/app/id1342952931';//new3.0
                // window.location.href = 'https://itunes.apple.com/cn/app/id1186617078';
            },
            toOpen(){
                window.location.href = 'openCASBs://';
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .ipad{
        .btn_save{
            width: 200px;
            height:43px;
            background: #2474c7!important;
            opacity: 0.8;
            span{
                font-size: 18px!important;
                font-family: "SourceHanSabCN Light" !important;
            }
        }
        width: 100vw;
        min-height: 100%;
        background: url("../../../assets/middlePage/middlePageL.jpg") 0 0;
        background-size: cover;
        .headed{
            padding-bottom: 75px;
            .head_d1 img{
                width: 30vw;
                /*max-width: 225px;*/
                min-width: 186px;
                padding-left: 40px;
                padding-top: 45px;
            }
            .head_d2 {
                text-align: center;
                /*padding-top: 26px;*/
                padding-top: 108px;
                img{
                    width: 38vw;
                }
            }
        }
        .middle{
            padding: 15px;
            /*padding-bottom:0 ;*/
            padding-bottom:19px ;
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
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
            padding-top: 10px;
            text-align: center;
            font-size: 12px;
            .foot_d1{
                padding: 10px;
                color: #fff;
                font-family: "SourceHanSabCN Light";
                opacity: 0.7;
                padding-bottom: 35px;
            }
            .foot_d4{
                /*position: absolute;*/
                /*bottom: 0;*/
                height: 95px;
                padding-top:38px ;
                width: 100%;
                text-align: center;
                color: #fff;
                opacity: 0.7;
            }
        }
    }
</style>