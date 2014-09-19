var Util = exports;

var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var configPath = "../config/siguo.cfg";
var unicode = require('./Unicode');

var opts = {
    host: 's0.siguozhanji.muhenet.com',
    port: 80,
    path: '&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=05krgeu6p6t7cjl7aheq6emtr4',
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

Util.fightJJC = function(startV){
    //切磋:Util.getData(startV,'arena.php?do=GetCompetitors');
    //jjc:
    Util.getData(startV,'arena.php?do=GetRankCompetitors','',function(res){
        startV++;
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var competitorRank = res.data.Competitors[0].Rank;
            //这里能不能直接和第一名打呢～喔吼吼
            Util.getData(startV,'arena.php?do=RankFight',{CompetitorRank:competitorRank},function(fightRes){
                startV++;
                console.log(fightRes);
                try{
                    fightRes = JSON.parse(fightRes);
                    if (fightRes.status == 0 && fightRes.type == 8) {
                        console.log(fightRes.message);
                    }else{
                        setTimeout(Util.fightJJC, 601000, startV);
                    }
                }catch(err){
                    console.log("打了，而且你肯定输");
                }
                //fightRes = eval('(' + fightRes + ')');  
                //console.log(fightRes);             
                
            });
        };
    });
}

//fight boss
Util.fightBoss = function(startV,waitTime){
    var opts_fightBoss = {
    host: 's0.siguozhanji.muhenet.com',
    port: 80,
    path: '/boss.php?do=Fight&v='+startV+'&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=05krgeu6p6t7cjl7aheq6emtr4',
            "Connection": 'Keep-Alive',   
            "Content-Type":"application/x-www-form-urlencoded",
            "Content-Length": 0
        }
    };
    var req = http.request(opts_fightBoss, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            var decodeData = unicode.decode(data);
            console.log(decodeData);
            decodeData = eval('(' + decodeData + ')');
            if (decodeData.status == 1) {
                startV++;
                setTimeout(Util.fightBoss, waitTime, startV, waitTime);
            };
        });
    });
    req.end();
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
Util.getData = function(startV, path, data, callback){
    var data_getData = querystring.stringify(data);
    var opts_getData = opts;
    opts_getData.path = '/'+path+'&v='+startV+opts_getData.path;
    opts_getData.headers["Content-Length"] = data_getData.length;
    var req = http.request(opts_getData, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            var decodeData = unicode.decode(data);
            callback(decodeData);
            // decodeData = eval('(' + decodeData + ')');
            // if (decodeData.status == 1) {
            //     startV++;
            //     setTimeout(Util.fightBoss, waitTime, startV, waitTime);
            // };
        });
    });
    req.write(data_getData);
    req.end();
}