<template>
    <div class="page-search">
        <button class="canle" @click="canle">返回</button>
        <mt-search
                autofocus
                cancel-text
                v-model="value"
                :result="filterResult">
        </mt-search>
    </div>
</template>

<script>
    export default {
        name: "search-page",
        computed:{
            filterResult() {
                return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
            }
        },
        data(){
            return{
                value: '',
                // 默认数据
                defaultResult: [
                    'Apple',
                    'Banana',
                    'Orange',
                    'Durian',
                    'Lemon',
                    'Peach',
                    'Cherry',
                    'Berry',
                    'Core',
                    'Fig',
                    'Haw',
                    'Melon',
                    'Plum',
                    'Pear',
                    'Peanut',
                    'Other'
                ]
            }
        },
        methods:{
            canle(){
                this.$router.push({path:'./apply'})
            }
        },

    }

</script>


<!--<script>-->
    <!--document.getElementsByClassName('mint-searchbar-cancel').addEventListener(function () {-->
        <!--console.log(this,'this')-->
    <!--})-->
<!--</script>-->
<style >
    .mint-searchbar{
        padding-right: 0px;
    }
    .canle{
        position: absolute;
        top: 12px;
        right: 5px;
        z-index: 10;
        border: none;
        background: transparent;
        outline: none;
    }
</style>