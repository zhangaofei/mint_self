// /**
//  * Created by Administrator on 2017/11/14.
//  */
// import {loginType, getAllMsg} from 'api/myAcount/myAcount';
// import Cookies from 'js-cookie';
// const loginTime = {
//     state: {
//         msgs:Cookies.get('msgs')
//     },
//     mutations: {
//         LOGIN_TIME: (state,msgs) => {
//             state.msgs=msgs
//         },
//     },
//     actions: {
//         loginType: ({commit}) => {
//             return new Promise((resolve, reject) => {
//                 loginType().then(response => {
//                     const data=JSON.parse(JSON.parse(response.data.msg)).reverse();//数组反转
//                     commit('LOGIN_TIME', data);
//                     Cookies.set('msgs', data);
//                     resolve(response);
//                 }).catch(error => {
//                     reject(error);
//                 });
//             });
//         }
//     }
// };
//
// export default loginTime;