var Util = exports;

var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var zlib = require('zlib');
var configPath = "../config/siguo.cfg";
var unicode = require('./Unicode');
//05krgeu6p6t7cjl7aheq6emtr4
var opts = {
    host: 's0.siguozhanji.muhenet.com',
    port: 80,
    path: '&phpp=ANDROID_XIAOMI&phpl=ZH_CN&pvc=1.4.1&pvb=2014-05-05 12:48:19',
    method: 'POST',
    headers: {
            "Cookie":'_sid=p3au6focd6rbnf4utfmde6fvi2; expires=Fri, 03-Oct-2014 16:59:58 GMT; path=/',
            "Connection": 'Keep-Alive',
            "Accept-Encoding": 'gzip,deflate',   
            "Content-Type":"application/x-www-form-urlencoded" 
        }
    };

Util.buyGouLiang = function(startV, limit){
    Util.getData(startV,'shop.php?do=Buy',{GoodsId:1},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1 && startV < limit) {
            setTimeout(Util.buyGouLiang, 1000, startV, limit);
        }   
    });
}

Util.test = function(startV){
    Util.getData(startV,'friend.php?do=GetFriends','',function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
    // Util.getData(startV,'fenergy.php?do=SendFEnergy',{Fid:57019},function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
    // Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
        startV++;
        console.log(res);
    });
}

Util.tower = function(startV,id){
    Util.getData(startV,'maze.php?do=Show',{MapStageId:id},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            if (res.data.Clear == 0) {
                Util.fightTowerLayer(startV,id,res.data.Layer);
            }else if(res.data.FreeReset == 1){
                //reset and fight
            }
        }
    });
}

Util.fightTowerLayer = function(startV,map,layer){
    Util.getData(startV,'maze.php?do=Info',{MapStageId:map,Layer:layer},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var items = res.data.Map.Items;
            for (var i = 0; i < items.length; i++) {
                if(items[i] == 2 || items[i] == 3 || items[i] == 5){
                    console.log(i);
                    //Util.fightTower(startV,map,layer,i);
                }
            };
            if (res.data.Layer < res.data.TotalLayer) {
                console.log("yey" + res.data.Layer);
                var l = layer++;
                Util.fightTowerLayer(startV,map,l);
            };
        }
    });
}

Util.fightTower = function(startV,map,layer,item){
    Util.getData(startV,'maze.php?do=Battle',{MapStageId:map,Layer:layer,manual:1,ItemIndex:item},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            Util.getData(startV,'maze.php?do=ManualBattle',{stage:'',battleid:res.data.BattleId,manual:0},function(res2){
                startV++;
                console.log(res2);
                res2 = eval('(' + res2 + ')');
                if (res2.status == 1) {

                };
            });
        };
    });
}


Util.explore = function(startV){
    Util.getData(startV,'mapstage.php?do=GetUserMapStages','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {

        }
    });
}

Util.exploreCell = function(startV,id){
    Util.getData(startV,'mapstage.php?do=Explore',{MapStageDetailId:id},function(res){
        startV++;
        console.log(res);
    });
}

Util.changeCardGroups = function(startV, id){
    Util.getData(startV, 'card.php?do=GetCardGroup','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var groups = res.data.Groups;
            var ids = groups[id-1]["GroupId"];
            Util.getData(startV, 'card.php?do=SetDefalutGroup',{GroupId:ids},function(res2){
                console.log(res2);
            });
        };
    });
}

Util.addFriends = function(startV){
    Util.getData(startV,'friend.php?do=GetAddFriends','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var imFriends = res.data.AddFriends;
            for (var i = 0; i < imFriends.length; i++) {
                Util.getData(startV,'friend.php?do=Apply',{FUid:imFriends[i].Uid},function(res2){
                    console.log(res2);
                });
                startV++;
            };
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