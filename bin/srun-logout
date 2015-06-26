var program = require("commander"),
	srun = require("../lib/srun");

program
	.option("-u, --username <value>", "student number")
	.option("-p, --password [value]", "password")
	.option("-f, --force", "force logout account login in the current network")
	.parse(process.argv);

if( !program.hasOwnProperty("force") &&
	(!program.hasOwnProperty("username") || !program.hasOwnProperty("password"))
){
	return program.help();
}

if( program.force ) srun.forceLogout();
else {
	if(!program.username || !program.password) return false;
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
			srun.logout(program.username, res.password);
		})
	} else srun.logout(program.username, program.password);
}