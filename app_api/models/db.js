var mongoose = require('mongoose');
var readLine = require ("readline");

if (process.platform === "win32"){
  var rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on ("SIGINT", function (){
    process.emit ("SIGINT");
  });
}

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
  process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// For Heroku app termination
//process.on('SIGTERM', function() {
//  gracefulShutdown('Heroku app shutdown', function () {
//  process.exit(0);
//  });
//});


var dbURI='mongodb://localhost/loc8r'

mongoose.connection.on('open', function() {console.log('Mongoose connected to '+dbURI);});
mongoose.connection.on('error', function(err) {console.log('Mongoose error  '+err);});
mongoose.connection.on('disconnect', function() {console.log('Mongoose disconnected from '+dbURI);});
mongoose.connection.on('close', function() {console.log('Mongoose disconnected from '+dbURI);});

var promise = mongoose.connect(dbURI, {
  useMongoClient: true,
});

require('./loc8r_schema');