// require('tingyun');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var cluster = 1||require('cluster');
var swig = require('swig');
var numCPUs = require('os').cpus().length;
var people;

var http = require('http');
var https = require('https');
var define = require('./routes/define');
var routes = require('./routes/index');
var users = require('./routes/users');
var comment = require('./routes/comment');
var vip = require('./routes/vip');

var sign = require('./routes/sign');
var monitor = require('./routes/monitor');
var token = require('./routes/qiniu_token');



// var vip = require('./routes/vip');
// var test = require('./routes/test');

swig.setFilter('urldeal', function(input,str) {
  if((input.indexOf('guan.ba')>-1||input.indexOf('guanba.com')>-1)&&input.indexOf('-C.')==-1){
    return input + str;
  }
  else if(input.indexOf('1396')>-1){
    return input.replace('1396','132');
  }
  else{
    return input;
  }
});

swig.setFilter('dealpTime', function(input) {
    return define.timeformat(input);
});
swig.setFilter('audiotime', function(input) {

    return define.audiotime(input);
});

swig.setFilter('normaltime', function(input) {

    return define.normalimeformat(input);
});
if(cluster.isMaster){
    console.log("宿主启动...");

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('listening',function(worker,address){
		console.log('核心'+i+' pid:'+ worker.process.pid);
	});
	cluster.on('exit', function(worker, code, signal) {
		console.log('核心'+i+' pid:'+ worker.process.pid+' 重启');
		setTimeout(function() {cluster.fork();},2000);
	});
}else{

    // view engine setup


    var app = express();
 
    app.listen(3111);

}
// error handlers

// development error handler
// will print stacktrace
