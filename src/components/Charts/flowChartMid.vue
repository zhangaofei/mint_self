<template>
    <!--<div class='bar-chart' :style="{height:height,width:width}">-->
    <!--<div :class="[className]" :id="id" style="height:490px;width:490px;"></div>-->
    <!--</div>-->
    <div>
        <div class='bar-chart' :style="{height:height,width:width}">
            <div :class="className" class="midFlow" :id="id" style=""></div>
        </div>
        <div style="text-align: center;color: #7e7e7e;font-size: 16px;margin-top: -22px">剩余流量{{remainFollow.toFixed(1)}}MB/{{sumFollow.toFixed(1)}}MB</div>
    </div>

</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    //    ********self*****
    require('echarts/lib/chart/gauge');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/visualMap');
    import {getFlow} from 'api/web/web'
    import {getPackageInfo} from 'api/myAcount/myAcount'
    import {mapGetters} from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
            ]),
        },
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '310px'
            }
        },
        data() {
            return {
                sumFollow: 0,
                remainFollow: 0,
                countFollow:10,
                flow: null,
                max: 0,
            };
        },
        mounted() {
            this.initBarMid();
        },
        created() {
            this.getList();
//            this.$nextTick(function () {
//                this.timeClear = setInterval(this.timeFun, 5000)
//            })
            console.log(this.uid,'uid=========')
        },
        watch: {//深度 watcher
            sumFollow: "initBarMid",
        },
        methods: {
//            timeFun() {
//                this.getList()
//            },
            getList() {
               getPackageInfo({userId: this.uid}).then((resp) => {
                   this.sumFollow =resp.data.sumFollow;//单位MB
                   this.remainFollow = resp.data.remainFollow;
                   if(0<=this.sumFollow&&this.sumFollow<=100){
                       this.countFollow=100;
                   }else if(100<this.sumFollow<=500){
                       this.countFollow=500
                   }else if(500<this.sumFollow<=1024){
                       this.countFollow=1000//MB
                   }else if(1024<this.sumFollow<=1024*10){
                       this.countFollow=10//G
                   }else {
                       this.countFollow=(this.sumFollow/1000) //G
                   }

               }).catch((err) => {
                   console.log(err);
               });

            },
            initBarMid() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    backgroundColor: '#F55F5',
                    title: {
                        show: true,
                        x: "center",
                        y: "55%",
                        text: '剩余流量',        //幸运值取代码置于值于此处
                        subtext: (this.remainFollow).toFixed(1),
                        textStyle: {
                            fontSize: 12,
                            color: "grey"
                        },
                        subtextStyle: {
                            fontSize: 18,
                            fontWeight: 'bolder',
                            fontStyle: 'normal',
                            color: "#00B0F0"
                        },
                    },
                    tooltip: {
                        show: true,
                        formatter: "{a}{b}：{c}",
                        backgroundColor: '#228B22',
                        borderColor: '#228B22',
                        borderWidth: '1px',
                        textStyle: {
                            color: 'black'
                        }
                    },
                    series: [{
                        name: '剩余流量',
                        type: 'gauge',
                        // startAngle: 180,
                        // endAngle: 0,
                        splitNumber: 10,     //刻度数量
                        min: 0,
                        max: this.sumFollow,
                        radius: '70%',      //图表尺寸
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 5,
                                shadowBlur: 0,
                                color: [
                                    [0, '#228B22'],
                                    [0.8, '#228B22'],
//                                    [1, 'grey']
                                    [1, '#228B22']//浅蓝色
                                ]
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: "#228B22",
                                width: 1
                            },
                            length: 10,
                            splitNumber: 5
                        },
                        splitLine: {
                            show: true,
                            length: 15,
                            lineStyle: {
                                color: '#228B22'
                            }
                        },
                        axisLabel: {
                            distance: 5,//外圈数字带圆圈的距离
                            textStyle: {
                                color: "#00B0F0",
                                fontSize: "10",
                            },
                            formatter: function (e) {
                                switch (e + "") {
                                    case "0":
                                        return "0";
                                    case "10":
                                        return "10";
                                    case "20":
                                        return "20";
                                    case "30":
                                        return "30";
                                    case "40":
                                        return "40";
                                    case "50":
                                        return "50";
                                    case "60":
                                        return "60";
                                    case "70":
                                        return "70";
                                    case "80":
                                        return "80";
                                    case "90":
                                        return "90";
                                    default:
                                        return e;
                                }
                            }
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {           //指针评价
                            show: '',//当前能力值
                            offsetCenter: [0, 0],
                            textStyle: {
                                fontSize: 16,
                                color: "#C7FBFC"
                            },

                        },
                        title: {
                            textStyle: {
                                fontSize: 20,
                                fontWeight: 'bolder',
                                fontStyle: 'normal',
                                color: "#C7FBFC"
                            },
                            offsetCenter: [0, 14]
                        },
                        data: [{
                            name: " ",
//                            value: (this.max - (this.max - Number(this.sumFollow))).toFixed(2),
                            value: this.remainFollow.toFixed(1),
//                            value: 100
                        }]
                    }]
                })
            }
        }
    }
</script>
<style>
    #char > div {
        width: 349px;
        height: 350px;
    }
    .midFlow{
        height:300px;
        width:300px;
        margin: 0 auto;
    }
    @media screen and (max-width: 1566px){
        .midFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: -50px;
        }
    }
    @media screen and (max-width: 1100px){
        .midFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: 0;
        }
    }
    @media screen and (max-width: 600px){
        .midFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: -10px;
        }
    }
</style>

