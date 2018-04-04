<template>
    <!--<div class='bar-chart' :style="{height:height,width:width}">-->
    <!--<div :class="[className]" :id="id" style="height:490px;width:490px;"></div>-->
    <!--</div>-->
    <div>
        <div class='bar-chart' :style="{height:height,width:width}">
            <div :class="className" class="rightFlow" :id="id" style=""></div>
        </div>
        <div style="text-align: center;color: #7e7e7e;font-size: 16px;margin-top: -22px">剩余天数{{remainDay}}天/{{sumDay}}天</div>
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
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
            ]),
        },
        components: {},
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
                sumDay: 0,
                remainDay: 0,
                countday: 10,//默认表盘最大刻度为10天
            };
        },
        mounted() {
            this.initBarRight();
        },
        created() {
            this.getList();

        },
        beforeDestroy() {
            // if (this.timeClear) {
            //     clearInterval(this.timeClear)
            // }
        },
        watch: {//深度 watcher
            remainDay: "initBarRight",
        },
        methods: {
//            timeFun() {
//                this.getList()
//            },
            getList() {
               getPackageInfo({userId: this.uid}).then((resp) => {
               this.sumDay =resp.data.sumDay;
               this.remainDay = resp.data.remainDay;
               if(0<=this.sumDay&&this.sumDay<=100){
                   this.countday=100
               }else if(100<this.countday<=500){
                   this.countday=500
               }
               }).catch((err) => {
                   console.log(err);
               })
            },
            initBarRight() {
//                this.remainDay-this.sumDay
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    backgroundColor: '#F55F5',
                    title: {
                        show: true,
                        x: "center",
                        y: "55%",
                        text: '剩余天数',        //幸运值取代码置于值于此处
                        // subtext: 11,
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
                        backgroundColor: '#0080FF',
                        borderColor: '#0080FF',
                        borderWidth: '1px',
                        textStyle: {
                            color: 'black'
                        }
                    },
                    series: [{
                        name: '剩余天数',
                        type: 'gauge',
                        // startAngle: 180,
                        // endAngle: 0,
                        splitNumber: 10,     //刻度数量
                        min: 0,
                        max: this.countday=100,
                        radius: '70%',      //图表尺寸
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 5,
                                shadowBlur: 0,
                                color: [
                                    [0, '#228B22'],
                                    [0.8, '#228B22'],
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
                                color: "#228B22",
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
//                            value: (this.max - (this.max - Number(this.flow_all))).toFixed(2),
//                            value: this.remainDay-this.sumDay,
                            value: this.remainDay
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
    .rightFlow{
        height:300px;
        width:300px;
        margin: 0 auto;
    }
    @media screen and (max-width: 1566px){
        .rightFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: -50px;
        }
    }
    @media screen and (max-width: 1100px){
        .rightFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: 0;
        }
    }
    @media screen and (max-width: 600px){
        .rightFlow{
            height:300px;
            width:300px;
            margin: 0 auto;
            margin-left: -10px;
        }
    }
</style>

