var program = require("commander");

program
	.usage("[command] [name] [value]")
	.command("set <name> <value>", "set config")
	.command("get <name>", "get config")
	.parse(process.argv);

