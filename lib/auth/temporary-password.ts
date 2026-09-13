import { randomInt } from "crypto";

const UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijkmnopqrstuvwxyz";
const NUMBERS = "23456789";
const SYMBOLS = "@";

const PASSWORD_LENGTH = 10;

function randomCharacter(characters: string) {
  return characters[randomInt(0, characters.length)];
}

export function generateTemporaryPassword() {
  const requiredCharacters = [
    randomCharacter(UPPERCASE),
    randomCharacter(LOWERCASE),
    randomCharacter(NUMBERS),
    randomCharacter(SYMBOLS),
  ];

  const allCharacters = UPPERCASE + LOWERCASE + NUMBERS + SYMBOLS;

  while (requiredCharacters.length < PASSWORD_LENGTH) {
    requiredCharacters.push(randomCharacter(allCharacters));
  }

  for (let i = requiredCharacters.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);

    [requiredCharacters[i], requiredCharacters[j]] = [
      requiredCharacters[j],
      requiredCharacters[i],
    ];
  }

  return requiredCharacters.join("");
}
