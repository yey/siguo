var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
var zlib = require('zlib');

function process(){
	//Util.buyGouLiang(5716, 5756);
	Util.fightTowerLayer(5716,3,3);
	//Util.fightTower(5716,2,1,3);
}

process();
