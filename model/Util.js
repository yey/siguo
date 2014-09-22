var Util = exports;

var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var zlib = require('zlib');
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
            "Accept-Encoding": 'gzip,deflate',   
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

Util.test = function(startV){
    Util.getData(startV,'friend.php?do=GetFriends','',function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
    // Util.getData(startV,'fenergy.php?do=SendFEnergy',{Fid:57019},function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
        startV++;
        //console.log(res);
    });
}

Util.addFriends = function(startV){
    Util.getData(startV,'friend.php?do=GetAddFriends','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var imFriends = res.data.AddFriends;

        };
    });
}

Util.sendFEnergy = function(startV){
    Util.getData(startV,'friend.php?do=GetFriends','',function(res){
        startV++;
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var friends = res.data.Friends;
            for (var i = 0; i < friends.length; i++) {
                if(friends[i].FEnergySend > 0){
                    Util.getData(startV,'fenergy.php?do=SendFEnergy',{Fid:friends[i].Uid},function(sendRes){
                        console.log(sendRes);
                    });
                    startV++;
                }
            };
        };
    });
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
//潘神：150000
//瘟疫: 114000
//泰坦: 132000
//擎天: 114000
//海王: 150000
Util.fightBoss = function(startV){
    Util.getData(startV,'boss.php?do=Fight','',function(res){
        startV++;
        res = eval('(' + res + ')');
        console.log(res);
        if (res.status == 1) {
            var waitTime = 1000*res.data.CanFightTime + 300;
            setTimeout(Util.fightBoss, waitTime, startV);
        }else if(res.status == 0 && res.message != "Boss还未刷新或已逃走"){
            //意外情况，15s重试一次
            var waitTime = 1000*15 + 300;
            setTimeout(Util.fightBoss, waitTime, startV);            
        }else{
            console.log("打完啦");
        }
    });
}

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
// console.log(res.headers['content-encoding']);
        switch(res.headers['content-encoding']){
            case 'gzip':{
                var dataArr = [], len = 0, result;
                res.on('data',function(data){
                    dataArr.push(data);
                    len += data.length;
                });
                res.on('end',function(){
                    var buffer = Buffer.concat(dataArr,len);
                    result = zlib.unzip(buffer,function(err,buffer){
                        if (!err) {
                            // console.log(unicode.decode(buffer.toString()));
                            callback(unicode.decode(buffer.toString()));
                        };
                    });
                });
                break;
            }
            case 'deflate':{
                break;
            }
            default:{
                res.setEncoding('utf8');
                res.on('data', function(data){
                    var decodeData = unicode.decode(data);
                    callback(decodeData);
                });
                break;
            }
        }
    });
    req.write(data_getData);
    req.end();
}