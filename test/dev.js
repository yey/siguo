var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
var argv=process.argv.slice(2);

function pro(){
	if(argv.length <= 0){
		console.log("1:buyGouLiang\n2:fightBoss\n3:useEnergy\n4:sendFEnergy\n5:fightJJC\n6:getFEnergy\n7:getAwards\n8:freeBuy\n9:buyRune");
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
			Util.testNew(5716);
			break;
		}
		default:{
					//console.log("no such function");
					console.log("1:buyGouLiang\n2:fightBoss\n3:useEnergy\n4:sendFEnergy\n5:fightJJC\n6:getFEnergy\n7:getAwards\n8:freeBuy\n9:buyRune");
					process.exit(0);
				}
	}
}

pro();
