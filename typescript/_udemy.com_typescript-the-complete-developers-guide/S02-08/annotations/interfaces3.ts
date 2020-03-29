interface Vehicle3 {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic3 = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const printVehicle3 = (vehicle: Vehicle3): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
  console.log(vehicle.summary());
};

printVehicle3(oldCivic3);
