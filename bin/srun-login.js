var program = require("commander");
	srun = require("../lib/srun");

program
	.option("-u, --username <value>", "student number")
	.option("-p, --password [value]", "password")
	.parse(process.argv);

if( !program.hasOwnProperty("username") || !program.hasOwnProperty("password") ) {
	return program.help();
}

if( program.password === true ) {
	var prompt = require("prompt");
	prompt.message = "";
	prompt.delimiter = "";
	prompt.colors = false;

	prompt.start();
	prompt.get([{
		name: "password",
		description: "password:",
		hidden: true
	}], function(err, res) {
		if( err ) return false;
		srun.login(program.username, res.password);
	})
} else srun.login(program.username, program.password);		