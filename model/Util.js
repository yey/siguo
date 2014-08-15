var Util = exports;

var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var configPath = "../config/siguo.cfg";

var opts = {
    host: 's1.android.siguozhanji.muhenet.com',
    port: 80,
    path: '&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=12s25i4pkupnmmf4hc9u3sk3l4',
            "Connection": 'Keep-Alive',   
            "Content-Type":"application/x-www-form-urlencoded" 
        }
    };
//buy times = limit - startV
Util.buyGouLiang = function(startV,limit){
    var data_buyGold = querystring.stringify({GoodsId:1});
    var opts_buyGold = opts;
    opts_buyGold.path = '/shop.php?do=Buy&v='+startV+opts_buyGold.path;
    opts_buyGold.headers["Content-Length"] = data_buyGold.length;

    var req = http.request(opts_buyGold, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            console.log(data);
            startV++;
            if(startV<limit){
                setTimeout(Util.buyGouLiang, 1000, startV, limit);
            }
        });
    });
    req.write(data_buyGold);
    req.end();
}

//fight boss
Util.fightBoss = function(startV){
    var data_fightBoss = querystring.stringify({GoodsId:1});
    var opts_fightBoss = {
    host: 's1.android.siguozhanji.muhenet.com',
    port: 80,
    path: '/boss.php?do=Fight&v='+v+'&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=12s25i4pkupnmmf4hc9u3sk3l4',
            "Connection": 'Keep-Alive',   
            "Content-Type":"application/x-www-form-urlencoded",
            "Content-Length": data_fightBoss.length  
        }
    };
    var waitTime = "95000";//ms
}
//狗粮购买成功，注意cookie的设置和data的传输。setTimeout的参数传递规则

Util.setConfig = function(key, value){
    var data = fs.readFileSync(configPath, 'utf-8');
    var decodeData = JSON.parse(data);
    decodeData[key] = value;
    fs.writeFileSync(configPath, JSON.stringify(decodeData), ['utf8','w']);
}
Util.getConfig = function(key){
    var data = fs.readFileSync(configPath, 'utf-8');
    var decodeData = JSON.parse(data);
    return decodeData[key];
}