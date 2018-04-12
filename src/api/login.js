import {fetch} from 'utils/fetch';
var md5 = require('js-md5');
//常规登录
export function loginByEmail(userInfo) {
    console.log(userInfo.password,'md5',userInfo)
    let p = md5.hex(userInfo.password).toUpperCase();
    let info=null;
    // let verifyInfo=null;
    // userInfo.password=p;
    if(userInfo.sec_type){
        info={
            name: userInfo.name,
            password: p,
            sec_type: {
                sms_type: userInfo.sec_type.sms_type,
                dynamic_type: userInfo.sec_type.dynamic_type,
                device_type: userInfo.sec_type.device_type,
                dynamic_token_type: userInfo.sec_type.dynamic_token_type,
                mail_type: userInfo.sec_type.mail_type
            },
            all_sec_code: {
                sms_code: userInfo.all_sec_code.sms_code,
                dynamic_code: userInfo.all_sec_code.dynamic_code,
                device_code: userInfo.all_sec_code.device_code,
                dynamic_token_code:userInfo.all_sec_code.dynamic_token_code,
                mail_code: userInfo.all_sec_code.mail_code
            },
            t:userInfo.password
        }
    }else {
        info={
            name:userInfo.username,
            password:p,
            t:userInfo.password
        }
        console.log(info,'info====')
    }
    return fetch({
        url: '/api/enwas/pg/login',
        // body: {'name': name, 'password': p,t:password},
        body:info,
        method: 'post',
    });
}
//登出
export function logout() {
    return fetch({
        url: '/api/enwas/pg/logout',
        method: 'post',
        params: { "t":'t'}
    });
}

// *************修改密码********************
export function modifyPsw(param) {
    console.log(param,'--param-');
    let name=param.name;
    let oldPsw = md5.hex(param.old_password).toUpperCase();
    let newPsw = md5.hex(param.new_password).toUpperCase();
    let newPswLen=param.passwd_len;
    console.log(name,oldPsw,newPsw,'--param2-')
    return fetch({
        url: '/api/enwas/user/modify',
        method: 'post',
        // params: {name:name,old_password:oldPsw,new_password:newPsw,passwd_len:newPswLen},
        body:{name:name,old_password:oldPsw,new_password:newPsw,passwd_len:newPswLen},
    });
}
export function  getStrategy(param) {//获取流量
    return fetch({
        url: '/api/enwas/user/query',
        method: 'post',
        // params: param,
        body:param
    });
}
// ******忘记密码*******
// /mobil/sendMessage

export function  getMailUserName(param) {//mail获取用户名
    return fetch({
        url: '/api/enwas/mail/sendMailForName',
        method: 'post',
        // params: param,
        body:param
    });
}
export function  getTelUserName(param) {//tel获取用户名
    return fetch({
        url: '/api/enwas/mobile/sendMessage',
        method: 'post',
        // params: param,
        body:param
    });
}
//获取2次验图形码
// api/enwas/client/user/createCode
export function  getRandomNum(param) {//tel获取用户名
    return fetch({
        url: '/api/enwas/client/user/createCode',
        method: 'post',
        // params: param,
        body:param
    });
}
