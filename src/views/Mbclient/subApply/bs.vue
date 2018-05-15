<template>
    <div>
        <ul class="ula">
            <li>
                <p class="p_left">BS应用</p>
                <p class="p_right" @click="lookBs" v-if="isShowBs==false?true:false" style="font-size: 20px;margin-right:10px"> > </p>
                <p class="p_right" @click="lookBs" v-if="isShowBs==true?true:false" style="font-size: 20px;margin-right:10px"> ∨ </p>
            </li>
            <li v-for="(item,index) in bsList" v-if="isShowBs" :key="index">
                <a :href="getUrl(item)" target="_blank">
                    <img slot="icon" :src='item.iconPath' width="30" height="30">
                </a>
                <span class="spa_top">{{item.name}}</span>
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
        props:['bsList'],
        data(){
            return{
                footImg:require('@/assets/imgs/git.png'),
                grey:require('@/assets/client_home/grey_heart.png'),
                red:require('@/assets/client_home/red_heart.png'),
                list:[],
                collectList:[],
                isShowBs:true,
                protocol: {
                    HTTP: '',
                    HTTPS: ''
                },
            }
        },
        mounted(){

            // console.log(this.bsList,'http===')
           setTimeout(function () {
               this.setProtocol(this.bsList.http, this.bsList.https);
                   console.log(this.bsList,'http==')
           },500)
        },
        methods: {
            lookBs(){
                console.log(this.bsList,'http22')
                if(this.isShowBs==false){
                    this.isShowBs=true
                }else {
                    this.isShowBs=false
                }
            },
            setProtocol(http,https){
                this.protocol['HTTP'] = http;
                this.protocol['HTTPS'] = https;
            },
            getUrl(item) {
                let url = this.protocol[item.protocol] + item.url;
                console.log(item,url,'url_bs')
                return url
            },
            collection(item){
                this.$emit('bsCollection',item)
            }

        }
    }
</script>

<style scoped>

</style>