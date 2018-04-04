/**
 * Created by Administrator on 2017/11/6.
 */
import {fetch} from 'utils/fetch';
var md5 = require('js-md5');

export function  loginType() {//
    return fetch({
        url: '/api/enwas/userLoginType/list',
        method: 'post',
        // params: param
    });
}
export function  loginTypeList() {//
    return fetch({
        url: '/api/enwas/userLoginType/list',
        method: 'post',
        // params: param
    });
}

// emailModPsw
export function  getCodeMsg(param) {//
    return fetch({
        url: '/api/enwas/mail/sendMail',
        method: 'post',
        // params: {email:param},
        body:{email:param}
    });
}
// telModPsw
export function  getTelCodeMsg(param) {//
    return fetch({
        url: '/api/enwas/mobile/sendMessage',
        method: 'post',
        body:{name:param}
    });
}
export function  telModPsw(param) {//
    let name=param.name;
    let newPsw = md5.hex(param.new_password).toUpperCase();
    let newPswLen=param.passwd_len;
    let code=param.auth_code;
    console.log(param,'===feace')
    return fetch({
        url: '/api/enwas/user/mobileModifyPasswd',
        method: 'post',
        body:{name:name,auth_code:code,new_password:newPsw,passwd_len:newPswLen},
    });
}
// **********************************
export function  emailModPsw(param) {//
    let name=param.name;
    let newPsw = md5.hex(param.new_password).toUpperCase();
    let newPswLen=param.passwd_len;
    let code=param.auth_code;
    console.log(param,'===feace')
    return fetch({
        url: '/api/enwas/user/mailModifyPasswd',
        method: 'post',
        // params: {name:name,auth_code:code,new_password:newPsw,passwd_len:newPswLen},
        body:{name:name,auth_code:code,new_password:newPsw,passwd_len:newPswLen},
    });
}
// /api/enwas/user/modifyUserNmae'
export function modName(param) {
    return fetch({
        url: '/api/enwas/user/modifyUserName',
        method: 'post',
        // params: param,
        body:param
    });
}
export function  modEmail(param) {
    return fetch({
        url: '/api/enwas/user/modifyUserName',
        method: 'post',
        // params: param
        body:param
    });
}

// '/api/enwas/userLoginTypeangeMsgStatus',
export function  getAllMsg(param) {
    return fetch({
        url: '/api/enwas/userLoginType/changeMsgStatus',
        method: 'post',
        body: param
    });
}
// api/admin/billing/getUserAllPackage       套餐信息
// export function  getUserAllPackage(param) {
//     return fetch({
//         url: '/api/admin/billing/getUserAllPackage',
//         method: 'post',
//         params: param
//     });
// }
export function  getPackageInfo(param) {
    return fetch({
        url: '/api/enwas/admin/charging/package/user/packageInfo',
        method: 'post',
        body: param
    });
}
export function  getPackageDetail(param) {
    return fetch({
        url: '/api/enwas/admin/charging/package/user/packageDetail',
        method: 'post',
        body: param
    });
}
// 获取开通套餐的人
export function  openPackageList(param) {
    return fetch({
        url: '/api/enwas/admin/charging/package/user/available',
        method: 'post',
        body: param
    });
}
// 用户开通套餐
export function  openPackage(param) {
    return fetch({
        url: '/api/enwas/admin/charging/charging/package/userPackage/open',
        method: 'post',
        body: param
    });
}

// 获取忘记密码的  手机号和者邮箱
export function  getTelOrMail(param) {
    return fetch({
        url: '/api/enwas/user/query/getPhoneOrMail ',
        method: 'post',
        body: param
    });
}






