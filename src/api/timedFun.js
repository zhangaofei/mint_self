/**
 * Created by Administrator on 2017/11/7.
 */

function add0(m){return m<10?'0'+m:m }
export function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

export function formatTime(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
    let time2 = new Date(shijianchuo);
    let y2 = time2.getFullYear();
    let m2 = time2.getMonth()+1;
    let d2 = time2.getDate();
    return y2+'/'+add0(m2)+'/'+add0(d2)
}
export function formatGetTime(shijianchuo)
{
    // console.log(shijianchuo,'spaboot');
    let timestamp=Date.parse(new Date())/1000;//  Date.parse(new Date())当前时间戳毫秒为 000
    let t=parseInt(Math.abs(timestamp-shijianchuo)) ;
    let ts=null;
    if(0<=t/60 && t/60<1){
        ts='1分钟前';
        return ts;
    } else if(1<=(t/60) && (t/60)<60){
        ts=parseInt(t/60)+'分钟前';
        return ts;
    }else if(1<=(t/60/60) && (t/60/60)<24) {
        ts=parseInt(t/60/60)+'小时前';
        return ts;
    }else if(1<=(t/60/60/24) &&  (t/60/60/24)<30) {
        ts=parseInt(t/60/60/24)+'天前';
        return ts;
    }else {
        return;
    }

    // return ts;
}
// var timestamp=new Date().getTime();//当前时间戳
