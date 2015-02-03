var Util = exports;

var http = require('http');
var async = require('async');
var querystring = require('querystring');
var fs = require('fs');
var zlib = require('zlib');
var configPath = "../config/siguo.cfg";
var unicode = require('./Unicode');
//05krgeu6p6t7cjl7aheq6emtr4
var opts = {
    host: 's0.siguozhanji.muhenet.com',
    port: 80,
    path: '&phpp=ANDROID&phpl=ZH_CN&pvc=1.6.0.0&phpk=62492bdfb0f47a7f93bfcacc547721a0&phps=336932653&pvb=2015-01-29 18:24',
    method: 'POST',
    headers: {
            "Cookie":'_sid=augc92c2h6ql4jdfdn9bpshkg2; expires=Sun, 08-Feb-2015 10:24:10 GMT; path=/',
            "Connection": 'Keep-Alive',
            "Accept-Encoding": 'gzip,deflate',   
            "Content-Type":"application/x-www-form-urlencoded" 
        }
    };

Util.test = function(startV){
    Util.getData(startV,'task.php?do=GetDailyTaskInfo','',function(res){
//    Util.getData(startV,'league.php?do=GetGoods','',function(res){
//    Util.getData(startV,'league.php?do=getLeagueInfo','',function(res){
//    Util.getData(startV,'league.php?do=lottery','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            
        };
    });
}

Util.TigerMachine = function(startV){
    Util.getData(startV,'league.php?do=lottery','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            Util.TigerMachine(startV);
        };
    });
}

Util.buyRune = function(startV, limit){
    Util.getData(startV,'meditation.php?do=Info','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var npcList = res.data.NpcList;
            var max = npcList[0];
            for (var i = 0; i < npcList.length; i++) {
                if(max < npcList[i]){
                    max = npcList[i];
                }
            };
            Util.buyRuneCell(startV, startV + limit, max);
        };
    });
}

Util.buyRuneCell = function(startV, limit, npc){
    if (startV >= limit) {
        //deal
        Util.getData(startV, 'meditation.php?do=Deal', '', function(res){
            startV++;
            //console.log(res);
            res = eval('(' + res + ')');
            if (res.status == 1) {
                console.log("buy rune end");
            }
        });
    }else{
        Util.getData(startV, 'meditation.php?do=Npc',{NpcId:npc},function(res){
            startV++;
            console.log(res);
            res = eval('(' + res + ')');
            if (res.status == 1) {
                var npcList = res.data.NpcList;
                var max = npcList[0];
                for (var i = 0; i < npcList.length; i++) {
                    if(max < npcList[i]){
                        max = npcList[i];
                    }
                };
                Util.buyRuneCell(startV, limit, max);
            }else if(res.message.indexOf("满") >= 0) {
                Util.getData(startV, 'meditation.php?do=Deal', '', function(res){
                    startV++;
                    res = eval('(' + res + ')');
                    if (res.status == 1) {
                        Util.getData(startV, 'meditation.php?do=Info', '', function(res2){
                            startV++;
                            res2 = eval('(' + res2 + ')');
                            if (res2.status == 1) {
                                var npcList = res2.data.NpcList;
                                var max = npcList[0];
                                for (var i = 0; i < npcList.length; i++) {
                                    if(max < npcList[i]){
                                        max = npcList[i];
                                    }
                                };
                                Util.buyRuneCell(startV, limit, max);
                            };
                        });
                        //setTimeout(Util.buyRuneCell, 1000, startV, limit, max);
                    }
                });
            }else{
                console.log("buy rune end");
            }
        });
    }
}

Util.freeBuy = function(startV){
    Util.getData(startV,'shopnew.php?do=GetGoods','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            var oldgood = res.data.oldgood;
            var keys = Object.keys(oldgood);
            for (var i = 0; i < keys.length; i++) {
                if(oldgood[keys[i]].GoodsId == 7 || oldgood[keys[i]].GoodsId == 1){
                    var goods = oldgood[keys[i]];
                    if (goods.RemainTime == 0 && goods.FreeTimes < goods.MaxFreeTimes) {
                        Util.freeBuyGouLiang(startV,goods.MaxFreeTimes - goods.FreeTimes + startV, goods.GoodsId, goods.CoolDown);
                        startV++;
                    };
                }
            };
        };
    });
}

Util.freeBuyGouLiang = function(startV, limit, id, coldT){
    Util.getData(startV,'shopnew.php?do=FreeBuy',{GoodsId:id},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1 && startV < limit) {
            setTimeout(Util.freeBuyGouLiang, coldT*1000, startV, limit, id, coldT);
        }   
    });
}

