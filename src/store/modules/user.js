
import {loginByEmail, logout, getInfo} from 'api/login';
import {loginType,modName} from 'api/myAcount/myAcount';
import Cookies from 'js-cookie';

const user = {
    state: {
        // msgs:Cookies.get('msgs'),
        hasNewMsg:false,
        currentUser: {},
        login_timestamp:Cookies.get('login_timestamp'),
        user: '',
        status: '',
        // email: Cookies.get('email'),
        c_name: Cookies.get('c_name'),
        mail: Cookies.get('mail'),
        code: '',
        auth_type: '',
        token: Cookies.get('web_vpn_user_token'),
        // c_name: Cookies.get('c_name'),
        full_name: Cookies.get('full_name'),
        modPsw: Cookies.get('modPsw'),
        tel: Cookies.get('tel'),
        uid:Cookies.get('uid'),
        avatar: '',
        roles: [],
        login_msg:Cookies.get('login_msg'),
        setting: {
            articlePlatform: []
        },
        billing:Number(Cookies.get('billing')),
        codeFlag:Cookies.get('codeFlag'),
        //1已安装小锁 0未安装
        vpnStatus:Cookies.get('vpnStatus'),
        versionName:Cookies.get('versionName'),
        isForceUpdate:Cookies.get('isForceUpdate'),
        c_groupId:Cookies.get('c_groupId'),
        c_passwrod:Cookies.get('c_passwrod'),
        clearPasswrod:Cookies.get('clearPasswrod'),
        setonVpnFlag:Cookies.get('setonVpnFlag'),
        lowVersion:Cookies.get('lowVersion'),
        //移动版 首次登陆跳向不同的引导页标志(默认为 1)
        firstLoginFlag:Cookies.get('firstLoginFlag'),
        unInstallVpnFlag:Cookies.get('unInstallVpnFlag'),
    },
    mutations: {
        SET_vpnStatus: (state, vpnStatus) => {
            state.vpnStatus = vpnStatus;
        },
        SET_modPsw: (state, modPsw) => {
            state.modPsw = modPsw;
        },
        SET_hasNewMsg: (state, hasNewMsg) => {
            state.hasNewMsg = hasNewMsg;
        },
        //2.
        LOGIN_MSG: (state, login_msg) => {
            state.login_msg = login_msg;
        },
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;//yong hu
        },
        SET_EMAIL: (state, c_name) => {
            state.c_name = c_name;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_FULLNAME: (state, full_name) => {
            state.full_name = full_name;
        },
        SET_TEL: (state, tel) => {
            state.tel = tel;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_MAIL: (state, mail) => {
            state.mail = mail;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: (state, currentUser) => {
            console.log('login success');
            state.currentUser = currentUser;
        },
        LOGOUT_USER: state => {
            state.user = '';
        },
        SET_TIMERSTAMP:(state, login_timestamp) =>{
            state.login_timestamp = login_timestamp;
        },
        SET_billing: (state, billing) => {
            state.billing = billing;
        },
        SET_codeFlag:(state, codeFlag) => {
            state.codeFlag = codeFlag;
        },
        SET_versionName:(state, versionName) => {
            state.versionName = versionName;
        },
        SET_isForceUpdate:(state, isForceUpdate) => {
            state.isForceUpdate = isForceUpdate;
        },
        SET_groupId:(state, c_groupId) => {
            state.c_groupId = c_groupId;
        },
        SET_passwrod:(state, c_passwrod) => {
            state.c_passwrod = c_passwrod;
        },
        // 明文密码clearPasswrod
        SET_clearPasswrod:(state, clearPasswrod) => {
            state.clearPasswrod = clearPasswrod;
        },
        //
        SET_setonVpnFlag:(state, setonVpnFlag) => {
            state.setonVpnFlag = setonVpnFlag;
        },
        SET_lowVersion:(state, lowVersion) => {
            state.lowVersion = lowVersion;
        },
        SET_firstLoginFlag:(state, firstLoginFlag) => {
            state.firstLoginFlag = firstLoginFlag;
        },
        SET_unInstallVpnFlag:(state, unInstallVpnFlag) => {
            state.unInstallVpnFlag = unInstallVpnFlag;
        },
    },

    actions: {
        checkVpn:({commit})=> {
            $.getJSON("https://tx.enlink.cn:18990/api/enlink/state?q=javascript&count=1&callback=?", function(res,status){
                if(status=='success'){
                    Cookies.set('vpnStatus', '1');
                    commit('SET_vpnStatus', '1');
                }else {
                    Cookies.set('vpnStatus', '0');
                    commit('SET_vpnStatus', '0');
                }
            })
        },
        // 登录
        login({commit}, userInfo) {
            console.log(userInfo,'userInfo=====================');
            return new Promise((resolve, reject) => {
                // loginByEmail(c_name, userInfo.password).then(response => {
                loginByEmail(userInfo).then(response => {
                    if (response.msg == "success"||response.code==2||response.code==3) {
                        console.log(userInfo,'userInfo========')
                        const data = response.data;
                        let versionName;
                        commit('LOGIN_SUCCESS', response.data);
                        Cookies.set('web_vpn_user_token', response.token);
                        commit('SET_TOKEN', response.token);
                        commit('SET_EMAIL', userInfo.name);
                        Cookies.set('c_name', userInfo.name);

                        commit('SET_MAIL', data[0].email);
                        Cookies.set('mail', data[0].email);
                        Cookies.set('tel', data[0].tel);
                        commit('SET_TEL', data[0].tel);
                        Cookies.set('full_name', data[0].full_name);
                        commit('SET_FULLNAME', data[0].full_name);
                        Cookies.set('modPsw', data[0].pwd_modify_time);
                        commit('SET_modPsw', data[0].pwd_modify_time);
                        commit('LOGIN_MSG',response.msg );
                        Cookies.set('login_msg', response.msg);
                        // Cookies.set('c_name', c_name);
                        // Cookies.set('SET_NAME', c_name);
                        commit('SET_UID', data[0].id);
                        Cookies.set('uid', data[0].id);
                        var tp = Date.parse(new Date())
                        console.log('LogOut+++++++++++++' + tp)
                        //计时器
                        commit('SET_TIMERSTAMP', tp);
                        Cookies.set('login_timestamp', tp);
                        //是否启动计费
                        Cookies.set('billing', data[0].is_billing);
                        commit('SET_billing', data[0].is_billing);
                        //是否是首次登录
                        Cookies.set('codeFlag',response.code);
                        commit('SET_codeFlag',response.code);
                        //vpnServer 版本info
                        // versionName=response.version.show_version.substring()
                        Cookies.set('versionName',response.version.version);
                        commit('SET_versionName',response.version.version);

                        Cookies.set('isForceUpdate',response.version.force_update);
                        commit('SET_isForceUpdate',response.version.force_update);

                        // c_groupId
                        Cookies.set('c_groupId',response.data[0].group_id);
                        commit('SET_groupId',response.data[0].group_id);

                        // 加密密码
                        Cookies.set('c_passwrod',response.data[0].password);
                        commit('SET_passwrod',response.data[0].password);
                        // 明文密码
                        Cookies.set('clearPasswrod',userInfo.password);
                        commit('SET_clearPasswrod',userInfo.password);
                        //
                        Cookies.set('unInstallVpnFlag',"0");
                        commit('SET_unInstallVpnFlag',"0");
                        //
                        if(response.version.force_update==0){
                            Cookies.set('lowVersion',"0");
                            commit('SET_lowVersion',"0");
                        }
                        //首次登陆标志
                        Cookies.set('firstLoginFlag',"1");
                        commit('SET_firstLoginFlag',"1");
                        /**/
                        Cookies.set('setonVpnFlag',"1");
                        commit('SET_setonVpnFlag',"1");

                    }
                    resolve(response);
                }).catch(error => {
                    console.log("登录失败:", error)
                    reject(error);
                });
            });
        },
        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.c_name).then(() => {
                    console.log('LogOut+++++++++++++----')
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('login_timestamp');//退出清除计时时间
                    Cookies.remove('web_vpn_user_token');//退出清除cookie
                    Cookies.remove('c_name');
                    Cookies.remove('vpnStatus');
                    // Cookies.remove('setonVpnFlag');
                    resolve();
                }).catch(error => {
                    console.log('LogOut+++++++++++++----====')
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('login_timestamp');
                    console.log(Cookies.get('login_timestamp'))
                    resolve();
                });
            });
        },
        // 修改个人信息
        modPerMsg:({commit},parms)=> {
            console.log(parms,'parms')
            if(parms&&parms.email){
                commit('SET_MAIL', parms.email);
                Cookies.set('mail', parms.email);
            }
            if(parms&&parms.tel){
                Cookies.set('tel', parms.tel);
                commit('SET_TEL', parms.tel);
            }
            if(parms&&parms.full_name){
                Cookies.set('full_name', parms.full_name);
                commit('SET_FULLNAME', parms.full_name);
            }
        },
        setTimestamp:({commit},parms)=> {
            console.log(Cookies.get('login_timestamp'),'Cookies.get');
            if(Cookies.get('login_timestamp')==undefined&&parms.login_timestamp!=null&&parms.login_timestamp!=undefined){
                commit('SET_TIMERSTAMP', Number(parms.login_timestamp));
                Cookies.set('login_timestamp', Number(parms.login_timestamp));
            }
        },
        firstLogin:({commit},parms)=> {
            if(parms&&parms.firstLoginFlag){
                Cookies.set('firstLoginFlag', parms.firstLoginFlag);
                commit('SET_firstLoginFlag', parms.firstLoginFlag);
            }
        },
        setonVpn:({commit},parms)=> {
            if(parms&&parms.setonVpnFlag){
                Cookies.set('setonVpnFlag', parms.setonVpnFlag);
                commit('SET_setonVpnFlag', parms.setonVpnFlag);
            }
        },
        //unInstallVpn
        unInstallVpn:({commit},parms)=> {
            if(parms&&parms.unInstallVpnFlag){
                Cookies.set('unInstallVpnFlag', parms.unInstallVpnFlag);
                commit('SET_unInstallVpnFlag', parms.unInstallVpnFlag);
            }
        },
        checkLowVersion:({commit},parms)=> {
            if(parms&&parms.lowVersion){
                // Cookies.set('setonVpnFlag', parms.setonVpnFlag);
                // commit('SET_setonVpnFlag', parms.setonVpnFlag);

                Cookies.set('lowVersion',parms.lowVersion);
                commit('SET_lowVersion',parms.lowVersion);
            }
        },
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('web_vpn_user_token');
                Cookies.remove('login_timestamp');
                console.log(Cookies.get('login_timestamp'))
                resolve();
            });
        }
    }
};

export default user;
