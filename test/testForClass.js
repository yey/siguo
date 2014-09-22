var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
later.date.localTime();
//*************************//
var composite = [
	{h:[13], m:[1]},
	{h:[19], m:[1]}
];
setTask(composite,Util.fightBoss,5716);
//*************************//
var composite2 = [
	{h:[22], m:[1]}
];
setTask(composite2,Util.fightJJC,5716);
//*************************//
var composite3 = [
	{h:[0], m:[1]}
];
setTask(composite3,Util.sendFEnergy,5716);
//*************************//
function setTask(time,task,v){
	var c = time;
	var s = {
		schedules:c
	};
	var t = later.setInterval(task,s,v);
}
