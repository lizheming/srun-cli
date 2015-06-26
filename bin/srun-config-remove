var program = require("commander"),
	fs = require("fs"),
	path = require("path");

program
	.action(function(name) {
		if( !name ) return false;

		var config = require("../config.json");
		delete config[name];
		fs.writeFile(path.resolve(__dirname,"../config.json"), JSON.stringify(config, null, "\t"), function(err) {
			console.log( err ? err : "删除成功" )
		})
	})
	.parse(process.argv);

