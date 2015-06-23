var program = require("commander");

program
	.usage("[command] [name] [value]")
	.command("set <name> <value>", "set config")
	.command("remove <name>", "remove config")
	.command("get <name>", "get config")
	.command("ls", "show all config")
	.parse(process.argv);

