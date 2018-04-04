<template>
    <div>
        <div :class="className" :id="id" :style="{height:height,width:width}"></div>
        <div style="text-align: center;color: #7e7e7e;font-size: 16px;margin-top:-55px;">
            <span v-if="flow_all>1000">本月会话流量{{(flow_all/1000).toFixed(2)}}GB</span>
            <span v-else>本月会话流量{{flow_all.toFixed(2)}}MB</span>
            <!--<br>-->
            <!--<span v-if="flow_current =='NaN'">本次会话流量0MB</span>-->
            <!--<span v-else-if="flow_current ==Number('NaN')">本次会话流量0MB</span>-->
            <!--<span v-else>本次会话流量{{flow_current.toFixed(2)}}MB</span>-->
        </div>
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
    import {logout} from 'api/myAcount/myAcount'

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
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '350px'
            }
        },
        data() {
            return {
                flow_all: 0,
                flow_current: 0,
                flow: null,
                mon_flow: null,//月最大流量限制
                max: 100,
                timeClear: null,
                val:null

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
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(() => {

                })
            },
//            timeFun() {
//                this.flowList()
//            },
            flowList() {
                let flowStr = null;
                getFlow({}).then((resp) => {
                    console.log(resp, "flow---");
                    if(resp.status==-1){
                        this.logout()
                    }
                    if (JSON.stringify(resp.data.items) == "{}" || resp.data.items==null) {
                        this.flow_all = 10;
                        this.flow_current = 0;
                        this.max = 100;
                        this.flow = 0+"MB";
                        this.val=Number((Number(this.max)- Number(this.max)+Number(this.flow_all)).toFixed(2))
                    } else {
                        this.flow_all = Number((resp.data.items.flow_all / 1024 / 1024).toFixed(2));
                        this.flow_current = Number((resp.data.items.flow_current / 1024 / 1024).toFixed(2));
                        flowStr = resp.data.items.mon_flow;
                        if (flowStr.substr(flowStr.length - 2) == 'MB') {
                            this.mon_flow = Number(flowStr.substr(0, flowStr.lastIndexOf("B") - 1))
                        }
                        if (flowStr.substr(flowStr.length - 2) == 'GB') {
                            this.mon_flow = Number(flowStr.substr(0, flowStr.lastIndexOf("B") - 1)) * 1024
                        }
//                        console.log(this.mon_flow,'flowStr===')
//                        console.log(this.flow_all, "this.flow_all");
                        if ('NaN' == this.flow_all) {
                            this.flow_all = 1
                        }
                        if ('NaN' == this.flow_current) {
                            this.flow_current = 0
                        }
                        if (this.mon_flow > (2048*100) && this.mon_flow <= 2048*500) {
                            this.flow = (this.flow_all / 1000) + 'GB';
//                            this.flow_all=this.flow_all/1000;
                            this.max = 500;
                        }
                        if (this.flow_all > 1024 && this.flow_all <= (2048*100)) {
                            console.log(this.flow_all,'gb0')
                            this.flow = Number(this.flow_all / 1000).toFixed(2) + 'GB';
//                            this.flow_all=this.flow_all/1000;
                            this.max = 100;
                        }
                        if (500 < this.flow_all && this.flow_all <= 1024) {
                            this.flow = (this.flow_all).toFixed(2) + 'MB';
                            this.max = 1000;
                        }
                        if (100 < this.flow_all && this.flow_all<= 500) {
                            this.flow = (this.flow_all).toFixed(2) + 'MB';
                            this.max = 500;
                        }
                        if (this.flow_all <= 100) {
                            this.flow = (this.flow_all).toFixed(2) + 'MB';
                            this.max = 100;
                        }
                    }
                    console.log(this.flow_current,'max')
                    this.flow_all = Number((this.flow_all).toFixed(2))||0;
                    this.flow_current = Number(this.flow_current.toFixed(2))||0;

                    if(this.flow_all>1000){
                        this.val=Number((Number(this.max)- Number(this.max)+Number(this.flow_all)/1000).toFixed(2));
                    }else {
                        this.val=Number((Number(this.max)- Number(this.max)+Number(this.flow_all)).toFixed(2));
                    }
                    console.log(this.val)
                    console.log(this.max, '..max',this.flow_all,this.flow_current,'fen',(Number(this.max)- Number(this.max)+Number(this.flow_all)))

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
                if (Number(NaN) == this.flow_current) {
                    this.flow_current = 1;
                }
                console.log(this.flow_current, "inintbar2")
                this.chart = echarts.init(document.getElementById(this.id));
                if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
                    this.myChart.dispose();
                    alert('111')
                }

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
                        backgroundColor: '#228B22',
                        borderColor: '#228B22',
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
                        splitNumber: 10,     //刻度数量
                        min: 0,
                        max: this.max,
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
//                            value: Number((Number(this.max)- (Number(this.max) - Number(this.flow_all))).toFixed(1))||0
//                            value: Number((Number(this.max)- Number(this.max) - Number(this.flow_all)).toFixed(1))||0
                            value: this.val||0
//
                        }]
                    }]
                })
                // ************************

                // this.chart.setOption({
                //     // backgroundColor: '#F55F5',
                //     tooltip : {
                //         formatter: "{a} <br/>{b} : {c}%"
                //     },
                //     toolbox: {
                //         show : true,
                //         feature : {
                //             mark : {show: true},
                //             restore : {show: true},
                //             saveAsImage : {show: true}
                //         }
                //     },
                //     series : [
                //         {
                //             name:'业务指标',
                //             type:'gauge',
                //             splitNumber: 10,       // 分割段数，默认为5
                //             axisLine: {            // 坐标轴线
                //                 lineStyle: {       // 属性lineStyle控制线条样式
                //                     color: [[0.2, '#228b22'],[0.8, '#228b22'],[1, '#228b22']],
                //                     width: 8
                //                 }
                //             },
                //             axisTick: {            // 坐标轴小标记
                //                 splitNumber: 10,   // 每份split细分多少段
                //                 length :12,        // 属性length控制线长
                //                 lineStyle: {       // 属性lineStyle控制线条样式
                //                     color: 'auto'
                //                 }
                //             },
                //             axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                //                 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                //                     color: 'auto'
                //                 }
                //             },
                //             splitLine: {           // 分隔线
                //                 show: true,        // 默认显示，属性show控制显示与否
                //                 length :30,         // 属性length控制线长
                //                 lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                //                     color: 'auto'
                //                 }
                //             },
                //             pointer : {
                //                 width : 5
                //             },
                //             title : {
                //                 show : true,
                //                 offsetCenter: [0, '-40%'],       // x, y，单位px
                //                 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                //                     fontWeight: 'bolder'
                //                 }
                //             },
                //             detail : {
                //                 formatter:'{value}%',
                //                 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                //                     color: 'auto',
                //                     fontWeight: 'bolder'
                //                 }
                //             },
                //             data:[{value: 50, name: '完成率'}]
                //         }
                //     ]
                // })
                // ***************
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

