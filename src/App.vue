<template>
    <div id="app" class="app" >
        <!--<div class="" style="height:100%;">-->
            <router-view></router-view>
        <!--</div>-->
    </div>
</template>

<script>
    export default{
        name: 'APP'
    }
</script>
<style>
    .app {
        height: 100%;
        min-width: 1350px;
        position: relative;
    }

    .wrapper {
    height: 100%;
    }
    @media (min-width: 601px) and (max-width: 1100px){
        .app {
            height: 100%;
            min-width: 100vw;
            position: relative;
        }
    }
    @media screen and (max-width: 600px){
        .app {
            height: 100%;
            min-width: 100vw;
            position: relative;
        }
    }
</style>