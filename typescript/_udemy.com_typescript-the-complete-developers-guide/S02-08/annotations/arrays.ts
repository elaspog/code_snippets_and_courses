// const annotationNeeded: string[] = [];
// const annotationNotNeeded = ["a", "b"];

const carMakers = ["ford", "toyota", "chevy"];
const dates = [new Date(), new Date()];

const carsByMake1 = [["f150"], ["corolla"], ["camaro"]];
const carsByMake2: string[][] = [];

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incopatible values
// carMakers.push(100); // error

// Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
const importantDates1 = [new Date(), "2030-10-10"];
const importantDates2: (Date | string)[] = [new Date()];
importantDates2.push("2030-10-10");
importantDates2.push(new Date());
//importantDates2.push(100);    // error
