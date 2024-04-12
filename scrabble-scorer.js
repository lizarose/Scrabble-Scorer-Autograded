// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("\nLet's play some Scrabble!\n");

   let word = input.question("Enter a word to score: ").toLowerCase();
   //console.log(oldScrabbleScorer(word));
   //return oldScrabbleScorer(word);
   return word;
};

let simpleScorer = function(word) {   
   let score = 0; 
   let spaces = [" "];                                   

   for (let i = 0; i < word.length; i++) {                              
      
      if(spaces.includes(word[i])) {
         score += 0
      } else {
         score += 1
      }
      
   } 
   return score;         
} 

let vowelBonusScorer = function(word) {                 
   let score = 0;
   let vowels = ["a", "e", "i", "o", "u"];
   let spaces = [" "];

   for (let i = 0; i < word.length; i++) {                     
      word[i];
      
      if (vowels.includes(word[i])){
         score += 3
      } else if (spaces.includes(word[i])) {
         score += 0
      } else {
         score += 1
      }
   }
  return score; 
}


function transform(oldPointStructure) {            
   let newPoints = {};

   for(let key in oldPointStructure){
      
      let letters = oldPointStructure[key];
      let points = key;

      for(let i = 0; i < letters.length; i++){
         let updatedLetters = letters[i];
         newPoints[updatedLetters.toLowerCase()] = Number(points)
      }
   } 
   return newPoints;
 };


 let newPointStructure = transform(oldPointStructure);
   
 let scrabbleScorer = function(word){
   let score = 0;
   let newPS = newPointStructure;
   let spaces = " ";

      for (let i = 0; i < word.length; i++){
         let letters = word[i].toLowerCase();

         if(spaces.includes(letters[i])) {
            score += 0;
         } else {
            score += newPS[letters]
         }
      }
   return score;
}

const scoringAlgorithms = [
   {name: "Simple Score", description: "Each letter is worth 1 point", scorerFunction: simpleScorer},
   {name: "Bonus Vowels", description: "Vowels are 3 points and consonants are 1 point", scorerFunction: vowelBonusScorer},
   {name: "Scrabble", description: "The traditional scoring algorithm", scorerFunction: scrabbleScorer},
];

function scorerPrompt(word) {
 let  num;
   while(true){
      num = input.question(`\nWhich scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}.\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}.\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}.\nPlease enter 0, 1, or 2: `);

          if(num === '0'){
             console.log("\nYou selected the Simple Score scoring method.");
             console.log("Algorithm Name: ", scoringAlgorithms[0].name);
             console.log("Desciption: ", scoringAlgorithms[0].description);
             console.log("Scoring Result: ", scoringAlgorithms[0].scorerFunction(word));
             num++;
                let again = input.question(`\nWould you like to enter a new word? Y or N: `)
                  if (again.toUpperCase() === 'Y'){
                      runProgram();
                      break;
                 } else {
                     console.log(`Goodbye. Thank you for playing.`);
                     break;
                 }
             
         } else if(num === '1'){
             console.log("\nYou selected the Bonus Vowels scoring method.");
             console.log("Algorithm Name: ", scoringAlgorithms[1].name);
             console.log("Desciption: ", scoringAlgorithms[1].description);
             console.log("Scoring Result: ", scoringAlgorithms[1].scorerFunction(word));
             num++;
               let again = input.question(`\nWould you like to enter a new word? Y or N: `)
                  if (again.toUpperCase() === 'Y'){
                      runProgram();
                      break;
                  } else {
                      console.log(`Goodbye. Thank you for playing.`);
                      break;
                  }
             
         } else if(num === '2'){
            console.log("\nYou selected the traditional Scrabble scoring method.");
            console.log("Algorithm Name: ", scoringAlgorithms[2].name);
            console.log("Desciption: ", scoringAlgorithms[2].description);
            console.log("Scoring Result: ", scoringAlgorithms[2].scorerFunction(word));
            num++;
               let again = input.question(`\nWould you like to enter a new word? Y or N: `)
                  if (again.toUpperCase() === 'Y'){
                      runProgram();
                      break;
                 } else {
                     console.log(`Goodbye. Thank you for playing.`);
                     break;
                 }
               
         } else{
            input.question("\nYou did not select one of the scoring options. Please select 0, 1, or 2: ");
         } 
      }
   return num;
}

function runProgram() {
   let word = initialPrompt();
   simpleScorer(word);
   vowelBonusScorer(word);
   transform(oldPointStructure);
   scrabbleScorer(word);
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