Util.buyGouLiang = function(startV, limit, id, coldT){
    Util.getData(startV,'shop.php?do=Buy',{GoodsId:id},function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1 && startV < limit) {
            setTimeout(Util.buyGouLiang, coldT*1000, startV, limit, id, coldT);
        }   
    });
}

Util.tower = function(startV,id){
    // var energy = {
    //     "7":46,
    //     "8":46
    // };
    Util.getData(startV,'maze.php?do=Show',{MapStageId:id},function(res){
        startV++;
        console.log(res);
        console.log(id+"塔开战");
        res = eval('(' + res + ')');
        if (res.status == 1) {
            if (res.data.Clear == 0) {
                //fight
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
        //console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            Util.fightTower(startV,map,layer,function(code,result){
                startV++;
                if (code != 200) {
                    //error
                    console.log(code+":"+result);
                }else{
                    if (layer+1 > res.data.TotalLayer) {
                        console.log(map+"塔已经扫完");
                    }else if(checkTower(res.data.Map.Items)){
                        console.log("未完成终止");
                    }else{
                        Util.fightTowerLayer(startV, map, layer+1);           
                    }
                }
            });
        }else if (res.message.indexOf('上一层') >= 0) {
            //从上一层开打
            if (layer > 1) {
                Util.fightTowerLayer(startV, map, layer-1);
            };
        };
    });
}

Util.fightTower = function(startV,map,layer,cb){
    //todo:如果无法打完而又返回200,会导致无穷递归
    Util.getData(startV,'maze.php?do=Info',{MapStageId:map,Layer:layer},function(res){
        startV++;
        //console.log(res);
        console.log(map+"塔"+layer+"层开打");
        res = eval('(' + res + ')');
        if (res.status == 1) {
            if (res.data && res.data.Map) {
                if (res.data.Map.IsFinish) {
                    cb(200);
                }else{
                    var taskList = res.data.Map.Items;
                    var len = 0;
                    async.whilst(
                        function(){return len<taskList.length;},
                        function(callback){
                            var item = taskList[len];
                            if (item == 2 || item == 3 || item == 5) {
                                Util.getData(startV,'maze.php?do=Battle',{MapStageId:map,Layer:layer,manual:1,ItemIndex:len},function(res2){
                                    startV++;
                                    //console.log(res2);
                                    res2 = eval('(' + res2 + ')');
                                    if (res2.status == 1) {
                                        Util.getData(startV,'maze.php?do=ManualBattle',{stage:'',battleid:res2.data.BattleId,manual:0},function(res3){
                                            startV++;
                                            //console.log(res3);
                                            res3 = eval('(' + res3 + ')');
                                            if (res3.status == 1) {
                                                len++;
                                                callback(null);
                                            }else{
                                                len++;
                                                callback(205,"finish fight error");
                                            }
                                        });
                                    }else{
                                        len++;
                                        callback(204, "begin fight error");
                                    }
                                });           
                            }else{
                                len++;
                                callback(null);
                            }
                        },
                        function(err,msg){
                            if (err) {
                                console.log(msg);
                                cb(err, msg);
                            }else{
                                cb(200);
                            }
                        }
                    );
                }
            }else{
                cb(203,"data error");
            }
        }
    });
    // Util.getData(startV,'maze.php?do=Battle',{MapStageId:map,Layer:layer,manual:1,ItemIndex:item},function(res){
    //     startV++;
    //     console.log(res);
    //     res = eval('(' + res + ')');
    //     if (res.status == 1) {
    //         Util.getData(startV,'maze.php?do=ManualBattle',{stage:'',battleid:res.data.BattleId,manual:0},function(res2){
    //             startV++;
    //             console.log(res2);
    //             res2 = eval('(' + res2 + ')');
    //             if (res2.status == 1) {

    //             };
    //         });
    //     };
    // });
    // 
    // //             var items = res.data.Map.Items;
    //         // turn for into async.whlist
    //         for (var i = 0; i < items.length; i++) {
    //             if(items[i] == 2 || items[i] == 3 || items[i] == 5){
    //                 console.log(i);
    //                 //Util.fightTower(startV,map,layer,i);
    //             }
    //         };
    //         // if (res.data.Layer < res.data.TotalLayer) {
    //         //     console.log("yey" + res.data.Layer);
    //         //     var l = layer++;
    //         //     Util.fightTowerLayer(startV,map,l);
    //         // };

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

Util.changeCardGroups = function(startV, id, callback){
    Util.getData(startV, 'card.php?do=SetDefalutGroup',{GroupId:id},function(res){
        startV++;
        res = eval('(' + res + ')');
        if (res.status == 1) {
            callback(null);
        }else{
            callback("err");
        }
    });
}

Util.planEnergy = function(startV){
    Util.getData(startV,'user.php?do=GetUserinfo','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            //if (res.data.Energy >= 28) {
                Util.clearEnergyByPve(startV,72);
            //};
        }
    });
}

