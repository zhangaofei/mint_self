import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import router from '../router';
var qs = require('qs')


// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export function fetch(options) {
    let header = {};
    let body = {};
    if (options.method == 'post' || options.method == 'put' || options.method == 'delete' || options.method == 'DELETE' || options.method == 'PUT' || options.method == 'POST') {
        header = {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        body = options.body;
    }
    return new Promise((resolve, reject) => {
        axios({
            //baseURL: process.env.BASE_API,
            timeout: 200000,
            // credentials: 'include',
            method: options.method,
            url: options.url,
            // data: qs.stringify(options.params),
            data:body,
            params: options.params,
            headers: header
        }).then(response => {
            const res = response.data;
            if (res.status !== 1) {
                // Message({
                //     message: res,
                //     type: 'error',
                //     duration: 1 * 1000
                // });
                // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
                if (res.hasOwnProperty('code') && (res.code === 50008 || res.code === 50014 || res.code === 50012 || res.code === 'MSG_00002')) {
                    // 登出
                    store.dispatch('FedLogOut').then(() => {
                        router.push({path: '/login'})
                    });
                } else {
                    resolve(res);
                }
                resolve(res);
            }
            else {

                resolve(res);
            }
        }).catch(error => {
            console.log("fetch err:", error)
            // Message({
            //     message: error,
            //     type: 'error',
            //     duration: 2 * 1000
            // });
            reject(error);
        });
    })
}
