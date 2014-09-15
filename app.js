var Unicode = require('./model/Unicode');
var Util = require('./model/Util');

function buyCards(times){
	var startV = 2000;//todo:get v from config
	Util.buyGouLiang(startV, startV+times);
	//todo:set v
}

buyCards(150);