Util.clearEnergyByPve = function(startV,gid){
    //group 3
    Util.changeCardGroups(startV,6083,function(res){
        startV++;
        if (!res) {
            Util.getData(startV,'mapstage.php?do=EditUserMapStages',{MapStageDetailId:gid,isManual:1},function(res2){
				startV++;
                res2 = eval('(' + res2 + ')');
                if (res2.status == 1) {
                    Util.getData(startV,'mapstage.php?do=Battle',{
                        MapStageDetailId:gid,
                        isManual:0,
                        battleid:res2.data.BattleId,
                        stage:''
                    },function(res3){
                        startV++;
                        res3 = eval('(' + res3 + ')');
                        console.log("{Win:"+res3.data.Win + ",Bonus:" + res3.data.ExtData.Bonus[0] + "&" + res3.data.ExtData.Bonus[1] + "}");
                        if (res3.status == 1) {
                            Util.clearEnergyByPve(startV,gid);
                        };
                    });
                };
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

Util.getFEnergy = function(startV){
    Util.getData(startV,'friend.php?do=GetFriends','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            for (var i = 0; i < res.data.Friends.length; i++) {
                if(res.data.Friends[i].FEnergySurplus > 0){
                    Util.getData(startV,'fenergy.php?do=GetFEnergy',{Fid:res.data.Friends[i].Uid},function(res2){
                        console.log(res2);
                        res2 = eval('(' + res2 + ')');
                        if (res2.status == 0) {
                            
                        };
                    });
                    startV++;
                };
            };
        };
    });
}

Util.getAwards = function(startV){
    Util.getData(startV,'user.php?do=GetUserSalary','',function(res){
        startV++;
        console.log(res);
        res = eval('(' + res + ')');
        if (res.status == 1) {
            if (res.data.SalaryInfos.length > 0) {
                Util.getData(startV,'user.php?do=AwardSalary','',function(res2){
                    startV++;
                    console.log(res2);
                    res2 = eval('(' + res2 + ')');
                    if (res2.status == 1) {
                        console.log("领钱钱啦~");
                    };
                });
            };
        };
    });
}

Util.fightJJCV2 = function(startV){
    Util.changeCardGroups(startV,5450,function(res){
        startV++;
        console.log(res);
        if (!res) {
            Util.fightJJC(startV);
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
            var tip = 0;
            for (var i = 0; i < res.data.Competitors.length; i++) {
                if(res.data.Competitors[i].Level < res.data.Competitors[tip].Level){
                    tip = i;
                }
            };
            var competitorRank = res.data.Competitors[tip].Rank;            
            //这里能不能直接和第一名打呢～喔吼吼
            Util.getData(startV,'arena.php?do=RankFight',{CompetitorRank:competitorRank},function(fightRes){
                startV++;
                try{
                    fightRes = JSON.parse(fightRes);
                    if (fightRes.status == 0 && fightRes.type == 8) {
                        console.log(fightRes.message);
                    }else{
                        setTimeout(Util.fightJJC, 601000, startV);
                    }
                }catch(err){
                    console.log("打了，而且你肯定输");
                    setTimeout(Util.fightJJC, 601000, startV);
                }
                //fightRes = eval('(' + fightRes + ')');  
                //console.log(fightRes);             
                
            });
        };
    });
}

Util.fightBossV2 = function(startV){
    Util.changeCardGroups(startV,5619,function(res){
        startV++;
        console.log(res);
        if (!res) {
            Util.fightBoss(startV);
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
        }else if(res.status == 0 && res.message != "Boss还未刷新或已逃走" && res.message != "有手快的已经把Boss打掉啦~"){
            //意外情况，15s重试一次
            var waitTime = 1000*15 + 300;
            setTimeout(Util.fightBoss, waitTime, startV);            
        }else{
            //console.log("打完啦");
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


//-------------------
function checkTower(itemList){
    var found = false;
    for (var i = 0; i < itemList.length; i++) {
        if(itemList[i] == 2 || itemList[i] == 3 || itemList[i] == 5){
            found = true;
            break;
        }
    };
    return found;
}