var Unicode = require('../model/Unicode');
var Util = require('../model/Util');
var later = require('later');
var zlib = require('zlib');

function process(){
	//Util.buyGouLiang(5716, 5756);
	Util.changeCardGroups(5716,1);
}

process();

