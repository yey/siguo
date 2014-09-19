var pat = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
if (pat.test("2014/08-12")) {
	console.log('true');
}else{
	console.log('false');
}