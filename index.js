//mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoo_db'
});
//prompt
var prompt = require('prompt');
prompt.start();
var zoo = {
    welcome: function() {
      console.log("welcome to the zoo and friends app~");
    },
    menu: function() {
      console.log("Enter (A): ------> to Add a new animal to the Zoo!");
      console.log("Enter (U): ------> to Update info on an animal in the Zoo!");
      console.log("Enter (V): ------> to Visit the animals in the Zoo!");
      console.log("Enter (D): ------> to Adopt an animal from the Zoo!");
      console.log("Enter (Q): ------> to Quit and exit the Zoo!");
    },
    add: function(input_scope){
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['name', 'type', 'age'], function (err, result) {
    if (err) throw err;
    var trainer = Math.floor(Math.random() * 10);
    connection.query('INSERT INTO animals (name, type, age, caretaker_id) VALUES (?,?,?,?);', [result.name, result.type, result.age, trainer], function(err, results){
      if (err) console.log(err);
        console.log("Added!");
        zoo.menu();
        zoo.promptUser();
      });
    });
    },
    visit: function() {
      console.log(" Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
      console.log(" Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
      console.log(" Enter (A): ------> here's the count for all animals in all locations!");
      console.log(" Enter (C): ------> here's the count for all animals in this one city!");
      console.log(" Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
      console.log(" Enter (Q): ------> Quits to the main menu!");
    },
    view: function(input_scope){
      var currentScope = input_scope;
      console.log("Please choose where you would like to visit");
      prompt.get(["visit"], function(err, result) {
        if (result.visit === "Q") {
          zoo.menu();
          console.log(result.visit);
        }
        else if (result.visit === "O") {
          zoo.type();
        }
        else if (result.visit === "I") {
          zoo.animId();
        }
        else if (result.visit === "N") {
          zoo.name();
        }
        else if (result.visit === "A") {
          zoo.all();
        }
        else if (result.visit === "C") {
          zoo.care();
        }
        else {
          console.log("Sorry, didn't get that.  Come again?");
          zoo.visit();
          zoo.view(currentScope);
        }
      });
    },
    type: function(input_scope) {
      var currentScope = input_scope;
      console.log("Enter an animal to see how many we have!");
      prompt.get(["animal_type"], function(err, result) {
        connection.query();
        zoo.menu();
      });
    },
    care: function(input_scope) {
      var currentScope = input_scope;
      console.log("Enter City Name: NY/SF");
      prompt.get(["city_name"], function(err, result) {
        connection.query();
        zoo.visit();
        zoo.view(currentScope);
      });
    },
    animId: function(input_scope) {
      var currentScope = input_scope;
      console.log("Enter ID of the animal you wish to visit");
      prompt.get(["id"], function(err, result) {
        var x = result.id;
        x = parseInt(x);
        connection.query("SELECT * FROM animals WHERE id = ?", [x], function(err, result){
          if (err) throw err;
          console.log(result[0].name);
        });
        zoo.menu();
      });
    },
    anim_name: function(input_scope) {
      var currentScope = input_scope;
      console.log("Enter the Name of the animal you wish to visit");
      prompt.get(["animal_name"], function(err, result) {
        connection.query();
        zoo.menu();
        zoo.promptUser();
      });
    },
    count: function(input_scope) {
      var currentScope = input_scope;
      console.log("Type all to see the current total count of animals in our zoo!");
      prompt.get(["animal_count"], function(err, result) {
        connection.query();
        zoo.menu();
        zoo.prompUser();
      });
    },
    all: function(input_scope) {
      var currentScope = input_scope;
      console.log("Wanna see how many animals there are total?");
      prompt.get(['yes'], function(err, result) {
        if (err) throw err;
        connection.query('SELECT * FROM animals', function(err, results) {
          if (err) {
            console.log(err);
          }else
          console.log("there are this many animals in the zoo: " + results.length);
          zoo.menu();
          zoo.promptUser();
        });
      });
    },
    update: function(input_scope) {
      var currentScope = input_scope;
        prompt.get(["id", "new_name", "new_age", "new_type", "new_caretaker_id"], function(err, result) {
          if(err)
          connection.query('UPDATE animals SET name = ?, age = ?, caretaker_id = ? WHERE id = ?', [result.new_name, result.new_age, result.caretaker_id, result.id], function(err, results){
          if(err) console.log(err);
          console.log("Information updated! Thanks!");
            zoo.menu();
          zoo.promptUser();
        });
      });
    },
    adopt: function(input_scope) {
        var currentScope = input_scope;
        prompt.get(["animal_id"], function(err, result) {
          this.currentScope = input_scope;
        prompt.get(['animal_id'], function (err, result) {
          if (err) throw err;
          connection.query('delete from animals where id = ?', [result.animal_id], function(err, results){
          if (err) console.log("this is error" + err);
          console.log("You have adopted this animal!");
          zoo.menu();
          zoo.promptUser();
        });
      });
    });
  },
  promptUser: function(input_scope){
    prompt.get(['input'], function (err, result) {
      if (err) throw err;
      else if (result.input == "Q"){
        zoo.exit();
      }else if (result.input == "A"){
        zoo.add();
      }else if (result.input == "V"){
        zoo.visit();
        zoo.view();
      }else if (result.input == "D"){
        zoo.adopt();
      }else{
        console.log("I'm sorry, I didn't get that");
        zoo.promptUser();
      }
    });
  },
    exit: function() {
      console.log("Thank you for visiting Tammer's Zoo of Horrors, Bye!");
      process.exit();
    },
    open: function() {
      this.welcome();
      this.menu();
      this.promptUser();
    }
  };
  zoo.open();
