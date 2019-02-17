/*
 * Create a list that holds all of your cards
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// all possible icons (class names)
var classList = [
    'fa-diamond', 'fa-diamond', 
    'fa-paper-plane-o', 'fa-paper-plane-o', 
    'fa-anchor', 'fa-anchor', 
    'fa-bolt', 'fa-bolt', 
    'fa-cube', 'fa-cube', 
    'fa-leaf', 'fa-leaf', 
    'fa-bomb', 'fa-bomb',
    'fa-bicycle', 'fa-bicycle'
];

// shuffling classList
classList = shuffle(classList);

// selecting all cards
var allCards = document.querySelectorAll('.card');

// a variable to store an instance of clicked Cards
var openCards = [];

// Moves
var moves = 0;
document.querySelector('.moves').textContent = moves;

// Stars 
var stars = document.querySelectorAll('.fa-star');
stars.forEach(function(star){
    star.classList.add('yellow');
})

// Mistakes
var mistakes = 0;

// Timer
var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  return Math.round(timeDiff);
}






// Refresh page
const refreshBtn = document.querySelector('.fa-repeat')
refreshBtn.addEventListener('click', function (evt) {
location.reload();
})


// loop over all cards to assign icon's class and hook with click event listener
allCards.forEach(function (card) {
    card.children[0].className = "fa " + classList.pop();
    card.classList.add('open', 'show');
    setTimeout(function () {
        card.classList.remove('open', 'show');
        start();
        setInterval(function () {
            document.querySelector('.timer').textContent = end();
        }, 1000);
    }, 6000);



    card.addEventListener('click', function (evt) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
            openCards.push(card);
        
           
        if (openCards.length <= 2) {
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                moves += 1;
                document.querySelector('.moves').textContent = moves;
                // cards are identical
                if (openCards[0].children[0].className == openCards[1].children[0].className) {
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    openCards = [];
                    
                    if (document.querySelectorAll('.match').length == 16) {
                        const starCount = document.querySelectorAll('.yellow').length;
                        const seconds = end();
                        setTimeout(function () {   
                            if (confirm(`Congratulation you won!!\nWith ${moves} moves and ${starCount} stars \nin ${seconds} seconds \nDo you want to play again?`)){
                                location.reload();
                            } 

                        }, 500);

                      
                    }
                } else {

                    mistakes += 1;
                    if (mistakes == 2){
                    stars[2].classList.remove('yellow');
                    }
                    if (mistakes == 4){
                        stars[1].classList.remove('yellow');
                    }

                    if (mistakes == 6){
                        stars[0].classList.remove('yellow');
                    }

                    openCards.forEach(function (card) {
                        card.classList.add('nMatch');
                    });
    
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show', 'nMatch');
                        });
    
                        openCards = [];
                    }, 1000);
                }
            }
        }


    });
});