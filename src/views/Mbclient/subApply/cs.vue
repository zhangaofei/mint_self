<template>
    <div>
        <ul class="ula">
            <li>
                <p class="p_left">Client应用</p>
                <p class="p_right" @click="lookCs" v-if="isShowCs==false?true:false" style="font-size: 20px;margin-right:10px"> > </p>
                <p class="p_right" @click="lookCs" v-if="isShowCs==true?true:false" style="font-size: 20px;margin-right:10px"> ∨ </p>
            </li>
            <li v-for="(item,index) in csList" v-if="isShowCs" :key="index">
                <img slot="icon" :src='item.icon_path' width="30" height="30">
                <span class="spa_top">{{item.app_name}}</span>
                <!--<span class="spa_bottom">33</span>-->
                <span class="spa_right" v-if="'1'==item.is_collect"> <img slot="icon" :src=red width="18" height="18" @click="collection(item)" ></span>
                <span class="spa_right" v-else> <img slot="icon" :src=grey width="18" height="18" @click="collection(item)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getResourceList, getCollectList, collectModify, getFlow,getCsList,getRdpList,getback,modCSparam,allFavorites} from 'api/web/web';
    import {mapGetters} from 'vuex';
    export default {
        components: {

        },
        computed: {
            ...mapGetters([
                'c_name',
                'uid',
                'login_timestamp',
                'login_msg',
                'msgs',
                'vpnStatus',
                'versionName',
                'isForceUpdate',
                'c_groupId',
                'token',
                'c_passwrod',//加密密码
                'clearPasswrod',//明文密码
                'setonVpnFlag',
                'lowVersion'
            ]),
        },
        data(){
            return{
                footImg:require('@/assets/imgs/git.png'),
                grey:require('@/assets/client_home/grey_heart.png'),
                red:require('@/assets/client_home/red_heart.png'),
                isShowCs:false
            }
        },
        created(){

        },
        props:['csList'],
        methods: {
            lookCs(){
                if(this.isShowCs==false){
                    this.isShowCs=true
                }else {
                    this.isShowCs=false
                }
            },
            collection(item){
                this.$emit('csCollection',item)
            }

        }
    }
</script>

<style scoped>

</style>