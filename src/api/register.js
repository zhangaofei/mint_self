/**
 * Created by Administrator on 2017/11/2.
 */
import {fetch} from 'utils/fetch';
// var md5 = require('js-md5');


export function userReg(param) {
    console.log(param,'log')
    // let p = md5.hex(password).toUpperCase();
    return fetch({
        url: '/api/admin/register',
        method: 'post',
        // params: {'name': name, 'password': p}
        body:param
    });
}
export function getGrounpName() {
    return fetch({
            // api/admin/group/all
        url: '/api/admin/audit/all',
        method: 'get',
    });
}