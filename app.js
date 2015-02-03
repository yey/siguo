var Unicode = require('./model/Unicode');
var Util = require('./model/Util');
var later = require('later');
later.date.localTime();

/*
0:1,5,55
1:5,10
2:5
3:15,55
4:1
5:20
6:55
8:1
9:55
11:20,55
12:55
13:1
15:5,55
16:5
17:5,55
18:5,55
19:1
20:1
21:55
23:5,30,55
 */

/**
* fight boss v1.0
* todo: add boss type check and change card groups
*/

var c1 = [
	{h:[13], m:[1]},
	{h:[19], m:[1]}
];
setTask(c1,Util.fightBossV2, 5716);

/**
 * send Friends Energy
 */

var c2 = [
	{h:[0], m:[1]},
	{h:[11], m:[20]}
];
setTask(c2,Util.sendFEnergy, 5716);

/**
 * fight JJC v1.0
 * todo: add competers check and choose good one
 * todo: choose fightJJC cards groups
 */

var c3 = [
	{h:[4], m:[1]}
];
setTask(c3,Util.fightJJCV2, 5716);

/**
 * check reward and get autoly
 */
var c4 = [
	{h:[8], m:[1]},
	{h:[20], m:[1]}
];
setTask(c4,Util.getAwards, 5716);

/**
 * check energy and fight pve
 */

var c5 = [
	{h:[0,3,6,9,11,12,15,17,18,21,23], m:[55]},
	{h:[18,23],m:[5]}
];
setTask(c5,Util.planEnergy,5716);

/**
 * get friends energy
 */

var c6 = [
	{h:[23], m:[30]}
];
setTask(c6,Util.getFEnergy,5716);

/**
 * free buy cards every day
 */

var c7 = [
	{h:[1,2], m:[5]},
	{h:[15,16,17], m:[5]}
];
setTask(c7, Util.freeBuy, 5716);

/**
 * daily buy rune
 */

var c8 = [
	{h:[0],m:[5]}
];
setTask(c8, Util.buyRune, 5716, 5);

/**
 * tager free
 */

var c9 = [
	{h:[1],m:[10]},
	{h:[3],m:[15]},
	{h:[5],m:[20]}
];
setTask(c9, Util.TigerMachine, 5716);
/***************************/
function setTask(t,task,v){
	var s = {
		schedules:t
	};
	var timer = later.setInterval(task,s,v);
}

function setTask2(t,task,v,id){
	var s = {
		schedules:t
	};
	var timer = later.setInterval(task,s,v,id);
}