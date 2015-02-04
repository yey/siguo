var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
var argv=process.argv.slice(2);

function pro(){
	if(argv.length <= 0){
		console.log("1:buyGouLiang num\n"
			+"2:fightBoss\n"
			+"3:useEnergy\n"
			+"4:sendFEnergy\n"
			+"5:fightJJC\n"
			+"6:getFEnergy\n"
			+"7:getAwards\n"
			+"8:freeBuy\n"
			+"9:buyRune num\n"
			+"10:tigerMachine\n"
			+"11:fightTower tower");
		process.exit(0);
	}
	switch(argv[0]){
		case "1":{
			Util.buyGouLiang(5716,5716 + parseInt(argv[1]), 1, 1);
			break;
		}
		case "2":{
			Util.fightBossV2(5716);
			break;
		}
		case "3":{
			Util.planEnergy(5716);
			break;
		}
		case "4":{
			Util.sendFEnergy(5716);
			break;
		}
		case "5":{
			Util.fightJJCV2(5716);
			break;
		}
		case "6":{
			Util.getFEnergy(5716);
			break;
		}
		case "7":{
			Util.getAwards(5716);
			break;
		}
		case "8":{
			Util.freeBuy(5716);
			break;
		}
		case "9":{
			Util.buyRune(5716, parseInt(argv[1]));
			break;
		}
		case "10":{
			Util.TigerMachine(5716);
			break;
		}
		case "11":{
			Util.tower(5716, parseInt(argv[1]));
			break;
		}
		case "12":{
			Util.test(5716);
			break;
		}
		default:{
					//console.log("no such function");
					console.log("1:buyGouLiang num\n"
						+"2:fightBoss\n"
						+"3:useEnergy\n"
						+"4:sendFEnergy\n"
						+"5:fightJJC\n"
						+"6:getFEnergy\n"
						+"7:getAwards\n"
						+"8:freeBuy\n"
						+"9:buyRune num\n"
						+"10:tigerMachine\n"
						+"11:fightTower tower");
					process.exit(0);
				}
	}
}

pro();
