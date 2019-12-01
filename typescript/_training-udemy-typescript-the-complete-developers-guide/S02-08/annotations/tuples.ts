const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40
};

const pepsi1 = ["brown", true, 40];
// pepsi1[0] = 40;
// pepsi1[2] = "brown";

const pepsi2: [string, boolean, number] = ["brown", true, 40];
// pepsi2[0] = 40;   // error
// pepsi2[2] = "brown";  // error

// Type alias
type Drink = [string, boolean, number];

const pepsi3: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", false, 40];
const tea: Drink = ["brown", false, 40];

// not meaningful
const carSpecs: [number, number] = [400, 3354];

// meaningful
const carStats = {
  horsepower: 400,
  weight: 3354
};
