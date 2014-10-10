var table = [
	{
		e:"",
		c:""
	}
];

var fs = require('fs');
fs.readFile('../source/reward\ list.html',{encoding:'utf8'},function(err,data){
	if(err) throw err;
	console.log(data);
});
