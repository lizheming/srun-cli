var program = require("commander"),
	fs = require("fs")

program
	.action(function(name, value) {
		if( !name || !value ) return false;

		var config = require("../config.json");
		config[name] = value;
		fs.writeFile("../config.json", JSON.stringify(config, null, "\t"), function(err) {
			console.log( err ? err : "设置成功" )
		})
	})
	.parse(process.argv);

