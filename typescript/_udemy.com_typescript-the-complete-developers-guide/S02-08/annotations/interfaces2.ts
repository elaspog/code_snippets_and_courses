interface Vehicle2 {
  name: string;
  year: number;
  broken: boolean;
}

const oldCivic2 = {
  name: "civic",
  year: 2000,
  broken: true
};

const printVehicle2 = (vehicle: Vehicle2): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle2(oldCivic2);
