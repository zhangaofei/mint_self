/**
 * Created by ENLINK on 2017/7/13.
 */


/****************
 * 将时间戳转换为标准日期格式
 * *****************/
export function formatDateTime(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // var minute = date.getMinutes();
    // minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d;
};



/****
 * 计算一个月有多少天
 * ***/
export function totalDays(year,month){
    if(has([1,3,5,7,8,10,12],month)){
        return 31;
    }else if(month==2){
        if(isLeap(year)) {
            return 29;
        }else {
            return 28;
        }
    }else {
        return 30;
    }

}

/*************
 * 计算是否是闰年
 * ************/
export function isLeap(year){
    if((year%100!=0&&year%4==0)||(year%100==0&&year%400==0)) {
        return true;
    }else {
        return false;
    }
}


export function has(list,item){
    for(let i of list){
        if(i==item){
            return true;
        }
    }
    return false;
}

function formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
}
export function formatSeconds2(a) {
    var hh = parseInt(a / 3600);
    if (hh < 10) hh = "0" + hh;
    var mm = parseInt((a - hh * 3600) / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = parseInt((a - hh * 3600) % 60);
    if (ss < 10) ss = "0" + ss;
    var length = hh + ":" + mm + ":" + ss;
    if (a > 0) {
        return length;
    } else {
        return "00:00:00";
    }
}
export function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + formatTen(month) + "-" + formatTen(day);
}