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

const extractsNumbers = function (string) {
  const convertedString = String(string);
  let extractedNumbers = '';

  for (let index = 0; index <= convertedString.length; index++) {
    if (parseInt(convertedString[index], 10) || parseInt(convertedString[index], 10) === 0) {
      extractedNumbers += convertedString[index];
    }
  }

  return parseInt(extractedNumbers, 10);
};
