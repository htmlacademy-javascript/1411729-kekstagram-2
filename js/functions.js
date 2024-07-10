const checksLengthString = (string, lengthMax) => string.length <= lengthMax;

const checksForPalindrome = function (string) {
  let invertedString = '', initialString;

  if (string) {
    initialString = String(string).toLowerCase().replaceAll(' ', '');

    for (let index = initialString.length - 1; index >= 0; index--) {
      invertedString += initialString[index];
    }
  } else {
    initialString = false;
  }

  return initialString === invertedString;
};
