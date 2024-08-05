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

checksLengthString('0', 0);
checksForPalindrome();
extractsNumbers();

const convertsHoursToMinutes = (timeData) => timeData.map((timeValue) => {
  if (typeof (timeValue) === 'string') {
    const timeValueConverted = timeValue
      .split(':')
      .map((item) => Number(item));
    timeValue = timeValueConverted[0] * 60 + timeValueConverted[1];
    return timeValue;
  } else {
    return timeValue;
  }
});

const checksEnoughTime = function (startWorkingDay, endWorkingDay, startMeeting, durationMeeting) {
  const timeData = convertsHoursToMinutes([startWorkingDay, endWorkingDay, startMeeting, durationMeeting]);
  return (timeData[2] >= timeData[0] && (timeData[3] + timeData[2]) <= timeData [1]);
};

console.log(checksEnoughTime('8:00', '17:30', '14:00', 90)); // true
console.log(checksEnoughTime('8:0', '10:0', '8:0', 120)); // true
console.log(checksEnoughTime('08:00', '14:30', '14:00', 90)); // false
console.log(checksEnoughTime('14:00', '17:30', '08:0', 90)); // false
console.log(checksEnoughTime('8:00', '17:30', '08:00', 900)); // false
