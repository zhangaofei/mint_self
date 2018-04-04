/**
 * Created by Administrator on 2017/9/11.
 */
import {fetch} from 'utils/fetch';
/************bs***************************/
export function  getResourceList(param) {
    return fetch({
        // url: '/api/enwas/resource/search',
        url: '/api/enwas/resource/getWebList',
        method: 'post',
        body: param
    });
}

export function  getCollectList(param) {
    return fetch({
        url: '/api/enwas/collect/list',
        method: 'post',
        body: param
    });
}
export function  collectModify(param) {
    return fetch({
        url: '/api/enwas/client/collect/modifyFavorites',
        method: 'post',
        body: param
    });
}

export function  collectAdd(param) {
    return fetch({
        url: '/api/enwas/collect/add',
        method: 'post',
        body: param
    });
}
export function  getFlow(param) {//获取流量
    return fetch({
        url: '/api/enwas/flow/list',
        method: 'post',
        body: param
    });
}
/************cs***************************/
export function  getRdpList(param) {
    return fetch({
        url: '/api/enwas/go/apps/list',
        method: 'post',
        body: param
    });
}
export function  getCsList(param) {
    return fetch({
        url: '/api/enwas/go/enwasApps/appsList',
        method: 'post',
        body: param
    });
}
export function  getback(param) {
    console.log(param,'getback')
    return fetch({
        url: 'https://tx.enlink.cn:18990/api/enlink/doAppLive',
        // url: 'https://www.baidu.com',
        method: 'get',
        params: param
    });
}

//client 应用修改
export function  modCSparam(param) {
    return fetch({
        url: '/api/enwas/go/enwasApps/userAppsModify',
        method: 'post',
        body: param
    });
}

//fn
export function  setOnFnList() {
    return fetch({
        url: '/api/enwas/go/enwasApps/appsFnList',
        method: 'post',
        // body: param
    });
}
//rdp收藏
export function  allFavorites(param) {
    return fetch({
        url: '/api/enwas/go/enwasApps/listFavoritesAll',
        method: 'post',
        body: param
    });
}
// http://192.168.5.181/api/enwas/client/version/application
//下载地址
export function  getAddr(param) {
    return fetch({
        url: '/api/enwas/client/version/application',
        method: 'post',
        body: param
    });
}


