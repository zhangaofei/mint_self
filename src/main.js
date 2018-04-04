import 'bootstrap/dist/css/bootstrap.min.css'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css/normalize.css';
import 'styles/index.scss';
import 'styles/element-customized.scss';
import * as filters from './filters';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {hasPermission} from './utils/permissionUtil';
import './styles/common.scss';
import './styles/client-common.scss';
// mint=======================================================
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// register globally
Vue.prototype.$http = axios;
Vue.use(ElementUI);
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const whiteList = ['/redirectAndroid','/login', '/authredirect', '/reset', '/sendpwd', '/downLoad','/redirectIos','/redirectIpad'];
router.beforeEach((to, from, next) => {
    // console.log('to:',to,'from:',from,'next:',next)
    // NProgress.start();
    if (store.getters.token) {
        if ('/login' === to.path || '/' === to.path || '/admin' === to.path || ('/404' == to.path && '/' == to.redirectedFrom)) {
            next({path: '/admin/web'});
        }
        else {
            next();
        }
    } else {
        if (whiteList && whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
        }
    }
});

router.afterEach(() => {
    // NProgress.done();
});

new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }
}).$mount('#app');


