var program = require("commander"),
	fs = require("fs")

program
	.action(function(name) {
		if( !name ) return false;

		var config = require("../config.json");
		delete config[name];
		fs.writeFile("../config.json", JSON.stringify(config, null, "\t"), function(err) {
			console.log( err ? err : "删除成功" )
		})
	})
	.parse(process.argv);

