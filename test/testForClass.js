var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
later.date.localTime();
//潘神：150000
//瘟疫: 114000
//泰坦: 132000
//擎天: 114000
//海王: 150000
var composite = [
	{h:[13], m:[1]},
	{h:[19], m:[1]}
];
var sched = {
	schedules:composite
};

var timer = later.setInterval(process, sched);

function process(){
	console.log(new Date());
	var waitTime = "150000";
	Util.fightBoss(5716,waitTime);
}
// var waitTime = "114000";//ms
// Util.fightBoss(7683,waitTime);
