var flatiron = require("flatiron"),
    restful = require("restful"),
    resourceful = require("resourceful"),
    fs = require("fs");

var app = module.exports = flatiron.app;

var Task = resourceful.define("task", function(){
	// Specify the storage engine
	this.use("memory");

	// Tell Flatiron to expose tasks
	this.restful = true;

	// Add properties
	this.string("title", {required: true});
	this.bool("done", {"default": false});
	this.timestamps();
});

app.resources = {
	Task: Task
};

/*
// tasks can be create already at this point
new Task({
	title: "conquer the world"
});
*/

app.use(flatiron.plugins.http);

app.router.get('/', function(){
	this.res.writeHead(200, {"content-type": "text/html"});
	fs.createReadStream(__dirname + "/public/index.html").pipe(this.res);
});

app.use(restful, {explore: false});

app.start(3e3, console.log.bind(null, "Server running!"));