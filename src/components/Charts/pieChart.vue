<template>
    <div class='pie' :style="{height:height,width:width}">
        <div :class="[className]" :id="id" style="height: 490px;width: 560px;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
        name: 'pieChart',
        props: {
            title:{//表格标题
                type:String,
                default:'终端系统占比'
            },
            tipName:{
                type:String,
                default:'占比'
            },

            legend:{//表格数据
                type:Array,
            },

            data:{//表格数据
                type:Array,
            },
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'pie-chart'
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
        },
        watch: {//深度 watcher
            'data':'initChart'
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    title : {
                        text:this.title,
                        x:'center',
                        textStyle:{

                        },
                        padding:[30,5,5,5]
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: '4%',
                        top:'35%',
                        data: this.legend
                    },
                    series : [
                        {
                            name: this.tipName,
                            type: 'pie',
                            radius : '55%',
                            center: ['46%', '50%'],
                            data:this.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 2)'
                                }
                            }
                        }
                    ]
                })
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

</style>
