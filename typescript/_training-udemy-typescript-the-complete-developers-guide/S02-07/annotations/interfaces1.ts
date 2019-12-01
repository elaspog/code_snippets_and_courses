const oldCivic1 = {
  name: "civic",
  year: 2000,
  broken: true
};

const printVehicle1 = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle1(oldCivic1);
