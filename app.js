var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
later.date.localTime();

/**
 * //潘神：150000
//瘟疫: 114000
//泰坦: 132000
//擎天: 114000
//海王: 150000
 */

/**
* fight boss v1.0
* todo: add boss type check and change card groups
*/

var c1 = [
	{h:[13], m:[1]},
	{h:[19], m:[1]}
];
setTask(c1,Util.fightBoss, 5716);

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
	{h:[22], m:[01]}
];
setTask(c3,Util.fightJJC, 5716);

/***************************/
function setTask(t,task,v){
	var s = {
		schedules:t
	};
	var timer = later.setInterval(task,s,v);
}