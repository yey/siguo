var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
later.date.localTime();
//潘神：150000
//瘟疫: 114000
//泰坦: 132000
//擎天: 114000
//海王: 150000
//*************************//
var composite = [
	{h:[13], m:[1]},
	{h:[19], m:[1]}
];
var sched = {
	schedules:composite
};

var timer = later.setInterval(fightBoss, sched);

//*************************//

var composite2 = [
	{h:[22], m:[1]}
];
var sched2 = {
	schedules:composite2
};
var timer2 = later.setInterval(fightJJC,sched2);

//*************************//
var composite3 = [
	{h:[0], m:[1]}
];
var sched3 = {
	schedules:composite3
};
var timer3 = later.setInterval(Util.test,sched3,5716);
//*************************//

function fightBoss(){
	console.log(new Date());
	var waitTime = "150000";
	Util.fightBoss(5716,waitTime);
}

function fightJJC(){
	Util.fightJJC(5716);
}

function setTask(time,task,v){
	var c = time;
	var s = {
		schedules:c
	};
	var t = later.setInterval(task,s,v);
}
