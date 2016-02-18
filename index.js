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
  add: function(input_scope) {
    var currentScope = input_scope;
    var query = "INSERT INTO zoo_db(name, type, age) VALUES (?,?,?)";
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(["name", "type", "age"], function(err, result) {
      connection.query(query);
    });
    currentScope.menu();
    currentScope.promptUser();
  },
  visit: function() {
    console.log(" Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
    console.log(" Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
    console.log(" Enter (A): ------> here's the count for all animals in all locations!");
    console.log(" Enter (C): ------> here's the count for all animals in this one city!");
    console.log(" Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
    console.log(" Enter (Q): ------> Quits to the main menu!");
    currentScope.visit();
    currentScope.view(currentScope);
  },
  view: function(input_scope) {
    var currentScope = input_scope;
    console.log("Please choose where you would like to visit");
    prompt.get(["visit"], function(err, result) {
      if (result.visit == "Q") {
        currentScope.menu();
      } else if (result.visit == "O") {
        currentScope.type(input_scope);
      } else if (result.type == "I") {
        currentScope.type(input_scope);
      } else if (result.animID == "N") {
        currentScope.name(input_scope);
      } else if (result.name == "A") {
        currentScope.all(input_scope);
      } else if (result.all == "C") {
        currentScope.care(input_scope);
      } else {
        console.log("Sorry, didn't get that.  Come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });
  },
  type: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter an animal to see how many we have!");
    prompt.get(["animal_type"], function(err, result) {
      connection.query();
      currentScope.menu();
      currentScope.();
    });
  },
  care: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter City Name: NY/SF");
    prompt.get(["city_name"], function(err, result) {
      connection.query();
      currentScope.visit();
      currentScope.view(currentScope);
    });
  },
  animId: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter ID of the animal you wish to visit");
    prompt.get(["animal_id"], function(err, result) {
      connection.query();
      currentScope.menu();
      currentScope.();
    });
  },
  anim_name: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter the Name of the animal you wish to visit");
    prompt.get(["animal_name"], function(err, result) {
      connection.query();
      currentScope.menu();
      currentScope.promptUser();
    });
  },
  count: function(input_scope) {
    var currentScope = input_scope;
    console.log("Type all to see the current total count of animals in our zoo!");
    prompt.get(["animal_count"], function(err, result) {
      connection.query();
      currentScope.menu();
      currentScope.prompUser();
    });
  },
  all: function(input_scope) {
    this.currentScope = input_scope;
    console.log("Wanna see how many animals there are total?")
    prompt.get(['yes'], function(err, result) {
      if (err) throw err;
      connection.query('SELECT * FROM animals', function(err, results) {
        if (err) {
          console.log(err)
        };
        console.log("there are this many animals in the zoo: " + results.length)
        zoo.menu();
        zoo.promptUser();
      })
    })
  },
  update: function(input_scope) {
    var currentScope = input_scope;
    prompt.get(["new_name", "new_age", "new_type", "new_caretaker_id"], function(err, result) {
      connection.query();
      currentScope.menu();
      currentScope.promptUser();
    });
  },
  adopt: function() {
    var currentScope = input_scope;
    prompt.get(["animal_id"], function(err, result) {
      if (result.input == "Q") {
        self.exit();
      } else if (result.input == "A") {
        self.add(self);
      } else if (result.input == "V") {
        self.visit();
        self.view(self);
      } else if (result.input == "D") {
        self.adopt(self);
      } else {
        console.log("Sorry, didn't get that. Try again");
        self.promptUser();
        self.menu();
      }
    });
  },
  promptUser: function() {
    var self = this;
    prompt.get("input", function(err, result) {
      if (result.input == "Q") {
        self.exit();
      } else if (result.input == "A") {
        self.add(self);
      } else if (result.input == "V") {
        self.visit();
        self.view(self);
      } else if (result.input == "D") {
        self.adopt(self);
      } else {
        console.log("Sorry, didn't get that.  Come again?")
      }
    })
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
