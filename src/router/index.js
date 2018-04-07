import Vue from 'vue';
import Router from 'vue-router';

import redirectAndroid from '../views/login/jumpPage/redirectAndroid';
import Login from '../views/login/index';
import redirectIos from '../views/login/jumpPage/redirectIos';
import redirectIpad from '../views/login/jumpPage/redirectIpad';

import redirectAndroidT from '../views/login/jumpPage/redirectAndroidT';
import redirectIosT from '../views/login/jumpPage/redirectIosT';
import redirectIpadT from '../views/login/jumpPage/redirectIpadT';
// import register from '../views/login/register';
import Layout from '../views/layout/Layout';

import downLoad from '../views/login/downLoad';
//=====
import forgetPsw from '../views/login/loginComponents/forgetPsw';

const Err404 = resolve => require(['../views/error/404.vue'], resolve);
const Err401 = resolve => require(['../views/error/401.vue'], resolve);
// const register = resolve => require(['../views/login/register.vue'], resolve);
const enlinkWeb = resolve => require(['../views/client/home/first/web.vue'], resolve);
const myAccount = resolve => require(['../views/client/home/first/myAccount.vue'], resolve);
Vue.use(Router);

// export default new Router({
//     // mode: 'history', //后端支持可开
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRouterMap
// });
export default new Router({

    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/redirectIos', component: redirectIos, hidden: true},
        {path: '/redirectAndroid', component: redirectAndroid, hidden: true},
        {path: '/redirectIpad', component: redirectIpad, hidden: true},
        {path: '/redirectIosT', component: redirectIosT, hidden: true},
        {path: '/redirectAndroidT', component: redirectAndroidT, hidden: true},
        {path: '/redirectIpadT', component: redirectIpadT, hidden: true},
        {path: '/login', component: Login, hidden: true},
        {path: '/forgetPsw', component: forgetPsw, hidden: true},
        // {id: 4,path: '/register', component: register,name: 'register', meta: 4},
        {id: 5, path: '/downLoad', component: downLoad, name: 'downLoad', meta: 5},
        {path: '/404', component: Err404, hidden: true, meta: -1},
        {path: '/401', component: Err401, hidden: true, meta: -1},
        {id: 1, path: '___', component: Err401, title: true, name: '主页', backColor: 'header'},

        {
            id: 4,
            path: '/admin',
            component: Layout,
            name: '首页',
            icon: 'fa fa-home',
            children: [
                {id: 5, path: 'web', component: enlinkWeb, name: 'web', meta: 5},
                {id: 6, path: 'myAccount', component: myAccount, name: 'myAccount', meta:6},

            ]
        },

        {path: '*', redirect: '/404', hidden: true, meta: -1},
    ]
});
