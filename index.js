var zoo = {
  welcome: function (){
    console.log("welcome to the zoo and friends app~")
  };
  menu: function (){
    console.log("Enter (A): ------> to Add a new animal to the Zoo!");
    console.log("Enter (U): ------> to Update info on an animal in the Zoo!");
    console.log("Enter (V): ------> to Visit the animals in the Zoo!");
    console.log("Enter (D): ------> to Adopt an animal from the Zoo!");
    console.log("Enter (Q): ------> to Quit and exit the Zoo!");
  };
}
var prompt = require ('prompt');
var mysql = require ('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tinker511',
  database : 'zoo_db'
});
//creating and checking connection to zoo_db database
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    };
    console.log('connected as id ' + connection.threadId);
});
//calling my welcome function from within the Zoo object
zoo.welcome();
prompt.start();
prompt.message = "".rainbow;