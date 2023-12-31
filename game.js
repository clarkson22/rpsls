var userChoice;
var computerChoiceNum;
var computerChoice;

sessionStorage.setItem("gamesPlayed", "0");
sessionStorage.setItem("wins", "0");
sessionStorage.setItem("losses", "0");
sessionStorage.setItem("ties", "0");

const actions = [
	"is the same as", //0
	"crushes", //1
	"covers", //2
	"cuts", //3
	"eats", //4
	"smashes", //5
	"decapitates", //6
	"disproves", //7
	"poisons", //8
	"vaporizes", //9
];

const winText = [
	"it\'s a tie.", //0
	"you win!", //1
	"you lose." //2
];

//define document IDs for easy use later
const computerChoiceIcon = document.getElementById("computerChoiceIcon");
const winningChoice = document.getElementById("winningChoice");
const losingChoice = document.getElementById("losingChoice");
const action = document.getElementById("action");
const userLastChoice = document.getElementById("userLastChoice");
const computerLastChoice = document.getElementById("computerLastChoice");
const winorlose = document.getElementById("winorlose");

const gamesPlayed = document.getElementById("gamesPlayedStat");
const wins = document.getElementById("winStat");
const losses = document.getElementById("lossStat");
const ties = document.getElementById("tieStat");


function evaluateWin(userChoice) {

	//computer rolls their choice
	computerChoiceNum = Math.floor(Math.random() * (5) + 1);
	if (computerChoiceNum == 1) {
		computerChoice = "rock";
	}
	else if (computerChoiceNum == 2) {
		computerChoice = "paper";
	}
	else if (computerChoiceNum == 3) {
		computerChoice = "scissors";
	}
	else if (computerChoiceNum == 4) {
		computerChoice = "lizard";
	}
	else if (computerChoiceNum == 5) {
		computerChoice = "spock";
	}
	else {
		return false;
	}

	//change to waiting hourglass
	computerChoiceIcon.className = "fa-regular";
	computerChoiceIcon.classList.add("fa-hourglass");
	computerChoiceIcon.classList.add("fa-spin");

	//pause for a second before displaying result
	setTimeout(after_pause, 400);

	function after_pause() {

		computerChoiceIcon.classList.remove("fa-spin");


		//update visuals for computer's choice
		computerChoiceIcon.className = "fa-regular";
		computerChoiceIcon.classList.add("fa-hand-" + computerChoice);

		//set the text of what you and computer chose
		userLastChoice.textContent = userChoice;
		computerLastChoice.textContent = computerChoice;

		//evaluate for a tie first
		if (userChoice == computerChoice) {
			winningChoice.textContent = userChoice;
			losingChoice.textContent = computerChoice;
			action.textContent = actions[0];
			winorlose.textContent = winText[0];

			//set text color
			winorlose.className = ""
			winorlose.classList.add("text-primary");

			//update counters
			sessionStorage.setItem("gamesPlayed", Number(sessionStorage.getItem("gamesPlayed")) + 1);
			gamesPlayed.textContent = Number(sessionStorage.getItem("gamesPlayed"));

			sessionStorage.setItem("ties", Number(sessionStorage.getItem("ties")) + 1);
			ties.textContent = Number(sessionStorage.getItem("ties"));
		}

		else {
			switch (userChoice) {
				case "rock":
					//user did rock
					switch (computerChoice) {
						case "paper":
							action.textContent = actions[2];
							lose(userChoice);
							break;
						case "scissors":
							action.textContent = actions[1];
							win(userChoice);
							break;
						case "lizard":
							action.textContent = actions[1];
							win(userChoice);
							break;
						case "spock":
							action.textContent = actions[9];
							lose(userChoice);
							break;
					}
					break;

				case "paper":
					//user did paper
					switch (computerChoice) {
						case "rock":
							action.textContent = actions[2];
							win(userChoice);
							break;
						case "scissors":
							action.textContent = actions[3];
							lose(userChoice);
							break;
						case "lizard":
							action.textContent = actions[4];
							lose(userChoice);
							break;
						case "spock":
							action.textContent = actions[7];
							win(userChoice);
							break;
					}
					break;

				case "scissors":
					//user did scissors
					switch (computerChoice) {
						case "rock":
							action.textContent = actions[1];
							lose(userChoice);
							break;
						case "paper":
							action.textContent = actions[3];
							win(userChoice);
							break;
						case "lizard":
							action.textContent = actions[6];
							win(userChoice);
							break;
						case "spock":
							action.textContent = actions[5];
							lose(userChoice);
							break;
					}
					break;

				case "lizard":
					//user did lizard
					switch (computerChoice) {
						case "rock":
							action.textContent = actions[1];
							lose(userChoice);
							break;
						case "paper":
							action.textContent = actions[4];
							win(userChoice);
							break;
						case "scissors":
							action.textContent = actions[6];
							lose(userChoice);
							break;
						case "spock":
							action.textContent = actions[8];
							win(userChoice);
							break;
					}
					break;
				case "spock":
					//user did spock
					switch (computerChoice) {
						case "rock":
							action.textContent = actions[9];
							win(userChoice);
							break;
						case "paper":
							action.textContent = actions[7];
							lose(userChoice);
							break;
						case "scissors":
							action.textContent = actions[5];
							win(userChoice);
							break;
						case "lizard":
							action.textContent = actions[8];
							lose(userChoice);
							break;
					}
					break;
			}
		}
	}
}
function lose(userChoice) {
	console.log(userChoice);
	winningChoice.textContent = computerChoice;
	losingChoice.textContent = userChoice;
	winorlose.textContent = winText[2];

	//set text color
	winorlose.className = ""
	winorlose.classList.add("text-danger");

	//update counters
	sessionStorage.setItem("gamesPlayed", Number(sessionStorage.getItem("gamesPlayed")) + 1);
	gamesPlayed.textContent = Number(sessionStorage.getItem("gamesPlayed"));

	sessionStorage.setItem("losses", Number(sessionStorage.getItem("losses")) + 1);
	losses.textContent = Number(sessionStorage.getItem("losses"));

}

function win(userChoice) {
	winningChoice.textContent = userChoice;
	losingChoice.textContent = computerChoice;
	winorlose.textContent = winText[1];

	//set text color
	winorlose.className = ""
	winorlose.classList.add("text-success");

	//update counters
	sessionStorage.setItem("gamesPlayed", Number(sessionStorage.getItem("gamesPlayed")) + 1);
	gamesPlayed.textContent = Number(sessionStorage.getItem("gamesPlayed"));

	sessionStorage.setItem("wins", Number(sessionStorage.getItem("wins")) + 1);
	wins.textContent = Number(sessionStorage.getItem("wins"));
}

function reset() {
	sessionStorage.setItem("gamesPlayed", "0");
	gamesPlayed.textContent = Number(sessionStorage.getItem("gamesPlayed"));

	sessionStorage.setItem("wins", "0");
	wins.textContent = Number(sessionStorage.getItem("wins"));

	sessionStorage.setItem("losses", "0");
	losses.textContent = Number(sessionStorage.getItem("losses"));

	sessionStorage.setItem("ties", "0");
	ties.textContent = Number(sessionStorage.getItem("ties"));


}