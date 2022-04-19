function formatTime(e){
    var date = new Date(e)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month<10?"0"+month:month;
    var day = date.getDate()
    day=day<10?"0"+day:day;
    return year+"-"+month+"-"+day
}

function afterDays(e,days){
    var date = new Date(e);
    date.setDate(date.getDate() + days);
    var year = date.getFullYear();
    var month = date.getMonth+1;
    month=month<10?"0"+month:month;
    var day = date.getDate();
    day=day<10?"0"+day:day;
    return year+"-"+month+"-"+day;
}
//当前时间后的多少天
function addTime(day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month<10?"0"+month:month;
    var day = date.getDate();
    day = day<10?'0'+day:day;
    var hour = date.getHours();
    hour = hour<10?'0'+hour:hour;

    var minute = date.getMinutes();
    minute = minute<10?'0'+minute:minute
    var second = date.getSeconds()
    second = second<10?'0'+second:second

    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
    
}

module.exports = {
    formatTime,
    afterDays,
    addTime
}