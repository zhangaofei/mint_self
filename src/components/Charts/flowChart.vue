<template>
    <!--<div class='bar-chart' :style="{height:height,width:width}">-->
    <!--<div :class="[className]" :id="id" style="height:490px;width:490px;"></div>-->
    <!--</div>-->
    <div>
        <div class='bar-chart' :style="{height:height,width:width}">
            <div :class="className" :id="id" style="height:300px;max-width:350px;width:250px;margin: 0 auto;"></div>
        </div>
        <div style="text-align: center;color: #7e7e7e;font-size: 16px">本次会话流量{{this.flow_current}}MB</div>
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

    export default {
        name: 'barPercent',
        components: {},
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart2'
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
                flow_all: 0,
                flow_current: 0,
                flow: null,
                mon_flow: null,//月最大流量限制
                max: 0,
                timeClear: null

            };
        },
        mounted() {
            this.initBar();
        },
        created() {
            this.flowList();
//            this.$nextTick(function () {
//                this.timeClear = setInterval(this.timeFun, 5000)//5秒刷新一次
//            })
        },
        beforeDestroy() {
            if (this.timeClear) {
                clearInterval(this.timeClear)
            }
        },
        watch: {//深度 watcher
            flow_all: "initBar",
        },
        methods: {
//            timeFun() {
//                this.flowList()
//            },
            flowList() {
                let flowStr = null;
                let flowNum = null;
                getFlow({}).then((resp) => {
                    console.log(resp, "flow---");
//                    if (resp.data.items == {} || resp.data.items==null) {
//                        this.flow_all = 0;
//                        this.flow_current = 0;
//                        this.max = 0;
//                        this.flow = 0+"MB";
//                    } else {
                    this.flow_all = Number((resp.data.items.flow_all / 1024 / 1024).toFixed(2));
                    this.flow_current = Number((resp.data.items.flow_current / 1024 / 1024).toFixed(2));
                    flowStr = resp.data.items.mon_flow;
                    console.log(flowStr,'flowStr',resp.data)
                    if (flowStr.substr(flowStr.length - 2) == 'MB') {
                        this.mon_flow = Number(flowStr.substr(0, flowStr.lastIndexOf("B") - 1))
                    }
                    if (flowStr.substr(flowStr.length - 2) == 'GB') {
                        this.mon_flow = Number(flowStr.substr(0, flowStr.lastIndexOf("B") - 1)) * 1024
                    }
                    console.log(this.flow_all, "this.flow_all");
                    if ('NaN' == this.flow_all) {
                        this.flow_all = 1
                    }
                    if ('NaN' == this.flow_current) {
                        this.flow_current = 0
                    }
                    console.log(this.flow_all, '---all');
                    console.log(this.flow_current, '---flow_current')
                    if (this.mon_flow > 1024 && this.mon_flow <= 2048) {
                        this.flow = (this.mon_flow / 1024) + 'GB';
                        this.max = 2;
                    }
                    if (500 < this.mon_flow && this.mon_flow <= 1024) {
                        this.flow = (this.flow_all).toFixed(2) + 'MB';
                        this.max = 1000;
                    }
                    if (100 < this.mon_flow && this.mon_flow <= 500) {
                        this.flow = (this.flow_all).toFixed(2) + 'MB';
                        this.max = 500;
                    }
                    if (this.mon_flow <= 100) {
                        this.flow = (this.flow_all).toFixed(2) + 'MB';
                        this.max = 100;
                    }
//                    }

                    this.flow_all = Number((this.flow_all).toFixed(2));
                    this.flow_current = Number(this.flow_current.toFixed(2));

                    console.log(this.max, '.................................max')

                }).catch((err) => {
                    console.log(err);
                });
            },
            initBar() {
//                this.flowList()
//                alert("echert-initBar")
                console.log(this.flow_current, "inintbar")
                if ('NaN' == this.flow_current) {
                    this.flow_current = 1;
                }
                this.chart = echarts.init(document.getElementById(this.id));
//                this.chart = echarts.init(document.querySelector(this.className));
                this.chart.setOption({
                    backgroundColor: '#F55F5',
                    title: {
                        show: true,
                        x: "center",
                        y: "55%",
                        text: '消耗流量',        //幸运值取代码置于值于此处
                        subtext: this.flow,
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
                        name: '消耗流量',
                        type: 'gauge',
                        // startAngle: 180,
                        // endAngle: 0,
                        splitNumber: 20,     //刻度数量
                        min: 0,
//                        max: this.max,
                        max: 200,
                        radius: '70%',      //图表尺寸
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
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
                            length: -5,
                            splitNumber: 5
                        },
                        splitLine: {
                            show: true,
                            length: -10,
                            lineStyle: {
                                color: '#228B22'
                            }
                        },
                        axisLabel: {
                            distance: -20,//外圈数字带圆圈的距离
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
//                            value: (this.max - (this.max - Number(this.flow_all))).toFixed(2),
                            value: 30
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
</style>

