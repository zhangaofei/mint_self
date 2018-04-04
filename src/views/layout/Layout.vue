<template>
    <div>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <app-main class="content-wrapper" id="content-wrapper" style=""></app-main>
            <!--<footer class="main-footer">-->
                <!--<div class="pull-right hidden-xs">-->
                    <!--<b>Version</b> 1.1-->
                <!--</div>-->
                <!--<strong>Copyright &copy; 2005-2016 <a href="http://www.enlink.com.cn" target="_blank">南京易安联网络技术有限公司</a></strong> 苏ICP备 14042977号-->
            <!--</footer>-->
    </div>
    <!--<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">-->
        <!--<div class="sidebar-wrapper">-->
            <!--<Sidebar class="sidebar-container"/>-->
        <!--</div>-->
        <!--<div class="main-container">-->
            <!--<Navbar/>-->
            <!--<App-main/>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import  Sidebar  from 'views/layout/Sidebar';
    import { Navbar, AppMain } from 'views/layout';
    import store from 'store';
    import router from 'router';
    import permission from 'store/permission';
    // import { Loading } from 'element-ui';
    // let loadingInstance;
    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
//            sidebar() {
//                return this.$store.state.app.sidebar;
//            }
        }
    }
</script>
<style rel="stylesheet" lang="" >
.content-wrapper{
    min-width:1122px;
    min-height:882px;
    background-color: #fff
}
@media (min-width: 601px) and (max-width: 1100px){
    .content-wrapper{
        min-width:100vw !important;
        background-color: #fff
    }
}
@media screen and (max-width: 600px)  {
    .content-wrapper{
        min-width:100vw !important;
        background-color: #fff
    }
}
</style>
