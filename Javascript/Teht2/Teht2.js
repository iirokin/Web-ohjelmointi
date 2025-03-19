// Puhelinluettelon luonti
let Phonenumber_Directory = [
  {
    Name: "Pekka",
    PhoneNumber: 1234512345,
  },
  {
    Name: "Miika",
    PhoneNumber: 1234567890,
  },
];

let reader = require("readline-sync");
let inputName = reader.question("Syötä Nimi: ");
let inputNumber = reader.question("Syötä Puhelin numero: ");

let newEntry = { Name: inputName, PhoneNumber: inputNumber };
Phonenumber_Directory.push(newEntry); // Henkilö lisätään tietokantaan

// Haku funktio (Parametrit: taulukko + henkilön nimi), palauttaa puhelinnumeron jos löytyy
function SearchDirectory(Directory, SearchName) {
  let PhoneNumber = null;

  Directory.forEach((element) => {
    if (SearchName === element.Name) PhoneNumber = element.PhoneNumber;
  });

  return PhoneNumber;
}

// Kysytään hakunimeä
let SearchName = reader.question("Syötä haettavan henkilön nimi: ");
let Search = SearchDirectory(Phonenumber_Directory, SearchName); // Haku

// Tulostetaan haku tulos
if (Search !== null) {
  console.log("Henkilön " + SearchName + " puhelinnumero on: " + Search);
} else {
  console.log("Henkilöä nimeltä" + SearchName + "ei löytynyt.");
}
