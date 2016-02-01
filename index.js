debugger
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
var zoo = {
  welcome : function (){
    console.log("welcome to the zoo and friends app~")
  },
  menu : function (){
    console.log("Enter (A): ------> to Add a new animal to the Zoo!")
    console.log("Enter (U): ------> to Update info on an animal in the Zoo!")
    console.log("Enter (V): ------> to Visit the animals in the Zoo!")
    console.log("Enter (D): ------> to Adopt an animal from the Zoo!")
    console.log("Enter (Q): ------> to Quit and exit the Zoo!")
  },
   add : function(input_scope){
    var currentScope = input_scope
    var query = 'INSERT INTO zoo_db(name, type, age) VALUES (?,?,?)'
    console.log("To add an animal to the zoo please fill out the following form for us!")
    prompt.get(["->", "name", "type", "age"], function(err, result){
        connection.query(query);
    })
    currentScope.menu();
    currentScope.promptUser();
  },
  visit : function(){
    console.log(" Enter (I): ------> do you know the animal by it's id? We will visit that animal!")
    console.log(" Enter (N): ------> do you know the animal by it's name? We will visit that animal!")
    console.log(" Enter (A): ------> here's the count for all animals in all locations!")
    console.log(" Enter (C): ------> here's the count for all animals in this one city!")    
    console.log(" Enter (O): ------> here's the count for all the animals in all locations by the type you specified!")
    console.log(" Enter (Q): ------> Quits to the main menu!")
    currentScope.visit();
    currentScope.view(currentScope);
  },
  view : function(){
    var currentScope = input_scope;
    console.log("Please choose where you would like to visit")4
    prompt.get(["->", "visit"], function(err, result){
      if (result.visit == "Q"){
        currentScope.menu();
      }else if (result.visit == "O"){
        currentScope.type(input_scope);
      }else if (result.type == "I"){
        currentScope.type(input_scope);
      }else if (result.animID == "N"){
        currentScope.name(input_scope);
      }else if (result.name == "A"){
        currentScope.all(input_scope);
      }else if (result.all == "C"){
        currentScope.care(input_scope)
      }else{
        console.log("Sorry, didn't get that.  Come again?")
          currentScope.visit();
          currentScope.view(currentScope);
    })
  }
}
//calling my welcome function from within the Zoo object
zoo.welcome();
prompt.start();
prompt.message = "".rainbow;