//business logic

// function User(userName, userScore) {
//   this.userName = userName;
//   this.userScore = userScore;
// }

function rollDice(turnTotal) {
  //to start each roll, it IS the players turn
  var turn = true;
  //receive random number between 1 - 6
  var dieNumber = Math.floor((Math.random() * 6) + 1);
  //add dieNumber to turnTotal (everytime the function is called)
  turnTotal += dieNumber;
  //if dieNumber is 1, turnTotal becomes 0 and turn becomes false
  if (dieNumber === 1) {
    turnTotal = 0;
    turn = false;
  }

  console.log(turn);
  console.log(dieNumber);
  $("div#die-number h2 span").text(dieNumber);
  return turnTotal;
}

//user logic
$(document).ready(function() {
  //keeping variable scope in mind, everytime we click "roll" or "hold"
  //we don't want turnTotal or userScore to start at 0
  var turnTotal = 0;
  var userScore = 0;
  //var user = new User(userName, userScore);

  $("button#roll-button").click(function() {

    turnTotal = rollDice(turnTotal);

    console.log(turnTotal);

    $("div#roll-number h2 span").text(turnTotal);

  });

  $("button#hold-button").click(function() {
    //userScore adds the turnTotal to the previously stored sum and zeros it out and the turn becomes false
    userScore += turnTotal;
    turnTotal = 0;
    turn = false;

    console.log(userScore);
    console.log(turn);

    $("div#total-score h2 span").text(userScore);

    if (userScore >= 100) {
      $("div#game").fadeOut();
      $("div#winner").fadeIn();
    }

  });

});
