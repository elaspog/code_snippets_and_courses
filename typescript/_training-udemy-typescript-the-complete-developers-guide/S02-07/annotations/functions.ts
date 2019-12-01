// This is an example to annotation for a variable
// const exp: (a: number, b: number) => number = (a: number, b: number) => {
//  return a ** b;
// };

// Examples to annotation for functions

const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number) => {
  return a - b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function(a: number, b: number): number {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
  // return null;
  // return undefined;
};

const throwError1 = (message: string): never => {
  throw new Error(message);
};

const throwError2 = (message: string): string => {
  if (!message) {
    throw new Error(message);
  }
  return message;
};

const throwError3 = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};

const todaysWeather = {
  date: new Date(),
  weather: "sunny"
};

const logWeather1 = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

logWeather1(todaysWeather);

// ES2015
// const logWeather = ({date, weather}) => {
//    console.log(date);
//    console.log(weather);
// }

const logWeather2 = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
