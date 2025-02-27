let reader = require("readline-sync");
let input = reader.question("Syötä merkkijono: ");

function CheckPalindrome(input) {
  reversed_input = "";

  for (let i = 0; i < input.length; i++) {
    reversed_input += input[input.length - (i + 1)];
  }

  // Jos palindromi palauta true, jos ei palauta false
  if (reversed_input === input) return true;
  return false;
}

console.log(CheckPalindrome(input));