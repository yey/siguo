var Unicode = require('./model/Unicode');
var Util = require('./model/Util');
var later = require('later');
later.date.localTime();

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
	{h:[1], m:[5]},
	{h:[15], m:[5]}
];
setTask(c7, Util.freeBuy, 5716);

/**
 * daily buy rune
 */

var c8 = [
	{h:[0],m:[5]}
];
setTask(c8, Util.buyRune, 5716, 5);

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