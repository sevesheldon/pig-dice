//business logic
function User(userName, userScore) {
  this.userName = userName;
  this.userScore = userScore;
}

function changePlayer(x, y) {
  x ++;
  //IF activeUser is greater than the amount of users less one (users.length -1), activeUser becomes 0
  if(x > y.length -1 ){ //-1 because index starts at 0; if you reach the end, restart.
    x = 0; //starts array at beginning (index of 0)
  }
  return x;
}

function highlightPlayer(players, activeUser) { //or is it (players[activeUser]) ???
  var players = $("div#players").children(); //all the children of the div #players
  players.each(function() {
    $(this).removeClass("current-player"); //for each child of .this element, remove the class .current-player
  });
  $(players[activeUser]).addClass("current-player"); //addClass to player[index number]
}

function rollDice(turnTotal, activeUser, users) {
  var turn = true; //to start each roll, it IS the players turn
  var dieNumber = Math.floor((Math.random() * 6) + 1); //receive random number between 1 - 6

  turnTotal += dieNumber; //add dieNumber to turnTotal (everytime the function is called)

  if (dieNumber === 1) { //IF dieNumber is 1, turnTotal becomes 0, activeUser increments by 1 and turn becomes false
    turnTotal = 0;
    activeUser = changePlayer(activeUser, users); //must store function in the variable activeUser
    turn = false;
  }

  highlightPlayer(players, activeUser);

  console.log(turn);
  console.log(dieNumber);
  $("div#die-number h2 span").text(dieNumber); //display current dieNumber
  return [turnTotal, activeUser];
}

//user logic
$(document).ready(function() {
  //keeping variable scope in mind, everytime we click "roll" or "hold"
  //we don't want turnTotal or userScore to start at 0
  var turnTotal = 0;
  var userScore = 0;
  var activeUser = 0; //activeUser is just the index position of "users"
  var users = [];
  var user1 = new User("Player 1", 0);
  var user2 = new User("Player 2", 0);
  users.push(user1, user2);

  //when "roll" button is clicked
  $("button#roll-button").click(function() {

    [turnTotal, activeUser] = rollDice(turnTotal, activeUser, users); //[turnTotal, activeUser] because that's what rollDice() returns

    console.log([turnTotal, activeUser]);

    $("div#roll-number h2 span").text(turnTotal);

  });

  //when "hold" button is clicked:
  $("button#hold-button").click(function() {

    users[activeUser].userScore += turnTotal; //userScore of the current user: users[index#] adds turnTotal to the stored sum of userScore (of current user)

    if (users[activeUser].userScore >= 100) { //when first player reaches 100
      $("div#game").fadeOut();
      $("div#winner").fadeIn();
      $("div#winner h1#winner-name").text(users[activeUser].userName); //displays userName of user[activeUser]
    }

    turnTotal = 0; //zeros out turnTotal
    activeUser = changePlayer(activeUser, users); //must store function in the variable activeUser
    turn = false;

    highlightPlayer(players, activeUser);

    console.log(users[activeUser].userScore); //activeUser is just the index position of "users"
    console.log(turn); //boolean value
    console.log(user1); //object constructor
    console.log(user2); //object constructor

    //display players scores
    $("div#player1 h2 span").text(user1.userScore);
    $("div#player2 h2 span").text(user2.userScore);

  });

});
