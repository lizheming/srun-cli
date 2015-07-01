var program = require("commander");

program
    .action(function(name) {
        var config = require("../config.json");
        console.log( config[name] || "未设置" );
    })
    .parse(process.argv);

