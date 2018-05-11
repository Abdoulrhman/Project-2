/*
|--------------------------------------------------------------------------
| Memory Game Using Javascript
|--------------------------------------------------------------------------
*/

    


/*
    |--------------------------------------------------------------------------
    | line 22 ) Declaring [cards]  array which contains the cards-classNames
    | line 23 ) Declaring [openCard] array to store  the opened cards
    |--------------------------------------------------------------------------
    */

let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let openCard = [];

/*
    |--------------------------------------------------------------------------
    | 29-34) Declaring some variables to be used later
    |--------------------------------------------------------------------------
    */
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let starRating = "3";
let timer;


/*
    |--------------------------------------------------------------------------
    | 44-55) Function to shuffle cards randomly
    |--------------------------------------------------------------------------
    */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
    |--------------------------------------------------------------------------
    | 62-67) function to create the card's html structure for each card(li)
    |--------------------------------------------------------------------------
    */

function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}
/*
    |--------------------------------------------------------------------------
    | 75-124) This is how to find matching cards
    |--------------------------------------------------------------------------
    */


function findMatch() {
  // Show cards [ on click ]
  $(".card").on("click", function() {

  // check if the card has those classes
    if ($(this).hasClass("open show")) {

        return;
    }
  //toggle the card classes
    $(this).toggleClass("flipInY open show");

  //add to openCard  array
    openCard.push($(this));

  // the game starts with timer
    startGame = true;

   // Check if classlist matches when openCard length == 2
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounceIn", "match");
      openCard[1][0].classList.add("bounceIn", "match");
      // this occurs when the two cards matches to disable them
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');

      //added to the matchFound variable which declared at the beginning
      matchFound += 1;
      //increment the moves on every 2 cards
      moves++;
      // this method declared below and hoisting by js to remove the openCard array
      removeOpenCards();

      // this method declared below and hoisting by js to find the winner
      findWinner();
      } else {
      // If classes don't match, add "wrong" class
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      // Set timeout to remove "show" and "open" class
      setTimeout(removeClasses, 1100);
      // Reset openCard.length to 0
      setTimeout(removeOpenCards, 1100);
      moves++;
      }
    }
  updateMoves();
  })
}

/*
    |--------------------------------------------------------------------------
    | 132-149) This is how to add moves to its variable
    |--------------------------------------------------------------------------
    */

function updateMoves() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves > 0 && moves < 16) {
    starRating = starRating;  // 3/3 stars
  } else if (moves >= 16 && moves <= 20) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";  //  2/3 stars
  } else if (moves > 20) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";   // 1/3 stars
  }
}
/*
    |--------------------------------------------------------------------------
    | 157-181) Showing PopUP when game is complete
    |--------------------------------------------------------------------------
    */

function findWinner() {

  if (matchFound === 8) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(starRating);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);


 }
}
/*
    |--------------------------------------------------------------------------
    | 189-191) Reset openCard.length to 0
    |--------------------------------------------------------------------------
    */


function removeOpenCards() {
  openCard = [];
}
/*
    |--------------------------------------------------------------------------
    | 198-201) Remove all classes except "match"
    |--------------------------------------------------------------------------
    */

function removeClasses() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  removeOpenCards();
}
/*
    |--------------------------------------------------------------------------
    | 208-212) Disable clicks
    |--------------------------------------------------------------------------
    */

function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}
/*
    |--------------------------------------------------------------------------
    | 219-232) Function to Start timer on the first card click
    |--------------------------------------------------------------------------
    */

function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }

/*
    |--------------------------------------------------------------------------
    |  It's  Time To Call Functions
    |--------------------------------------------------------------------------
    */
shuffle(cards);
createCard();
findMatch();
startTimer();
/*
    |--------------------------------------------------------------------------
    |  249-253) Function to restart the game on icon click
    |--------------------------------------------------------------------------
    */

function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();



