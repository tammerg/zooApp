var zoo = {
  welcome: function welcome(){
    console.log("welcome to the zoo and friends app~")
  } 
}
var prompt = require ('prompt');
var mysql = require ('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tinker511',
  database : 'zoo_db'
});
    
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    };
    console.log('connected as id ' + connection.threadId);
});
zoo.welcome();
prompt.start();
prompt.message = "".rainbow;