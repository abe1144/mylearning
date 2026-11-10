
// function that gets the computer choice
// doing this without using arrays
// generate random int values for choices (0,1,2) =>  (rock, paper, scissors)

function getComputerChoice() {
    random_int = Math.floor(Math.random() * 3);

    if (random_int == 0) {
        choice = "rock";
    } else if (random_int == 1) {
        choice = "paper";
    } else {
        choice = "scissors";
    }
    return choice
}

function endGame() {
    btns.forEach(button => button.disabled = true);
    if (humanScore === computerScore) {
        outcome = "It's a tie!";
    } else if (humanScore > computerScore) {
        outcome = "You win!";
    } else {
        outcome = "The CPU wins!";
    }
    outcome_div.textContent = outcome;
    results.appendChild(outcome_div);
}

// Keep score
let round = 0;
let humanScore = 0;
let computerScore = 0;
let result = '';
let outcome = '';

// logic to play a single round

function playRound(humanChoice, computerChoice) {
    
    result = "You chose " + humanChoice + " and the computer chose " + computerChoice


    // check for tie
    if (humanChoice == computerChoice) {
        console.log(result)
        outcome = "It's a tie!"
    } else if (humanChoice == "scissors") {
        if (computerChoice == "paper") {
            humanScore++;
            console.log(result);
            // console.log("You win!");
            // outcome ="You win!";
            
        } else {
            console.log(result);
            // console.log("You Lose!");
            // outcome = "You lose!";
            computerScore++;
        }
    } else if (humanChoice == "paper") {
        if (computerChoice == "rock") {
            humanScore++;
            console.log(result);
            // console.log("You win!");
            // outcome = "You win!";
        } else {
            computerScore++;
            console.log(result);
            // console.log("You Lose!");
            outcome = "You lose!";
        }
    } else if (humanChoice == "rock") {
        if (computerChoice == "scissors") {
            humanScore++;
            console.log(result);
            // console.log("You win!");
            // outcome = "You win!";
        } else {
            computerScore++;
            console.log(result);
            // console.log("You Lose!");
            // outcome = "You lose!";
        }
    }
    
} 

// set up button const and event listeners

const rock_btn = document.querySelector('#rock');
const paper_btn = document.querySelector('#paper');
const scissor_btn = document.querySelector('#scissor');
const btns = document.querySelectorAll('button');

// event listeners

rock_btn.addEventListener('click', () => {
    playRound(rock_btn.innerText.toLowerCase(),getComputerChoice());
});
paper_btn.addEventListener('click', ()=> {
    playRound(paper_btn.innerText.toLowerCase(),getComputerChoice());
});
scissor_btn.addEventListener('click', ()=>{
    playRound(scissor_btn.innerText.toLowerCase(),getComputerChoice());
});

// Dom Variables
const choices_div = document.createElement('p');
const round_div = document.createElement('p');
const outcome_div = document.createElement('p');
const scores = document.createElement('p');
// dom to select results div that contains game information
const results = document.querySelector('.results');


// overall button listener
btns.forEach(button => {
    button.addEventListener('click', () => {
        round++
        if (round >= 5 ) {
            endGame()
            round_div.textContent = "Round: " + round;
            choices_div.textContent = result;
            // outcome_div.textContent = outcome;
            scores.textContent = "Your Score: " + humanScore + " CPU Score: " + computerScore;
            // add the results of the choices to the div
            results
            // append round to the results
            results.appendChild(round_div);
            results.appendChild(choices_div);
            results.appendChild(scores);
        } else {
            
            // console.log(round); add the round number into the div element
            round_div.textContent = "Round: " + round;
            choices_div.textContent = result;
            // outcome_div.textContent = outcome;
            scores.textContent = "Your Score: " + humanScore + " CPU Score: " + computerScore;
            // add the results of the choices to the div
            results
            // append round to the results
            results.appendChild(round_div);
            results.appendChild(choices_div);
            results.appendChild(scores);
        }
        
    });
});
