<template>
    <div class='bar-chart' :style="{height:height,width:width}">
        <div :class="[className]" :id="id" style="height:490px;width: 561px;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
        name: 'barChart',
        props: {
            title:{//表格标题
                type:String,
                default:'近30天系统日志累计折线图'
            },
            tipName:{
                type:String,
                default:'该点得值是'
            },

            unit:{//y轴的单位
                type:String,
                default:'(条)'
            },

            data:{  //柱状图对应的数据
                type:Array
            },
            keyName:{ // 每一个柱状对应的名称
                type:Array
            },
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'bar-chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '500px'
            }
        },

        data() {
            return {

            };
        },
        mounted() {
            this.initChart();
            console.log(this.data,"cli")
        },

        watch: {//深度 watcher
            'data':'initChart'
        },

        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis : [
                        {
                            type : 'category',
                            data : this.keyName,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    xAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '35px',
                            data:this.data,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = [
                                            '#bc3c4e','#bc3c69','#ba3cbc','#843cbc','#3c5abc',
                                            '#3ca5bc','#3cbc5d','#a5bc3c','#bc663c','#bc3c3c',
                                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                    barGap:'10px',
//                                    label: {
//                                        show: true,
//                                        position: 'top',
//                                        formatter: '{b}\n{c}'
//                                    }
                                }
                            },
                        }

                    ]
                });
            }
        }
    }
</script>

<style>

    .enlink-chart{
        border: solid 1px  #6CA9CD;
    }
    .enlink-chart canvas{
        left: -60px!important;
    }

    .pie{

    }

    .chart{
        float:left;
        margin-left: 45px;
    }

</style>
