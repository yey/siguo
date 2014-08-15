var http = require('http');
var v = "9189";
var waitTime = "95000";//ms
var querystring = require('querystring');
var data= querystring.stringify({Cookie:'_sid=12s25i4pkupnmmf4hc9u3sk3l4'});
var opts = {
	host: 's1.android.siguozhanji.muhenet.com',
	port: 80,
	path: '/boss.php?do=Fight&v='+v+'&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
	method: 'POST',
	timeout: 4000,
    headers: {   
            'Content-Type':"application/x-www-form-urlencoded",
            "Content-Length": data.length  
        }
};

function getTrade(opts){
	var str = "";
	var req = http.request(opts, function(res){
		res.setEncoding('utf8');
		res.on('end', function(data){
            v++;
			setTimeout(getTrade, waitTime, opts);
		});
	});
    req.write(data);
	req.end();
}

function buyGouLiang(startV,limit){
    var data_buyGold = querystring.stringify({GoodsId:1});
    var opts_buyGold = {
    host: 's1.android.siguozhanji.muhenet.com',
    port: 80,
    path: '/shop.php?do=Buy&v='+startV+'&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=12s25i4pkupnmmf4hc9u3sk3l4',
            "Connection": 'Keep-Alive',   
            "Content-Type":"application/x-www-form-urlencoded",
            "Content-Length": data_buyGold.length  
        }
    };
console.log(opts_buyGold);
    var req = http.request(opts_buyGold, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            console.log(data);
            startV++;
            if(startV<limit){
console.log(startV);
                setTimeout(buyGouLiang, 1000, startV, limit);
            }
        });
    });
    req.write(data_buyGold);
    req.end();
}

function init(){
    //getTrade(opts);
    var s = 2807;
    console.log(s);
    buyGouLiang(s, s+20);
}

init();

//狗粮购买成功，注意cookie的设置和data的传输。